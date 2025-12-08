# Modern Theme Quick Reference

## Common Patterns & Code Snippets

### Page Structure
```html
<section class="section">
  <div class="container">
    <div class="section-header text-center">
      <span class="eyebrow">Section Label</span>
      <h2 class="section-title">Section Heading</h2>
      <p class="section-lead">Optional lead paragraph</p>
    </div>
    
    <div class="grid grid-auto-fit gap-lg">
      <!-- Content -->
    </div>
  </div>
</section>
```

### Hero Section
```html
<section class="hero">
  <div class="hero-surface">
    <div class="hero-inner">
      <div class="hero-main">
        <span class="hero-eyebrow">Eyebrow Text</span>
        <h1 class="hero-title">Main Headline</h1>
        <p class="hero-lead">Descriptive lead paragraph</p>
        
        <div class="hero-actions">
          <a href="#" class="btn btn-primary">Primary Action</a>
          <a href="#" class="btn btn-secondary">Secondary Action</a>
        </div>
      </div>
    </div>
  </div>
</section>
```

### Card Grid
```html
<div class="grid grid-auto-fit gap-lg">
  <div class="card">
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">Description text</p>
    <div class="card-footer">
      <a href="#" class="btn btn-primary btn-sm">Learn More</a>
    </div>
  </div>
  <!-- More cards -->
</div>
```

### Form Layout
```html
<form class="form-grid">
  <div class="form-group">
    <label for="name" class="form-label">Name</label>
    <input type="text" id="name" class="form-input" required>
  </div>
  
  <div class="form-group">
    <label for="email" class="form-label">Email</label>
    <input type="email" id="email" class="form-input" required>
  </div>
  
  <div class="form-group form-grid-full">
    <label for="message" class="form-label">Message</label>
    <textarea id="message" class="form-textarea"></textarea>
  </div>
  
  <div class="form-grid-full">
    <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
```

### Navigation
```html
<nav class="site-nav">
  <ul class="site-menu">
    <li><a href="/" aria-current="page">Home</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/services">Services</a></li>
    <li><a href="/contact">Contact</a></li>
  </ul>
</nav>
```

