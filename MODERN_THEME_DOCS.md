# Modern Theme Architecture Documentation

## Overview
This document describes the refactored, modern theme architecture for Tillerstead.com. The new structure follows industry best practices with a modular, maintainable CSS architecture built on HTML5 and CSS3 standards.

## Architecture Principles

### 1. **Separation of Concerns**
- **Base Layer**: Foundational styles (reset, tokens, typography)
- **Layout Layer**: Structural components (containers, grid)
- **Component Layer**: Reusable UI elements (buttons, cards, forms)
- **Utilities Layer**: Helper classes for rapid development

### 2. **Mobile-First Responsive Design**
All components are built with a mobile-first approach, using `min-width` media queries for progressive enhancement.

### 3. **CSS Custom Properties (Design Tokens)**
Centralized design tokens in `_sass/base/_tokens.scss` ensure consistency and enable easy theming.

### 4. **Accessibility First**
- Semantic HTML5 elements
- ARIA attributes where appropriate
- Focus states for keyboard navigation
- Color contrast compliance (WCAG 2.1 AA)
- Screen reader support

## File Structure

```
_sass/
├── base/
│   ├── _tokens.scss          # Design tokens & CSS custom properties
│   ├── _reset.scss            # Modern CSS reset
│   └── _typography.scss       # Typography system
├── layout/
│   ├── _container.scss        # Container & wrapper utilities
│   └── _grid.scss             # Flexible grid system
├── components/
│   ├── _buttons.scss          # Button components
│   ├── _cards.scss            # Card components
│   ├── _forms.scss            # Form elements
│   ├── _header.scss           # Site header & navigation
│   ├── _footer.scss           # Site footer
│   ├── _hero.scss             # Hero sections
│   └── _theme.scss            # Legacy theme (backwards compatibility)
└── utilities/
    └── _helpers.scss          # Utility classes
```

## Key Features

### Design Tokens (`_sass/base/_tokens.scss`)
Centralized variables for:
- **Colors**: Primary, accent, surface, text colors
- **Typography**: Font families, sizes, line heights
- **Spacing**: Consistent spacing scale (8px baseline)
- **Shadows**: Elevation system
- **Border Radius**: Rounded corners
- **Transitions**: Animation timing

### Modern CSS Reset (`_sass/base/_reset.scss`)
- Box-sizing normalization
- Sensible defaults for all elements
- Accessibility helpers (`.sr-only`, `.skip-link`)
- Reduced motion support
- Cross-browser consistency

### Typography System (`_sass/base/_typography.scss`)
- Fluid typography using `clamp()`
- Semantic heading styles (h1-h6)
- Body text, lead text, small text
- Responsive font scaling
- Text utilities (alignment, weight, color)

### Grid System (`_sass/layout/_grid.scss`)
- CSS Grid-based layout
- Auto-fit/auto-fill responsive grids
- Column spanning
- Gap utilities
- Responsive breakpoint utilities
- Predefined grid patterns

### Components

#### Buttons (`_sass/components/_buttons.scss`)
- Primary, secondary, accent, ghost variants
- Size variants (sm, lg, xl)
- Icon buttons
- Loading states
- Button groups
- Full-width option

#### Cards (`_sass/components/_cards.scss`)
- Flexible card layout
- Image support
- Header, body, footer sections
- Badge/tag support
- Interactive states
- Horizontal layout option
- Specific card types (review, plan, service, process)

#### Forms (`_sass/components/_forms.scss`)
- Text inputs, textarea, select
- Checkbox & radio buttons
- Input groups with icons/addons
- Validation states
- Help text & error messages
- Responsive grid layout
- File upload styling
- Range slider

#### Header (`_sass/components/_header.scss`)
- Sticky header with backdrop blur
- Responsive navigation
- Mobile drawer menu
- Logo/brand area
- Action buttons
- Focus states & accessibility

#### Footer (`_sass/components/_footer.scss`)
- Flexible multi-column layout
- Brand area with logo
- Navigation links
- Contact information
- Social links
- Copyright/credits
- Responsive stacking

#### Hero (`_sass/components/_hero.scss`)
- Surface with gradient & pattern
- Eyebrow, title, lead text
- Action buttons
- KPI/stats display
- Info bubbles
- Multiple variants (centered, split, compact, home)
- Media/image support

### Utilities (`_sass/utilities/_helpers.scss`)
Helper classes for:
- Spacing (margin, padding)
- Display & flexbox
- Typography
- Colors & backgrounds
- Borders & shadows
- Width & height
- Position & overflow
- Responsive variants

## Usage Examples

### Using the Grid System
```html
<!-- Auto-fit grid -->
<div class="grid grid-auto-fit gap-lg">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

### Creating Buttons
```html
<!-- Primary button -->
<button class="btn btn-primary">Get Started</button>

