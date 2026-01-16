# Swapp Website Deployment

This project is deployed to AWS S3 and CloudFront.

## Infrastructure

- **S3 Bucket**: `swapp-website` (us-east-1)
  - Static website hosting enabled
  - Public read access via bucket policy
- **CloudFront Distribution**: `E1R5TB8U3KMH1`
  - Domain: https://dfgg3028eqdkf.cloudfront.net
  - Origin: `swapp-website.s3.us-east-1.amazonaws.com`
  - SSL/TLS enabled (default certificate)
  - Custom error responses (SPA support)

## Automated Deployment

Deployments are automated using GitHub Actions. Pushing to the `main` branch triggers the workflow defined in `.github/workflows/deploy-aws.yml`.

### Required GitHub Secrets

Configure the following secrets in your GitHub repository settings:

- `AWS_ACCESS_KEY_ID`: Your AWS access key
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret key
- `AWS_S3_BUCKET`: `swapp-website`
- `AWS_CLOUDFRONT_DISTRIBUTION_ID`: `E1R5TB8U3KMH1`

## Manual Deployment

To manually deploy from your local machine (requires AWS CLI configured):

```bash
# Sync files to S3
aws s3 sync . s3://swapp-website --exclude ".git/*" --exclude ".github/*" --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id E1R5TB8U3KMH1 --paths "/*"
```

## Verification

You can verify the deployment by visiting:
- [CloudFront URL](https://dfgg3028eqdkf.cloudfront.net)
- [S3 Website URL](http://swapp-website.s3-website-us-east-1.amazonaws.com)