### Responsive Grid Layouts
```html
<!-- 1 column mobile, 2 columns tablet, 3 columns desktop -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- Auto-fit with minimum width -->
<div class="grid grid-auto-fit grid-auto-md gap-lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

## Utility Class Cheatsheet

### Spacing
```
mt-{0-5}     - Margin top
mb-{0-5}     - Margin bottom
pt-{0-5}     - Padding top
pb-{0-5}     - Padding bottom
mx-auto      - Center horizontally
gap-{xs,sm,md,lg,xl} - Gap between grid/flex items
```

### Display
```
d-none       - Display none
d-block      - Display block
d-flex       - Display flex
d-grid       - Display grid
flex-column  - Flex direction column
flex-wrap    - Flex wrap
```

### Alignment
```
justify-center   - Justify content center
justify-between  - Justify content space-between
items-center     - Align items center
text-center      - Text align center
```

### Typography
```
text-primary     - Primary color text
text-heading     - Heading color text
text-muted       - Muted color text
font-semibold    - Font weight 600
font-bold        - Font weight 700
```

### Backgrounds & Borders
```
bg-surface       - Surface background
bg-gradient      - Gradient background
rounded-sm       - Small border radius
rounded-lg       - Large border radius
rounded-full     - Full circle/pill
shadow-soft      - Soft shadow
shadow-lift      - Elevated shadow
```

### Width & Height
```
w-full           - Width 100%
h-full           - Height 100%
max-w-prose      - Max width for readable text (65ch)
```

### Responsive
```
sm:d-none        - Hide on small screens
md:d-flex        - Show as flex on medium+
sm:text-center   - Center text on small screens
```

## Design Token Reference

### Colors
```scss
--ts-color-primary        // Main brand color
--ts-color-accent         // Accent/secondary color
--ts-color-heading        // Heading text color
--ts-color-text           // Body text color
--ts-color-muted          // Muted text color
--ts-color-surface        // Surface/card background
--ts-color-surface-elevated // Elevated surface
--ts-color-border         // Border color
```

### Spacing
```scss
--ts-spacing-xs   // 0.5rem
--ts-spacing-sm   // 0.75rem
--ts-spacing-md   // 1.25rem
--ts-spacing-lg   // 2rem
--ts-spacing-xl   // 3rem
```

### Typography
```scss
--font-heading    // Heading font family
--font-sans       // Body font family
--heading-1       // H1 size (responsive)
--heading-2       // H2 size (responsive)
--heading-3       // H3 size (responsive)
--line-height-tight    // 1.2
--line-height-base     // 1.65
--line-height-relaxed  // 1.85
```

### Border Radius
```scss
--ts-radius-sm    // 12px
--ts-radius-md    // 16px
--ts-radius-lg    // 24px
--ts-radius-pill  // 999px
```

### Shadows
```scss
--ts-shadow-soft  // Soft elevation
--ts-shadow-lift  // Strong elevation
--ts-shadow-glow  // Focus/glow effect
```

## Component Class Reference

### Buttons
```
.btn              - Base button
.btn-primary      - Primary button
.btn-secondary    - Secondary button
.btn-accent       - Accent button
.btn-ghost        - Ghost/outline button
.btn-sm           - Small button
.btn-lg           - Large button
.btn-icon         - Button with icon
.btn-group        - Button group container
```

### Cards
```
.card             - Base card
.card-header      - Card header section
.card-title       - Card title
.card-body        - Card body/content
.card-footer      - Card footer
.card-image       - Card image container
.card-badge       - Badge/tag
.card-elevated    - Elevated shadow
.card-featured    - Featured style
```

### Forms
```
.form-group       - Form field group
.form-label       - Form label
.form-input       - Text input
.form-textarea    - Textarea
.form-select      - Select dropdown
.form-check       - Checkbox/radio group
.form-error       - Error message
.form-help        - Help text
.form-grid        - Form grid layout
```

### Layout
```
.container        - Main container
.section          - Section wrapper
.section-header   - Section header
.grid             - Grid container
.grid-auto-fit    - Auto-fit grid
.stack            - Vertical stack
.cluster          - Horizontal group
```

## Responsive Breakpoints

```scss
// Mobile-first approach
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## Accessibility Checklist

- [ ] All images have descriptive `alt` text
- [ ] Form inputs have associated `<label>` elements
- [ ] Links have descriptive text (avoid "click here")
- [ ] Focus states are visible for keyboard navigation
- [ ] Color contrast meets WCAG AA standards (4.5:1 for text)
- [ ] Interactive elements are keyboard accessible
- [ ] Headings follow logical hierarchy (h1 → h2 → h3)
- [ ] ARIA labels used where appropriate
- [ ] Skip link provided for keyboard users
- [ ] Content respects `prefers-reduced-motion`

## Common Mistakes to Avoid

1. **Don't hardcode colors** - Use design tokens instead
   - ❌ `color: #0f6a64;`
   - ✅ `color: var(--ts-color-primary);`

2. **Don't use inline styles** - Use utility classes
   - ❌ `style="margin-top: 20px;"`
   - ✅ `class="mt-3"`

3. **Don't create custom CSS for common patterns** - Use components
   - ❌ Custom button styles
   - ✅ `.btn .btn-primary`

4. **Don't forget responsive design** - Test on mobile
   - Always test on mobile devices
   - Use responsive utilities

5. **Don't skip accessibility** - Always think about all users
   - Keyboard navigation
   - Screen reader support
   - Sufficient color contrast

## Tips for Success

1. **Start with components** - Use existing components before creating custom styles
2. **Use the grid system** - Leverage the flexible grid for layouts
3. **Utilize design tokens** - Keep the design consistent by using tokens
4. **Think mobile-first** - Design for small screens first, enhance for larger
5. **Test accessibility** - Use keyboard and screen reader to test
6. **Keep it semantic** - Use proper HTML5 elements
7. **Minimize custom CSS** - Favor utility classes and components
