# Quick UX Fixes - Phase 1

## Fix 1: Pricing Page Hard-Coded Pixels (11 instances)

**File:** `pages/pricing.html`  
**Issue:** Hard-coded padding, margin, and width values instead of CSS variables  
**Impact:** Performance + CSS compliance  
**Time:** 30 minutes

### Find & Replace Pattern:

```scss
/* Current (bad) */
padding: 24px;
margin: 16px;
width: 300px;

/* New (good) */
padding: var(--spacing-lg);
margin: var(--spacing-md);
width: var(--max-width-card);
```

---

## Fix 2: Form Accessibility - nj-tile-guide.html

**File:** `pages/download/nj-tile-guide.html`  
**Issue:** Input #4 missing aria-label or associated label  
**Impact:** Accessibility (WCAG)  
**Time:** 15 minutes

### Change:

```html
<!-- Input in form around line X -->
<input
  type="text"
  name="address"
  aria-label="Your mailing address"
  placeholder="123 Main St, Cape May, NJ"
/>
```

---

## Fix 3: Verify H1 Post-Build

**Action:** After successful build, check \_site output:

```bash
npm run build
# Check _site/pages/contact.html for <h1> tags
# All pages should have exactly one H1
```

**Expected:** `<h1>` in hero component for each page  
**If missing:** Check `_includes/hero/unified-hero.html` line 33

---

## Quick Checklist

- [ ] Pricing page hard-coded values → CSS variables
- [ ] nj-tile-guide form aria-label added
- [ ] Build succeeds without errors
- [ ] \_site contains valid H1 tags
- [ ] Run post-build audit: `node scripts/post-build-audit.js`

---

## Commands to Verify Fixes

```bash
# Lint CSS/JS
npm run lint

# Build
npm run build

# Test specific pages (after build)
grep -r "<h1" _site/pages/contact.html
grep -r "aria-label.*address" _site/pages/download/nj-tile-guide.html

# Run post-build audit
node scripts/post-build-audit.js
```

---

**Estimated Total Time:** 1 hour  
**Estimated Impact:** High (SEO + Accessibility improvement)
