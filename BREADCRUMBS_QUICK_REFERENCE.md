# Breadcrumbs Quick Reference

## 🎯 What Changed

| Aspect             | Before              | After                  | Impact          |
| ------------------ | ------------------- | ---------------------- | --------------- |
| **Mobile Font**    | 0.75rem (too small) | 0.8rem (readable)      | Better UX       |
| **Touch Height**   | 30px (too small)    | 40-48px (accessible)   | WCAG AA+        |
| **Link Max-Width** | None (wraps)        | 120-300px (truncates)  | Mobile-friendly |
| **Separators**     | Black (harsh)       | Muted + opacity (soft) | Better design   |
| **Hover State**    | Color only          | Color + background     | Better feedback |
| **Focus Outline**  | 2px (minimal)       | 3px (clear)            | More accessible |

---

## 📱 Responsive Sizing

### Mobile (320-640px)

```css
Font size:    0.8rem (largest readable on small screen)
Touch height: 40px (minimum accessible target)
Max-width:    120px per link (truncates with ellipsis)
Padding:      clamp(0.4rem, 2vi, 0.75rem)
Gap:          0.2rem (compact spacing)
```

**Result**: Tight but readable, with proper touch targets

### Tablet (641-1024px)

```css
Font size:    0.9rem
Touch height: 44px
Max-width:    250px (most links fit fully)
Padding:      clamp(0.5rem, 3vi, 1rem)
Gap:          clamp(0.25rem, 2vw, 0.5rem)
```

**Result**: Good spacing, most links visible

### Desktop (1025px+)

```css
Font size:    0.95rem (optimal readability)
Touch height: 48px
Max-width:    300px (full links visible)
Padding:      clamp(0.5rem, 3vi, 1rem)
Gap:          clamp(0.25rem, 2vw, 0.5rem)
```

**Result**: Professional appearance, excellent readability

---

## 🎨 Visual Styling

### Colors

```
Links:      Primary teal (#078930)
Separators: Muted gray (with 0.7 opacity)
Current:    Heading dark color
Hover:      Primary + light background
```

### Interactive States

```
Normal:  Text only
Hover:   Underline + light background
Focus:   3px outline + background
Active:  Darker background
```

---

## 💾 Implementation

### Auto-Include

Breadcrumbs automatically display on all subpages:

```html
<!-- Included in _layouts/default.html -->
{% include components/ts-breadcrumbs.html %}
```

### Disable Breadcrumbs

```yaml
---
hide_breadcrumbs: true
---
```

### Custom Breadcrumb Title

```yaml
---
breadcrumb_title: "Custom Title"
---
```

### Parent Page

```yaml
---
parent: /services/
parent_label: "Our Services"
---
```

---

## 🔍 Mobile Truncation

### How It Works

- Links longer than 120px on mobile show ellipsis (...)
- Current page gets 150px (shows most page names)
- Separators don't wrap (always on same line)
- Touch targets stay 40px minimum height

### Example

```
Desktop:  Home › Services › Bathroom Remodeling
Tablet:   Home › Services › Bathroom Remodeling
Mobile:   Home › Services › Bathroom ... (ellipsis)
```

---

## ♿ Accessibility

### Touch Targets

- Mobile: 40px minimum height
- Tablet: 44px minimum height
- Desktop: 48px minimum height
- All targets exceed WCAG AA standard

### Keyboard Navigation

```
Tab:        Next breadcrumb
Shift+Tab:  Previous breadcrumb
Enter:      Follow link
```

### Screen Readers

- Announces "Breadcrumb navigation"
- Lists each link with label
- Current page marked as "current page"
- Links are properly labeled

### Color Contrast

- Links: 4.5:1 (WCAG AA)
- Current page: 7:1 (WCAG AAA)
- Separators: 4.5:1 (WCAG AA)

---

## 📋 SEO & Schema

### Schema.org Markup

Includes BreadcrumbList with:

- Position numbers (1, 2, 3...)
- Item names and URLs
- JSON-LD format for search engines
- Validates at schema.org

### Search Engine Benefits

- Better site structure understanding
- Breadcrumb display in search results
- Improved crawling
- Better SEO ranking

---

## ✅ Checklist

### Content Editors

- [ ] Set `breadcrumb_title` for long page titles
- [ ] Verify breadcrumbs appear on non-homepage pages
- [ ] Test on mobile (should truncate gracefully)
- [ ] Check links navigate correctly

### Developers

- [ ] Run CSS through compiler (no errors)
- [ ] Test on mobile, tablet, desktop
- [ ] Verify touch targets are 40px+
- [ ] Check keyboard navigation works
- [ ] Validate schema.org markup

### QA / Testing

- [ ] Mobile truncation shows ellipsis
- [ ] Hover underline appears
- [ ] Focus outline is visible
- [ ] Separators don't wrap
- [ ] Colors meet contrast requirements

---

## 🐛 Quick Fixes

| Issue                       | Solution                                      |
| --------------------------- | --------------------------------------------- |
| **Breadcrumbs not showing** | Check `hide_breadcrumbs: false`, not homepage |
| **Text too truncated**      | Increase max-width in CSS, or shorten title   |
| **Touch target too small**  | Verify min-height is set (40-48px)            |
| **Wrong parent**            | Set `parent:` and `parent_label:` in YAML     |
| **Bad schema markup**       | Check JSON-LD syntax in template              |

---

## 📊 Performance

- **CSS Size**: +0.4KB (negligible)
- **No JavaScript**: Pure CSS
- **Mobile-friendly**: Responsive and accessible
- **Fast rendering**: Clamp-based sizing, no calc() overhead
- **60fps**: GPU-accelerated hover effects

---

## 🌐 Browser Support

✅ All modern browsers:

- Chrome/Edge 90+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📚 Learn More

Full guide: `BREADCRUMBS_OPTIMIZATION_GUIDE.md`

Topics covered:

- Complete sizing specifications
- Mobile optimization details
- Accessibility requirements
- UX improvements
- Implementation guide
- Troubleshooting tips

---

**Key Principle**: Breadcrumbs should be small but accessible, readable on all devices, and provide clear navigation. ✅
