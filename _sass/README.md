# Tillerstead CSS Architecture

**Professional + Nostalgic + Memorable Design System**

## 📁 Folder Structure

```
_sass/
├── 00-settings/          # Design tokens & configuration
│   ├── _tokens-hybrid.scss   ✅ Active: Current design system
│   └── _patterns.scss        ✅ Active: SVG background patterns
│
├── 10-base/              # Foundation styles
│   ├── _reset.scss          ✅ Modern CSS reset
│   ├── _typography.scss     ✅ Font system & hierarchy
│   └── _performance.scss    ✅ Optimization utilities
│
├── 20-layout/            # Page structure & grid
│   ├── _container.scss      ✅ Max-width containers
│   ├── _grid.scss           ✅ Responsive grid system
│   ├── _mobile.scss         ✅ Mobile breakpoints
│   └── _tillerstead-theme.scss  ✅ Layout patterns
│
├── 30-components/        # Reusable UI components
│   ├── _buttons.scss        ✅ Button variants & states
│   ├── _cards.scss          ✅ Service & project cards
│   ├── _plans.scss          ✅ Pricing cards
│   ├── _forms.scss          ✅ Form elements
│   ├── _form-enhancements.scss ✅ Validation & UX
│   ├── _header-premium.scss ✅ Site navigation
│   ├── _footer.scss         ✅ Footer layout
│   ├── _footer-premium.scss ✅ Footer enhancements
│   ├── _hero.scss           ✅ Hero sections
│   ├── _animations.scss     ✅ Transitions & effects
│   ├── _breadcrumbs.scss    ✅ Navigation breadcrumbs
│   ├── _social-links.scss   ✅ Social media icons
│   ├── _nj-statewide.scss   ✅ Service area map
│   ├── _home.scss           ✅ Homepage sections
│   └── _deliver.scss        ✅ Delivery/process section
│
├── 40-pages/             # Page-specific styles
│   └── _portfolio.scss      ✅ Project gallery
│
├── 40-utilities/         # Helper classes
│   └── _helpers.scss        ✅ Spacing, visibility, etc.
│
└── 99-archive/           # Archived/unused files
    ├── _cartoon-components.scss
    ├── _comic-components.scss
    ├── _theme.scss
    ├── _header.scss
    ├── _hero-premium.scss
    ├── _tokens.scss
    ├── _tokens-90s.scss
    ├── _tokens-cartoon.scss
    └── _contrast.scss
```

## 🎨 Design System

### Color Strategy

- **Primary**: Trustworthy teal (professional tile expert)
- **Accents**: Warm sunset tones (nostalgic, approachable)
- **Highlights**: Strategic pops of energy (memorable moments)
- **Foundation**: Clean neutrals (readable, accessible)

### Typography

- **Headlines**: Bold, confident, memorable
- **Body**: Clean, readable, professional
- **Accents**: Playful touches for personality

### Patterns

Sacred geometric SVG patterns for subtle visual interest:

- `pattern-sacred-geometry` - Hero backgrounds
- `pattern-tile-crosshatch` - Alternating sections
- `pattern-subtle-dots` - Cards & components

## 🔧 Build Process

All SCSS files are compiled via:

```bash
npm run build:css
```

Main entry point: `assets/css/main.scss`

## 📊 Import Order

1. **Settings** - Variables, tokens, patterns
2. **Base** - Reset, typography, performance
3. **Layout** - Grid, container, responsive
4. **Components** - Reusable UI elements
5. **Pages** - Page-specific overrides
6. **Utilities** - Helper classes

## ✅ Standards

- WCAG 2.1 AA compliant
- Mobile-first responsive design
- BEM-inspired naming conventions
- CSS custom properties for theming
- Minimal specificity conflicts

## 🎯 Active Design System

**tokens-hybrid.scss** is the current active design system combining:

- Professional credibility
- Nostalgic warmth
- Memorable personality

## 📦 Archived Files

Files in `99-archive/` are previous iterations kept for reference:

- Alternative theme variations
- Experimental components
- Deprecated utilities

## 🚀 Performance

- Critical CSS inlined in `<head>`
- Non-critical loaded async
- CSS custom properties for runtime theming
- Minimal selector nesting
- Optimized for modern browsers
