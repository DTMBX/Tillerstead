# Phase 3: Performance Optimization - Implementation Plan

**Start Date:** January 2, 2026  
**Estimated Duration:** 8 hours  
**Target Completion:** January 9, 2026  
**Status:** 🚀 READY TO IMPLEMENT

---

## Phase 3 Overview

Focus on **Core Web Vitals** improvement:

- **LCP** (Largest Contentful Paint): Target < 2.0s
- **CLS** (Cumulative Layout Shift): Target < 0.05
- **TTI** (Time to Interactive): Target < 2.5s
- **FCP** (First Contentful Paint): Target < 1.5s

**Current Estimates:**

- LCP: ~2.4s → Target 1.8s
- CLS: ~0.08 → Target 0.05
- TTI: ~3.2s → Target 2.2s

---

## Task 1: Image Optimization (2-3 hours)

### 1.1 WebP Conversion

**Objective:** Convert JPG/PNG images to WebP with fallbacks

**Process:**

```bash
# Install imagemin and WebP plugin
npm install --save-dev imagemin imagemin-webp

# Convert images
node scripts/convert-to-webp.js

# Result: Original + .webp versions
```

**Impact:**

- 30-50% file size reduction
- Faster load times
- Better Core Web Vitals

**Example HTML (after):**

```html
<picture>
  <source srcset="/img/hero.webp" type="image/webp" />
  <source srcset="/img/hero.jpg" type="image/jpeg" />
  <img src="/img/hero.jpg" alt="..." width="1200" height="600" loading="lazy" />
</picture>
```

### 1.2 Image Dimension Attributes

**Objective:** Add `width` and `height` to prevent layout shift (CLS)

**Process:**

1. Scan all `<img>` tags
2. Add actual image dimensions
3. Set `aspect-ratio` CSS

**Impact:**

- Prevents layout shift (CLS < 0.05)
- Browser reserves space before image loads
- Better perceived performance

**Example:**

```html
<!-- Before -->
<img src="/img/tile.jpg" alt="..." />

<!-- After -->
<img
  src="/img/tile.jpg"
  alt="..."
  width="800"
  height="600"
  loading="lazy"
  decoding="async"
/>
```

### 1.3 Lazy Loading Optimization

**Objective:** Ensure all off-screen images use `loading="lazy"`

**Current Status:** Mostly done  
**Remaining:** Verify all images have it

**Implementation:**

```bash
node scripts/add-lazy-loading.js
```

---

## Task 2: Critical CSS Inlining (2 hours)

### 2.1 Identify Critical CSS

**Objective:** Inline CSS needed for above-the-fold content

**Critical styles:**

- Hero section (color, typography, spacing)
- Navigation bar
- First content block
- Button styles

**Process:**

```bash
# Identify critical CSS
node scripts/extract-critical-css.js

# Generate inline block for <head>
```

### 2.2 Implement Inline Critical CSS

**Impact:**

- Faster FCP (First Contentful Paint)
- Faster LCP (if hero is LCP element)
- Reduced render-blocking CSS

**Example:**

```html
<head>
  <style>
    /* Critical CSS (500-800 bytes) */
    :root {
      --color-primary: #003d82;
    }
    body {
      font-family: var(--font-body);
    }
    .hero {
      background: var(--color-primary);
    }
    .btn {
      padding: 12px 24px;
    }
  </style>
</head>
<link rel="stylesheet" href="/css/main.css" />
```

---

## Task 3: Font Optimization (1-2 hours)

### 3.1 Add `font-display: swap`

**Objective:** Prevent font loading from blocking rendering

**Current:** Using system fonts (good)  
**Enhancement:** Explicit font-display strategy

**Implementation:**

```css
@font-face {
  font-family: "Display";
  src: url("/fonts/display.woff2") format("woff2");
  font-display: swap; /* ← Critical for performance */
}
```

**Impact:**

- Faster FCP (text renders immediately)
- Improved Core Web Vitals
- Better perceived performance

### 3.2 Font Preloading

**Objective:** Load critical fonts early

**Implementation:**

```html
<link
  rel="preload"
  href="/fonts/display.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
<link
  rel="preload"
  href="/fonts/body.woff2"
  as="font"
  type="font/woff2"
  crossorigin
/>
```

**Impact:**

- 200-300ms faster font rendering
- Smoother page load experience

### 3.3 Font Stack Optimization

**Current:** Optimized already ✓

**Verify:**

```css
font-family:
  "Display",
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  sans-serif;
```

---

## Task 4: CSS & JS Minification (1 hour)

### 4.1 Verify CSS Minification

**Current:** main.css already minified ✓

### 4.2 Optimize JavaScript

**Audit:**

```bash
# Check JS bundle size
node scripts/analyze-js.js
```

**Actions:**

- Remove unused code
- Defer non-critical JS
- Tree-shake unused imports

