# SWAPP Website Deployment

This project is deployed to **Cloudflare Pages** and is live at [swapp.church](https://swapp.church).

## Deployment Method

The site uses **Cloudflare Pages** for hosting static content and **Cloudflare Pages Functions** (Workers) for handling redirects and URL normalization.

### How It Works

1. **Push to GitHub**: Any commit pushed to the `main` branch triggers an automatic deployment.
2. **Cloudflare Functions**: The logic in `functions/_middleware.js` handles:
    - **Trailing Slashes**: Automatically redirects `/path` to `/path/`.
    - **Legacy Redirects**: Handles old WP slugs and consolidated paths.
3. **Auto-Deploy**: Changes go live at swapp.church within 1-3 minutes.

### Repository

- **GitHub Repo**: `Dronesmiths/Swapp-Final`
- **Branch**: `main` (production)
- **Build Command**: `None` (Static HTML)
- **Output Directory**: `/` (root)

## Local Development & Testing

We use `wrangler` to test redirects and functions locally.

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run local dev server**:
   ```bash
   npm run dev
   ```
   This will start a local server (usually at `http://localhost:8788`) that replicates the Cloudflare environment, including the middleware logic.

## Deployment Status

You can check deployment status in:
- **Cloudflare Dashboard**: Pages → swapp-final → Deployments
- **GitHub**: Recent commits will show Cloudflare deployment status

## Manual Deployment

While auto-deploy is preferred, you can deploy manually if needed:

```bash
npx wrangler pages deploy .
```

## Rollback

To rollback to a previous version:
1. Go to Cloudflare Dashboard → Pages → swapp-final
2. Click "Deployments"
3. Find the previous successful deployment
4. Click "Rollback to this deployment"

## Custom Domain

- **Primary Domain**: swapp.church
- **DNS**: Managed through Cloudflare
- **SSL/TLS**: Automatic (Cloudflare Universal SSL)

---

**Last Updated**: February 6, 2026  
**Status**: ✅ Fully migrated to Cloudflare Pages + Functions
