# Netlify Deployment Guide for Tillerstead.com

## Current Status
- **Repository**: Connected to GitHub (tillerstead.com)
- **Build Command**: `bundle exec jekyll build` (Jekyll 3.10.0)
- **Publish Directory**: `_site/`
- **Domain Strategy**: 
  - Primary: xtx396.com (Netlify deployment)
  - Forwarding: tillerstead.com → xtx396.com (with masking at registrar level)

## Steps to Complete Deployment

### Step 1: Verify Netlify Build ✅ (Completed in Go-Live.ps1)
You've already run Steps 1-3 of the deployment wizard. Your site should be building successfully.

### Step 2: Add Custom Domain in Netlify

1. **Log into Netlify Dashboard**
   - Go to https://app.netlify.com
   - Select your Tillerstead site

2. **Navigate to Domain Settings**
   - Click "Domain Management" in the side menu
   - Click "Add custom domain"

3. **Add xtx396.com**
   - Enter: `xtx396.com`
   - Click "Verify"
   - Netlify will check if you own the domain

4. **Add www subdomain** (optional but recommended)
   - Click "Add domain alias"
   - Enter: `www.xtx396.com`

### Step 3: Configure DNS at Registrar

You need to update DNS records at your domain registrar (where you purchased xtx396.com).

**Option A: Netlify DNS (Recommended)**
1. In Netlify, click "Set up Netlify DNS"
2. Copy the nameservers Netlify provides (usually 4 DNS servers)
3. Log into your registrar (GoDaddy, Namecheap, etc.)
4. Replace current nameservers with Netlify's nameservers
5. Wait 24-48 hours for propagation

**Option B: Manual DNS Records**
If you want to keep your current DNS provider:

1. Log into your registrar's DNS management
2. Add these records:

   ```
   Type: A
   Name: @ (or blank for root domain)
   Value: 75.2.60.5 (Netlify load balancer - check your Netlify dashboard for current IP)
   TTL: 3600

   Type: CNAME
   Name: www
   Value: your-site-name.netlify.app
   TTL: 3600
   ```

3. Save changes and wait 1-24 hours for propagation

### Step 4: Enable HTTPS

Once DNS is configured and propagating:

1. In Netlify Dashboard → Domain Management
2. Scroll to "HTTPS" section
3. Click "Verify DNS configuration"
4. Once verified, click "Provision certificate"
5. Netlify will automatically provision a free Let's Encrypt SSL certificate
6. Enable "Force HTTPS" toggle

### Step 5: Configure tillerstead.com Forwarding

Since tillerstead.com is taken on Netlify, set up domain forwarding at your registrar:

1. Log into tillerstead.com registrar
2. Find "Domain Forwarding" or "URL Redirect" settings
3. Configure:
   - **From**: tillerstead.com
   - **To**: https://xtx396.com
   - **Type**: 301 Permanent Redirect
   - **Frame/Mask**: Enabled (hides xtx396.com in browser)
   - **Title**: "Tillerstead - Premium Tile Installation & Home Improvement | NJ HIC #13VH12345678"
   - **Description**: "Expert tile installation, bathroom remodeling, and custom tile design in NJ. Licensed & insured (NJ HIC #13VH12345678). Serving Ocean, Atlantic & Cape May counties."
   - **Keywords**: "tile installation nj, bathroom remodeling, custom tile design, ocean county tile, nj home improvement"

**Note**: Masking settings vary by registrar:
- GoDaddy: "Forward with masking"
- Namecheap: "URL Frame"
- Google Domains: "Forward path" with "Permanent redirect" + "Forward to same path"

### Step 6: Test Deployment

Once DNS propagates:

1. **Test xtx396.com**:
   - Visit https://xtx396.com
   - Verify HTTPS (green lock icon)
   - Test navigation (services, products, contact form)
   - Check mobile responsiveness

2. **Test www.xtx396.com** (if configured):
   - Should redirect to https://xtx396.com

3. **Test tillerstead.com forwarding**:
   - Visit https://tillerstead.com
   - Should show xtx396.com content with tillerstead.com in URL (if masking enabled)

4. **Test Jekyll features**:
   - Blog posts loading
   - Sitemap: https://xtx396.com/sitemap.xml
   - Robots.txt: https://xtx396.com/robots.txt
   - PWA manifest: https://xtx396.com/manifest.webmanifest