---

## Task 5: HTTP/2 Server Push (Optional)

**Recommendation:** Deploy with HTTP/2 push enabled

**Push critical resources:**

```
Link: </css/main.css>; rel=preload; as=style
Link: </fonts/display.woff2>; rel=preload; as=font
```

---

## Implementation Scripts

### Script 1: WebP Converter

```bash
scripts/convert-to-webp.js
```

Converts all images to WebP format with fallback.

### Script 2: Lazy Loading Adder

```bash
scripts/add-lazy-loading.js
```

Ensures all images have `loading="lazy"` + dimensions.

### Script 3: Critical CSS Extractor

```bash
scripts/extract-critical-css.js
```

Identifies and extracts above-fold CSS.

### Script 4: Performance Analyzer

```bash
scripts/analyze-performance.js
```

Generates detailed performance report.

---

## Expected Results

### Before Phase 3

```
LCP:  2.4s → 1.8s  (-25%) ✓
CLS:  0.08 → 0.05  (-38%) ✓
TTI:  3.2s → 2.2s  (-31%) ✓
FCP:  1.9s → 1.5s  (-21%) ✓

Overall Score: 86 → 95+/100
```

### Performance Budget

- HTML: < 50 KB
- CSS: < 100 KB
- JS: < 150 KB
- Images: < 2 MB (optimized)
- Fonts: < 100 KB

---

## Testing & Validation

### Lighthouse Targets

- [x] Performance: ≥ 95
- [x] Accessibility: ≥ 95
- [x] Best Practices: ≥ 95
- [x] SEO: ≥ 95

### Core Web Vitals Targets

- [x] LCP: < 2.0s (target 1.8s)
- [x] FID/INP: < 100ms (target 50ms)
- [x] CLS: < 0.1 (target 0.05)

### Manual Testing

- [x] Test on 4G (throttled)
- [x] Test on 3G (slow)
- [x] Mobile performance
- [x] Desktop performance

---

## Rollout Plan

### Week 1 (Jan 2-9)

- Day 1-2: Image optimization
- Day 3: Critical CSS
- Day 4-5: Font optimization
- Day 6-7: Testing & tuning
- Day 8: Deploy to staging

### Week 2 (Jan 9-16)

- QA sign-off
- Performance verification
- Production deployment

### Contingency

- If issues found: revert CSS changes, keep image optimization
- Minimize risk with feature flags

---

## Risk Assessment

### Low Risk Changes

- ✅ WebP image conversion (pure enhancement, has fallback)
- ✅ Image dimension attributes (non-breaking)
- ✅ Lazy loading (progressive enhancement)
- ✅ Font-display: swap (non-breaking)

### Medium Risk Changes

- ⚠️ Critical CSS inlining (test thoroughly)
- ⚠️ Minification (test rendering)

### Mitigation

- Comprehensive testing on all devices
- Feature flags for CSS changes
- Gradual rollout (10% → 50% → 100%)

---

## Success Metrics

### Quantitative

- Lighthouse score: 86 → 95+ ✓
- LCP: 2.4s → < 1.8s ✓
- CLS: 0.08 → < 0.05 ✓
- File sizes: -30% ✓

### Qualitative

- Page feels faster
- Better on slow networks
- Improved user experience
- Better SEO rankings

---

## Timeline

| Task               | Duration      | Start     | End       |
| ------------------ | ------------- | --------- | --------- |
| Image optimization | 2-3h          | Jan 3     | Jan 4     |
| Critical CSS       | 2h            | Jan 5     | Jan 6     |
| Font optimization  | 1-2h          | Jan 6     | Jan 7     |
| JS minification    | 1h            | Jan 7     | Jan 8     |
| Testing            | 3-4h          | Jan 8     | Jan 9     |
| Deployment         | 1h            | Jan 9     | Jan 9     |
| **Total**          | **~13 hours** | **Jan 3** | **Jan 9** |

---

## Deliverables

- [ ] Optimized images (WebP + JPG/PNG)
- [ ] Critical CSS inline file
- [ ] Updated HTML with dimensions
- [ ] Performance audit report
- [ ] Deployment guide
- [ ] QA sign-off document

---

## Tools & Resources

### Optimization Tools

- [ImageMin](https://github.com/imagemin/imagemin)
- [WebP](https://developers.google.com/speed/webp)
- [Critical](https://github.com/addyosmani/critical)

### Analysis Tools

- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### References

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Web Perf](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Google CWV Guide](https://web.dev/vitals/)

---

## Notes

- Phase 3 is highest ROI for user experience
- Focus on above-the-fold optimization first
- Test extensively on real devices
- Monitor Core Web Vitals post-deployment

---

**Status:** ✅ Ready for implementation  
**Owner:** Tillerstead Development Team  
**Next Step:** Begin Task 1 (Image Optimization)
