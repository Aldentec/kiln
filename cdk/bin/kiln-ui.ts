import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { KilnUiStack } from '../lib/kiln-ui-stack';

const app = new cdk.App();

new KilnUiStack(app, 'KilnUiStack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region:  'us-west-2',
  },
  description: 'kiln-ui.com — S3 + CloudFront + Route53',
});