<!-- Secondary button with icon -->
<button class="btn btn-secondary btn-icon">
  <svg class="icon">...</svg>
  Learn More
</button>

<!-- Button group -->
<div class="btn-group btn-group-center">
  <button class="btn btn-primary">Sign Up</button>
  <button class="btn btn-ghost">Learn More</button>
</div>
```

### Building Cards
```html
<div class="card">
  <div class="card-image card-image-aspect">
    <img src="..." alt="...">
  </div>
  <div class="card-body">
    <h3 class="card-title">Card Title</h3>
    <p class="card-description">Card description text goes here.</p>
  </div>
  <div class="card-footer">
    <a href="#" class="btn btn-primary">Learn More</a>
  </div>
</div>
```

### Using Utilities
```html
<!-- Spacing -->
<div class="mt-4 mb-5 px-3">Content</div>

<!-- Flexbox -->
<div class="d-flex items-center justify-between">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Typography -->
<p class="text-lg text-muted font-semibold">Large muted text</p>

<!-- Responsive -->
<div class="d-block md:d-flex lg:grid-cols-3">...</div>
```

## Breakpoints

The theme uses the following responsive breakpoints:

- **Small (sm)**: 640px and up
- **Medium (md)**: 768px and up
- **Large (lg)**: 1024px and up
- **Extra Large (xl)**: 1280px and up

## Browser Support

The modern theme supports:
- Chrome/Edge 49+
- Firefox 31+
- Safari 9.1+
- iOS Safari 9.3+
- Android Browser 4.4+

Features requiring polyfills:
- CSS Grid (IE11 - not officially supported)
- CSS Custom Properties (IE11 - not officially supported)

## Performance Considerations

### CSS
- Modular imports reduce redundancy
- Utility classes minimize custom CSS
- Design tokens enable easy theme switching

### HTML
- Semantic markup improves accessibility and SEO
- Reduced DOM complexity
- Progressive enhancement approach

### JavaScript
- Minimal JS dependency
- Focus on CSS-first solutions
- Smooth degradation for older browsers

## Accessibility Features

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Clear focus states on all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG AA compliant (4.5:1 for text, 3:1 for large text)
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Skip Links**: Navigation bypass for keyboard users

## Migration Guide

### From Old Theme
The new theme is fully backwards compatible with the existing `components/_theme.scss` file. You can:

1. **Gradual Migration**: Use new components alongside existing ones
2. **Drop-in Replacement**: New classes follow similar naming conventions
3. **Token-based**: Update design tokens to change the entire theme

### Component Mapping
- `.btn` → Modern button system with variants
- `.card`, `.ts-card` → Enhanced card component
- `.hero`, `.ts-hero` → Improved hero sections
- `.container`, `.ts-container` → Consistent container system

## Customization

### Modifying Design Tokens
Edit `_sass/base/_tokens.scss` to customize:
```scss
:root {
  --ts-color-primary: #your-color;
  --ts-spacing-md: 1.5rem;
  --ts-radius-lg: 20px;
}
```

### Creating Custom Components
Follow the established pattern:
```scss
// _sass/components/_custom.scss
.custom-component {
  padding: var(--ts-spacing-md);
  background: var(--ts-color-surface);
  border-radius: var(--ts-radius-md);
  
  &:hover {
    box-shadow: var(--ts-shadow-lift);
  }
}
```

### Adding Utility Classes
Extend `_sass/utilities/_helpers.scss`:
```scss
.my-utility {
  /* Your custom utility */
}
```

## Best Practices

1. **Use Design Tokens**: Always reference CSS custom properties instead of hard-coded values
2. **Mobile-First**: Start with mobile styles, add desktop enhancements
3. **Semantic HTML**: Use appropriate HTML5 elements
4. **Utility Classes**: Use utilities for common patterns to reduce custom CSS
5. **Component Reuse**: Favor existing components over creating new ones
6. **Accessibility**: Test with keyboard navigation and screen readers
7. **Performance**: Minimize custom styles, leverage built-in components

## Testing

### Cross-browser Testing
Test on:
- Latest Chrome, Firefox, Safari, Edge
- Mobile: iOS Safari, Chrome Mobile
- Screen readers: NVDA, JAWS, VoiceOver

### Validation
- Run `bundle exec jekyll build` to check SCSS compilation
- Use browser DevTools to inspect responsive behavior
- Validate HTML5 markup
- Check color contrast ratios

## Future Enhancements

Potential improvements:
- Dark mode toggle system
- Additional component variants
- Animation library
- Print stylesheet
- RTL (Right-to-Left) support
- CSS containment for performance

## Support & Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [Web.dev](https://web.dev/)
- [A11y Project](https://www.a11yproject.com/)

## Conclusion

This modern theme architecture provides a solid foundation for building accessible, responsive, and maintainable web pages. The modular structure makes it easy to extend and customize while maintaining consistency across the site.
