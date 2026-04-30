import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as targets from 'aws-cdk-lib/aws-route53-targets';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';

const DOMAIN = 'kiln-ui.com';

export class KilnUiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ── Certificate ──────────────────────────────────────────────────────────
    // Must be in us-east-1 — CloudFront requires it. Set certificateArn in cdk.json context.
    const certArn = this.node.getContext('certificateArn') as string;
    const certificate = acm.Certificate.fromCertificateArn(this, 'Certificate', certArn);

    // ── S3 bucket ─────────────────────────────────────────────────────────────
    // Fully private — CloudFront OAC is the only reader.
    const bucket = new s3.Bucket(this, 'SiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption:        s3.BucketEncryption.S3_MANAGED,
      versioned:         false,
      removalPolicy:     cdk.RemovalPolicy.RETAIN,
    });

    // ── CloudFront distribution ───────────────────────────────────────────────
    const distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        // S3BucketOrigin.withOriginAccessControl creates the OAC and wires the
        // bucket policy automatically.
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy:          cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress:             true,
      },
      domainNames:       [DOMAIN, `www.${DOMAIN}`],
      certificate,
      defaultRootObject: 'index.html',
      // SPA routing — any 403/404 from S3 serves index.html so the React
      // router handles the path client-side.
      errorResponses: [
        {
          httpStatus:         403,
          responseHttpStatus: 200,
          responsePagePath:   '/index.html',
          ttl:                cdk.Duration.seconds(0),
        },
        {
          httpStatus:         404,
          responseHttpStatus: 200,
          responsePagePath:   '/index.html',
          ttl:                cdk.Duration.seconds(0),
        },
      ],
      priceClass:              cloudfront.PriceClass.PRICE_CLASS_100,
      minimumProtocolVersion:  cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion:             cloudfront.HttpVersion.HTTP2_AND_3,
    });

    // ── Route53 ───────────────────────────────────────────────────────────────
    // fromLookup performs a live API call during synth — requires a concrete env.
    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: DOMAIN,
    });

    const cfAlias = route53.RecordTarget.fromAlias(
      new targets.CloudFrontTarget(distribution),
    );

    // Apex (kiln-ui.com)
    new route53.ARecord(this, 'ApexA', {
      zone,
      target: cfAlias,
    });
    new route53.AaaaRecord(this, 'ApexAaaa', {
      zone,
      target: cfAlias,
    });

    // www (www.kiln-ui.com)
    new route53.ARecord(this, 'WwwA', {
      zone,
      recordName: 'www',
      target:     cfAlias,
    });
    new route53.AaaaRecord(this, 'WwwAaaa', {
      zone,
      recordName: 'www',
      target:     cfAlias,
    });

    // ── Deploy ────────────────────────────────────────────────────────────────
    // Syncs demo/dist to S3 and invalidates /* on CloudFront after every deploy.
    new s3deploy.BucketDeployment(this, 'Deploy', {
      sources:            [s3deploy.Source.asset(path.join(__dirname, '../../demo/dist'))],
      destinationBucket:  bucket,
      distribution,
      distributionPaths:  ['/*'],
      // Prune files removed in newer builds
      prune:              true,
    });

    // ── Outputs ───────────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'SiteUrl', {
      value:       `https://${DOMAIN}`,
      description: 'Live site URL',
    });
    new cdk.CfnOutput(this, 'CloudFrontDomain', {
      value:       distribution.distributionDomainName,
      description: 'CloudFront distribution domain (useful for DNS debugging)',
    });
    new cdk.CfnOutput(this, 'BucketName', {
      value:       bucket.bucketName,
      description: 'S3 bucket holding site assets',
    });
  }
}
