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

// ─────────────────────────────────────────────────────────────────────────────
// Storage — private S3 bucket (CloudFront OAC is the only reader)
// ─────────────────────────────────────────────────────────────────────────────

class Storage extends Construct {
  readonly bucket: s3.Bucket;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    this.bucket = new s3.Bucket(this, 'Bucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption:        s3.BucketEncryption.S3_MANAGED,
      versioned:         false,
      removalPolicy:     cdk.RemovalPolicy.RETAIN,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Edge — CloudFront distribution with OAC + imported ACM certificate
// ─────────────────────────────────────────────────────────────────────────────

interface EdgeProps {
  bucket:  s3.Bucket;
  certArn: string;
}

class Edge extends Construct {
  readonly distribution: cloudfront.Distribution;

  constructor(scope: Construct, id: string, props: EdgeProps) {
    super(scope, id);

    // Certificate must live in us-east-1 — CloudFront requires it globally.
    const certificate = acm.Certificate.fromCertificateArn(
      this, 'Certificate', props.certArn,
    );

    this.distribution = new cloudfront.Distribution(this, 'Distribution', {
      defaultBehavior: {
        // withOriginAccessControl creates the OAC and wires the bucket policy.
        origin:               origins.S3BucketOrigin.withOriginAccessControl(props.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy:          cloudfront.CachePolicy.CACHING_OPTIMIZED,
        compress:             true,
      },
      domainNames:       [DOMAIN, `www.${DOMAIN}`],
      certificate,
      defaultRootObject: 'index.html',
      // SPA routing — S3 403/404 both fall back to index.html so the React
      // hash router can handle every path client-side.
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
      priceClass:             cloudfront.PriceClass.PRICE_CLASS_100,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      httpVersion:            cloudfront.HttpVersion.HTTP2_AND_3,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Dns — Route53 A + AAAA alias records for apex and www
// ─────────────────────────────────────────────────────────────────────────────

interface DnsProps {
  distribution: cloudfront.Distribution;
}

class Dns extends Construct {
  constructor(scope: Construct, id: string, props: DnsProps) {
    super(scope, id);

    // fromLookup makes a live API call during synth — requires a concrete env.
    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: DOMAIN,
    });

    const cfAlias = route53.RecordTarget.fromAlias(
      new targets.CloudFrontTarget(props.distribution),
    );

    new route53.ARecord(this, 'ApexA',    { zone, target: cfAlias });
    new route53.AaaaRecord(this, 'ApexAaaa', { zone, target: cfAlias });
    new route53.ARecord(this, 'WwwA',     { zone, recordName: 'www', target: cfAlias });
    new route53.AaaaRecord(this, 'WwwAaaa',  { zone, recordName: 'www', target: cfAlias });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Deployment — syncs demo/dist to S3 and invalidates CloudFront on every deploy
// ─────────────────────────────────────────────────────────────────────────────

interface DeploymentProps {
  bucket:       s3.Bucket;
  distribution: cloudfront.Distribution;
}

class Deployment extends Construct {
  constructor(scope: Construct, id: string, props: DeploymentProps) {
    super(scope, id);

    new s3deploy.BucketDeployment(this, 'Sync', {
      sources:           [s3deploy.Source.asset(path.join(__dirname, '../../demo/dist'))],
      destinationBucket: props.bucket,
      distribution:      props.distribution,
      distributionPaths: ['/*'],
      prune:             true,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Stack
// ─────────────────────────────────────────────────────────────────────────────

export class KilnUiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const certArn = this.node.getContext('certificateArn') as string;

    const storage = new Storage(this, 'Storage');

    const edge = new Edge(this, 'Edge', {
      bucket:  storage.bucket,
      certArn,
    });

    new Dns(this, 'Dns', {
      distribution: edge.distribution,
    });

    new Deployment(this, 'Deployment', {
      bucket:       storage.bucket,
      distribution: edge.distribution,
    });

    // ── Outputs ────────────────────────────────────────────────────────────────
    new cdk.CfnOutput(this, 'SiteUrl', {
      value:       `https://${DOMAIN}`,
      description: 'Live site URL',
    });
    new cdk.CfnOutput(this, 'CloudFrontDomain', {
      value:       edge.distribution.distributionDomainName,
      description: 'CloudFront domain (useful for DNS debugging)',
    });
    new cdk.CfnOutput(this, 'BucketName', {
      value:       storage.bucket.bucketName,
      description: 'S3 bucket holding site assets',
    });
  }
}
