# Tillerstead Responsive Design & UX Testing Checklist

**Version:** 1.0  
**Last Updated:** January 2, 2026  
**Category:** Quality Assurance

---

## Testing Environments

### Desktop (1920px - 4K)

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Tablet (768px - iPad)

- [ ] iOS Safari
- [ ] Chrome (Android)
- [ ] Firefox (Android)

### Mobile (320px - 480px)

- [ ] iPhone SE (375px)
- [ ] iPhone 12 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] Galaxy S21 (360px)
- [ ] Pixel 7 (412px)

---

## Page-Specific Tests

### Homepage (`/`)

#### Visual Layout

- [ ] Hero image displays without distortion at all sizes
- [ ] Hero text is readable (contrast ≥ 4.5:1)
- [ ] CTA buttons are visible and clickable
- [ ] No horizontal scroll on mobile
- [ ] Content flows naturally at all breakpoints

#### Responsive Behavior

- **Mobile (320px)**
  - [ ] Logo is visible and not cropped
  - [ ] Navigation menu collapses into hamburger
  - [ ] Hero text stacks vertically
  - [ ] Buttons are full-width (or 44px height minimum)
  - [ ] KPI cards stack vertically

- **Tablet (768px)**
  - [ ] 2-column layout appears for content sections
  - [ ] Images scale proportionally
  - [ ] Navigation bar shows (not hamburger)
  - [ ] Cards arrange in grid (2-3 per row)

- **Desktop (1920px)**
  - [ ] 3-column grid for portfolio/service cards
  - [ ] Whitespace is balanced
  - [ ] Images fill their containers without stretching
  - [ ] Typography hierarchy is clear

#### Interactive Elements

- [ ] Navigation links all work
- [ ] CTA buttons respond to hover/focus
- [ ] Dropdown menus (if any) work on all devices
- [ ] Forms are easily fillable
- [ ] Links are keyboard accessible (Tab navigation)

#### Performance

- [ ] Hero image loads within 2 seconds (LCP < 2.5s)
- [ ] Page is interactive by 3 seconds (TTI < 3s)
- [ ] No layout shifts while loading (CLS < 0.1)
- [ ] No image flickering

---

### Contact Page (`/contact/`)

#### Form Layout

- [ ] All form fields visible and properly spaced
- [ ] Labels are associated with inputs (click label → focus input)
- [ ] Required field indicators are visible
- [ ] Form doesn't have horizontal scroll on mobile

#### Mobile Form (320px)

- [ ] Form fields are full-width
- [ ] Input height ≥ 44px (thumb-friendly)
- [ ] Keyboard type matches input (email → email keyboard)
- [ ] Submit button is above the fold
- [ ] No auto-zoom on focus

#### Tablet Form (768px)

- [ ] 2-column form layout (if applicable)
- [ ] Proper spacing between fields
- [ ] Submit button is clearly visible

#### Desktop Form (1920px)

- [ ] Form width is appropriate (not stretched too wide)
- [ ] Input width is consistent
- [ ] Hover states on buttons work

#### Accessibility

- [ ] Tab order is logical (top to bottom, left to right)
- [ ] Focus indicators are visible (blue outline)
- [ ] Screen reader can read all labels
- [ ] Error messages are announced

#### Functionality

- [ ] Email validation works
- [ ] Phone validation works (if applicable)
- [ ] Form submission works
- [ ] Confirmation message displays

---

### Portfolio Page (`/portfolio/`)

#### Image Gallery Layout

- [ ] Gallery displays correctly on all screen sizes
- [ ] Images don't distort when scaling
- [ ] No image overflow beyond container

#### Mobile View (320px)

- [ ] Images stack vertically (1 per row)
- [ ] Image captions are readable
- [ ] Modal/lightbox (if any) works on touch

#### Tablet View (768px)

- [ ] 2-column grid appears
- [ ] Images scale appropriately
- [ ] Tap areas for interactions ≥ 44px

#### Desktop View (1920px)

- [ ] 3-4 column grid displays
- [ ] Images have proper aspect ratio
- [ ] Hover effects work smoothly

#### Performance

- [ ] Images load progressively
- [ ] Lazy loading works (images below fold load on scroll)
- [ ] No image jank/stutter

---

### Services Page (`/services/`)

#### Content Sections

- [ ] Headings are properly formatted (H1 → H2 → H3)
- [ ] Text is readable at all sizes
- [ ] Lists are properly formatted
- [ ] Service cards display correctly

#### Mobile (320px)

- [ ] Service cards stack vertically
- [ ] Descriptions are not truncated
- [ ] Icons/images are visible

#### Tablet (768px)

- [ ] 2-column card layout
- [ ] Images scale properly

#### Desktop (1920px)

- [ ] 3-column grid
- [ ] Consistent card heights
- [ ] Proper spacing between cards

#### Accessibility

- [ ] All text has sufficient contrast
- [ ] Headings follow logical order
- [ ] List structure is semantic

---

## Navigation Testing

### Header Navigation

- [ ] Logo links to home (`/`)
- [ ] All nav links work
- [ ] Active page is indicated
- [ ] No broken links (404s)

### Mobile Menu

- [ ] Hamburger icon appears on mobile
- [ ] Menu opens on click
- [ ] Menu closes on link click
- [ ] Menu closes on outside click
- [ ] Menu is keyboard accessible

### Footer Navigation

