# Deployment Guide

## Quick Start

1. **Install Dependencies**
```bash
npm install
```

2. **Test Locally**
```bash
npm run dev
# Visit http://localhost:4321
```

3. **Build for Production**
```bash
npm run build
```

4. **Preview Production Build**
```bash
npm run preview
```

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Astro
6. Click "Deploy"
7. Done! Your site is live

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy**
```bash
vercel
```

4. **Deploy to Production**
```bash
vercel --prod
```

## Environment Variables

No environment variables needed for this demo project.

## Build Settings

If manually configuring:
- **Framework Preset**: Astro
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node Version**: 18.x or higher

## Post-Deployment Checklist

- ✅ Visit your live URL
- ✅ Test payment form validation
- ✅ Complete a test transaction
- ✅ Verify receipt page displays correctly
- ✅ Test download receipt functionality
- ✅ Test "Make Another Payment" button
- ✅ Verify mobile responsiveness
- ✅ Check all animations work smoothly

## Troubleshooting

### Build Fails

**Issue**: TypeScript errors during build
**Solution**: Run `npm run build` locally first to catch errors

**Issue**: Missing dependencies
**Solution**: Delete `node_modules` and `package-lock.json`, then `npm install`

### Runtime Issues

**Issue**: Components not hydrating
**Solution**: Ensure components have `client:load` directive in .astro files

**Issue**: Receipt page shows blank
**Solution**: Check URL parameters are being passed correctly from payment form

## Custom Domain

1. Go to your Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Wait for DNS propagation (5-60 minutes)

## Performance Optimization

The site is already optimized with:
- Static site generation (SSG)
- Minimal JavaScript
- Optimized assets
- No unnecessary dependencies

Expected Lighthouse scores:
- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100

## Monitoring

Once deployed, you can monitor:
- Real-time logs in Vercel dashboard
- Analytics (if enabled)
- Build history
- Error tracking

## Rollback

If something goes wrong:
1. Go to your Vercel project
2. Click "Deployments"
3. Find a previous working deployment
4. Click "..." menu
5. Select "Promote to Production"

---

Need help? Check:
- [Astro Documentation](https://docs.astro.build)
- [Vercel Documentation](https://vercel.com/docs)
- [SolidJS Documentation](https://www.solidjs.com/docs)