5. **Test Ventures section**:
   - /ventures/ → investor portal
   - /ventures/sei/ → SEI product page
   - /ventures/sei/app → Member dashboard demo
   - /ventures/sei/claims → Claims module
   - /ventures/sei/admin → Admin panel

### Step 7: Configure Environment Variables (if needed)

If you have any API keys or secrets:

1. In Netlify Dashboard → Site settings → Build & deploy → Environment
2. Add environment variables (e.g., form submission API keys, analytics IDs)

### Step 8: Set Up Redirects & Custom Headers

Your _redirects file should already be in place from previous work. Verify it's working:

1. Test broken link redirects (e.g., /old-page → /new-page)
2. Test 404 handling
3. Check security headers in browser DevTools → Network tab

### Step 9: Enable Netlify Features

**Forms** (if using Netlify Forms):
- Forms are automatically detected in your HTML
- Submissions appear in Netlify Dashboard → Forms

**Analytics** (optional, paid):
- Netlify Analytics provides server-side stats without JavaScript
- Enable in Site settings → Analytics

**Deploy Notifications** (optional):
- Set up email/Slack notifications for deploy status
- Site settings → Build & deploy → Deploy notifications

## Deployment Checklist

- [ ] Netlify site building successfully
- [ ] Custom domain (xtx396.com) added in Netlify
- [ ] DNS records configured at registrar
- [ ] DNS propagation complete (24-48 hours)
- [ ] HTTPS certificate provisioned
- [ ] Force HTTPS enabled
- [ ] tillerstead.com forwarding configured with masking
- [ ] All pages loading correctly
- [ ] Mobile responsiveness verified
- [ ] Forms working (if applicable)
- [ ] SEO meta tags verified
- [ ] Sitemap accessible
- [ ] Robots.txt accessible
- [ ] PWA features working (offline page, manifest)
- [ ] Ventures section accessible
- [ ] SEI demo modules functional

## Common Issues & Solutions

**Issue**: DNS not propagating
- **Solution**: Use https://dnschecker.org to check propagation status worldwide
- **Timeframe**: Can take 24-48 hours

**Issue**: SSL certificate not provisioning
- **Solution**: Verify DNS is fully propagated first. Netlify needs to verify domain ownership via DNS.

**Issue**: Builds failing
- **Solution**: Check Build logs in Netlify Dashboard. Common issues:
  - Ruby/Jekyll version mismatch
  - Missing dependencies in Gemfile
  - Liquid syntax errors

**Issue**: 404 errors on pages
- **Solution**: 
  - Check _redirects file syntax
  - Verify permalinks in front matter
  - Ensure _site/ directory is being published

**Issue**: Forms not submitting
- **Solution**:
  - Verify `netlify` attribute on `<form>` tags
  - Check spam folder for submission notifications
  - Review Netlify Dashboard → Forms for submissions

## Performance Optimization

After deployment:

1. **Enable Asset Optimization** (Netlify):
   - Site settings → Build & deploy → Post processing
   - Enable: Minify CSS, Minify JS, Compress images

2. **Configure Caching**:
   - Add `_headers` file to control cache TTL
   - Example:
     ```
     /assets/*
       Cache-Control: public, max-age=31536000, immutable
     /sw.js
       Cache-Control: no-cache
     ```

3. **Monitor Performance**:
   - Run Lighthouse audits
   - Check PageSpeed Insights: https://pagespeed.web.dev
   - Monitor Core Web Vitals

## Ongoing Maintenance

**Continuous Deployment**:
- Every `git push` to main branch triggers automatic Netlify build
- Deploy previews created for pull requests
- Rollback available in Netlify Dashboard

**Content Updates**:
- Blog posts: Add markdown files to `_posts/`
- Products: Update `_data/` files
- SEI demo users: Edit `ventures/sei/demo-data.js`

**Monitoring**:
- Netlify sends deploy notifications
- Check build logs for warnings
- Monitor uptime (Netlify has 99.99% SLA)

## Support Resources

- **Netlify Docs**: https://docs.netlify.com
- **Jekyll Docs**: https://jekyllrb.com/docs/
- **DNS Propagation Checker**: https://dnschecker.org
- **SSL Test**: https://www.ssllabs.com/ssltest/

---

**Last Updated**: January 23, 2026  
**Deployment Target**: xtx396.com (primary) + tillerstead.com (forwarding with masking)  
**Current Status**: DNS configuration pending