- [ ] All footer links work
- [ ] Social links open in new tab (if applicable)
- [ ] Contact info is visible
- [ ] Copyright year is current

---

## Accessibility Tests

### Keyboard Navigation

- [ ] Can navigate entire page with Tab key only
- [ ] Focus order is logical and visible
- [ ] Can close modals with Escape key
- [ ] Can activate buttons/links with Enter/Space

### Screen Reader (NVDA/JAWS)

- [ ] Page title is announced
- [ ] Headings are announced with level
- [ ] Images have descriptive alt text
- [ ] Form labels are associated with inputs
- [ ] Link purpose is clear
- [ ] Lists are announced

### Color Contrast

- [ ] Text color ≥ 4.5:1 contrast with background
- [ ] Large text (18px+) ≥ 3:1 contrast
- [ ] UI components have visible focus indicators
- [ ] Color isn't the only indicator (use icons/text too)

### Motion & Animation

- [ ] Animations respect `prefers-reduced-motion`
- [ ] No auto-playing videos/GIFs
- [ ] Scrolling triggering animations are smooth

---

## Performance Tests

### Lighthouse (Chrome DevTools)

- [ ] Performance score ≥ 90
- [ ] Accessibility score ≥ 95
- [ ] Best Practices score ≥ 90
- [ ] SEO score ≥ 90

### Core Web Vitals

- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] FID (First Input Delay) < 100ms (or INP < 200ms)
- [ ] CLS (Cumulative Layout Shift) < 0.1

### Network Performance

- [ ] Tested on 4G (throttled)
- [ ] Tested on 3G (slow)
- [ ] Load time < 3 seconds on 4G

### Mobile Performance

- [ ] First paint < 1.8 seconds
- [ ] Time to interactive < 3 seconds
- [ ] Images optimized (WebP with JPG fallback)

---

## SEO Tests

### Meta Tags

- [ ] `<title>` tag is present and descriptive (50-60 chars)
- [ ] `<meta description>` is present (150-160 chars)
- [ ] `<meta name="viewport">` is present
- [ ] `<canonical>` URL is set

### Structured Data

- [ ] Organization schema (LocalBusiness) is present
- [ ] Schema validates with Google Rich Results Test
- [ ] No schema errors

### Internal Linking

- [ ] All pages are linked from navigation
- [ ] Breadcrumbs work correctly (if present)
- [ ] Related links point to relevant pages
- [ ] No broken internal links

### XML Sitemap

- [ ] sitemap.xml exists
- [ ] All pages are listed
- [ ] Last-modified dates are current

---

## Browser-Specific Tests

### Chrome

- [ ] All features work
- [ ] No console errors
- [ ] Forms submit correctly
- [ ] Scripts execute properly

### Firefox

- [ ] Layout is identical to Chrome
- [ ] All forms work
- [ ] No console warnings

### Safari (macOS)

- [ ] WebKit rendering is correct
- [ ] Smooth scrolling works
- [ ] Touch actions work on iPad

### Safari (iOS)

- [ ] Viewport is correct
- [ ] No zoom-on-focus issues
- [ ] Safe area (notch) is respected

### Edge

- [ ] Identical to Chrome (Chromium-based)
- [ ] No compatibility issues

---

## Regression Testing

### Changes Made (Phase 1):

- [ ] Pricing page: Hard-coded pixels → CSS variables
- [ ] Form: Accessibility improved
- [ ] All other pages: Unchanged

### Regression Checks:

- [ ] Pricing page layout is identical
- [ ] No new console errors
- [ ] No CSS variables are undefined
- [ ] Form still submits correctly

---

## Test Report Template

```
Page: __________
URL: __________
Date: __________
Tester: __________

## Results

### Desktop (1920px)
- Visual: [ ] Pass  [ ] Fail  [ ] N/A
- Performance: [ ] Pass  [ ] Fail  [ ] N/A
- Accessibility: [ ] Pass  [ ] Fail  [ ] N/A

### Tablet (768px)
- Visual: [ ] Pass  [ ] Fail  [ ] N/A
- Touch Interactions: [ ] Pass  [ ] Fail  [ ] N/A

### Mobile (320px)
- Visual: [ ] Pass  [ ] Fail  [ ] N/A
- Touch Interactions: [ ] Pass  [ ] Fail  [ ] N/A

## Issues Found
1. __________ (Severity: [ ] Critical [ ] High [ ] Medium [ ] Low)
2. __________ (Severity: [ ] Critical [ ] High [ ] Medium [ ] Low)

## Sign-Off
Tester: __________
Date: __________
```

---

## Quick Commands

```bash
# Run local server
npm run serve

# Run Lighthouse audit
# Chrome DevTools → Lighthouse

# Check for console errors
# Chrome DevTools → Console

# Test accessibility
# Open in NVDA (Windows) or VoiceOver (Mac)

# Validate HTML
# W3C Validator: https://validator.w3.org/

# Check responsive
# Chrome DevTools → Device Emulation (Ctrl+Shift+M)
```

---

## Sign-Off

- [ ] All desktop tests passed
- [ ] All tablet tests passed
- [ ] All mobile tests passed
- [ ] All accessibility tests passed
- [ ] All performance tests passed
- [ ] No regressions found
- [ ] Ready for deployment

**QA Lead:** \***\*\_\_\*\***  
**Date:** \***\*\_\_\*\***  
**Notes:** \***\*\_\_\*\***

---

**Next Review:** January 30, 2026
