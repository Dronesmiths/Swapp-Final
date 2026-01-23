# SWAPP Website Deployment

This project is deployed to **Cloudflare Pages** and is live at [swapp.church](https://swapp.church).

## Deployment Method

**Cloudflare Pages** provides automatic deployments directly from GitHub.

### How It Works

1. **Push to GitHub**: Any commit pushed to the `main` branch triggers an automatic deployment
2. **Cloudflare Builds**: Cloudflare Pages detects the push and builds the site
3. **Auto-Deploy**: Changes go live at swapp.church within 1-3 minutes

### Repository

- **GitHub Repo**: `Dronesmiths/Swapp-Final`
- **Branch**: `main` (production)
- **Build Command**: None (static HTML site)
- **Output Directory**: `/` (root)

## Deployment Status

You can check deployment status in:
- **Cloudflare Dashboard**: Pages → swapp.church → Deployments
- **GitHub**: Recent commits will show Cloudflare deployment status

## Manual Deployment

No manual deployment needed! Just push to `main`:

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Cloudflare Pages will automatically deploy your changes.

## Preview Deployments

Cloudflare Pages also creates preview deployments for:
- Pull requests (before merging)
- Non-production branches

Each preview gets a unique URL for testing before going live.

## Rollback

To rollback to a previous version:
1. Go to Cloudflare Dashboard → Pages → swapp.church
2. Click "Deployments"
3. Find the previous successful deployment
4. Click "Rollback to this deployment"

## Custom Domain

- **Primary Domain**: swapp.church
- **DNS**: Managed through Cloudflare
- **SSL/TLS**: Automatic (Cloudflare Universal SSL)

---

**Last Updated**: January 23, 2026  
**Status**: ✅ Live and auto-deploying from GitHub
