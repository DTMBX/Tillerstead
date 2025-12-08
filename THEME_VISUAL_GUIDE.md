# Theme Visual Structure Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      Modern Theme System                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Base Layer  │  │Layout Layer │  │Component Layer│      │
│  │              │  │              │  │              │      │
│  │ • Tokens     │  │ • Container  │  │ • Buttons    │      │
│  │ • Reset      │  │ • Grid       │  │ • Cards      │      │
│  │ • Typography │  │              │  │ • Forms      │      │
│  │              │  │              │  │ • Header     │      │
│  │              │  │              │  │ • Footer     │      │
│  │              │  │              │  │ • Hero       │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
│  ┌──────────────────────────────────────────────────┐       │
│  │              Utilities Layer                      │       │
│  │  • Spacing • Display • Typography • Colors       │       │
│  └──────────────────────────────────────────────────┘       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Page Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│                        Site Header                           │
│  ┌──────┐  ┌───────────────────────┐  ┌──────────┐         │
│  │ Logo │  │   Navigation Menu     │  │ CTA Btn  │         │
│  └──────┘  └───────────────────────┘  └──────────┘         │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│                          Hero Section                        │
│                                                              │
│    ┌──────────┐                                             │
│    │ Eyebrow  │                                             │
│    └──────────┘                                             │
│                                                              │
│    ┌────────────────────────────────────────────┐           │
│    │           Hero Title (H1)                  │           │
│    └────────────────────────────────────────────┘           │
│                                                              │
│    Lead paragraph text goes here...                         │
│                                                              │
│    ┌──────────────┐  ┌──────────────┐                      │
│    │ Primary Btn  │  │Secondary Btn │                      │
│    └──────────────┘  └──────────────┘                      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│                      Content Section                         │
│                                                              │
│        ┌─────────────────────────────────────┐              │
│        │        Section Header                │              │
│        │  • Eyebrow • Title • Description    │              │
│        └─────────────────────────────────────┘              │
│                                                              │
│    ┌──────────┐  ┌──────────┐  ┌──────────┐               │
│    │  Card 1  │  │  Card 2  │  │  Card 3  │               │
│    │          │  │          │  │          │               │
│    │  Content │  │  Content │  │  Content │               │
│    │          │  │          │  │          │               │
│    │  [Button]│  │  [Button]│  │  [Button]│               │
│    └──────────┘  └──────────┘  └──────────┘               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
│
┌─────────────────────────────────────────────────────────────┐
│                        Site Footer                           │
│                                                              │
│  ┌───────────┐  ┌──────────────┐  ┌───────────────┐        │
│  │   Brand   │  │  Navigation  │  │   Contact     │        │
│  │   Area    │  │    Links     │  │     Info      │        │
│  └───────────┘  └──────────────┘  └───────────────┘        │
│                                                              │
│  ─────────────────────────────────────────────────          │
│             Copyright © 2025 | Credits                      │
└─────────────────────────────────────────────────────────────┘
```

## Component Anatomy

### Card Component
```
┌─────────────────────────────────────────┐
│ .card                                   │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ .card-image                      │  │
│  │  <img>                           │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ .card-header                     │  │
│  │   <h3 class="card-title">        │  │
│  │   <span class="card-badge">      │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ .card-body                       │  │
│  │   <p class="card-description">   │  │
│  └──────────────────────────────────┘  │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ .card-footer                     │  │
│  │   <a class="btn btn-primary">    │  │
│  └──────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Button Variants
```
┌──────────────────────┐
│   .btn .btn-primary  │  ← Gradient background, white text
└──────────────────────┘

┌──────────────────────┐
│  .btn .btn-secondary │  ← Light background, border
└──────────────────────┘

┌──────────────────────┐
│   .btn .btn-accent   │  ← Accent color gradient
└──────────────────────┘

┌──────────────────────┐
│   .btn .btn-ghost    │  ← Transparent, border only
└──────────────────────┘
```

### Form Layout
```
┌──────────────────────────────────────┐
│ <form class="form-grid">             │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ .form-group                    │ │
│  │  <label class="form-label">   │ │
│  │  <input class="form-input">   │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ .form-group                    │ │
│  │  <label class="form-label">   │ │
│  │  <textarea class="form-textarea">│
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ <button class="btn btn-primary">│
│  └────────────────────────────────┘ │
│                                      │
└──────────────────────────────────────┘
```

## Grid System Visualization

### Auto-fit Grid
```
┌────────────────────────────────────────────────────┐
│ .grid .grid-auto-fit                               │
│                                                    │
│  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  │
│  │ Item 1 │  │ Item 2 │  │ Item 3 │  │ Item 4 │  │
│  └────────┘  └────────┘  └────────┘  └────────┘  │
│                                                    │
│  ┌────────┐  ┌────────┐                           │
│  │ Item 5 │  │ Item 6 │                           │
│  └────────┘  └────────┘                           │
└────────────────────────────────────────────────────┘

Auto-adjusts columns based on container width
Minimum item width: 280px (customizable)
```

### Responsive Grid
```
Mobile (< 768px):
┌──────────────┐
│   Item 1     │
├──────────────┤
│   Item 2     │
├──────────────┤
│   Item 3     │
└──────────────┘

Tablet (768px+):
┌──────────┬──────────┐
│  Item 1  │  Item 2  │
├──────────┼──────────┤
│  Item 3  │  Item 4  │
└──────────┴──────────┘

Desktop (1024px+):
┌───────┬───────┬───────┐
│ Item1 │ Item2 │ Item3 │
├───────┼───────┼───────┤
│ Item4 │ Item5 │ Item6 │
└───────┴───────┴───────┘
```

## Color System

### Light Theme (Default)
```
┌─────────────────────────────────────┐
│  Primary: #0f6a64 (Emerald)        │  ━━━━━━━━
│  Accent:  #c8a046 (Brass)          │  ━━━━━━━━
│  Surface: #ffffff (White)          │  ━━━━━━━━
│  Text:    #0f1a22 (Ink)            │  ━━━━━━━━
│  Muted:   #5d6a75 (Gray)           │  ━━━━━━━━
└─────────────────────────────────────┘
```

### Dark Theme
```
┌─────────────────────────────────────┐
│  Primary: #17a39b (Light Emerald)  │  ━━━━━━━━
│  Accent:  #c8a046 (Brass)          │  ━━━━━━━━
│  Surface: #0f1a2c (Dark Navy)      │  ━━━━━━━━
│  Text:    #e1edf7 (Light Blue)     │  ━━━━━━━━
│  Muted:   #b6c8d8 (Light Gray)     │  ━━━━━━━━
└─────────────────────────────────────┘
```

## Spacing Scale

```
┌─────┬────────┬────────────┐
│ xs  │ 0.5rem │ ━━        │
│ sm  │ 0.75rem│ ━━━       │
│ md  │ 1.25rem│ ━━━━━     │
│ lg  │ 2rem   │ ━━━━━━━━  │
│ xl  │ 3rem   │ ━━━━━━━━━━━━│
└─────┴────────┴────────────┘

Based on 8px baseline grid
Consistent vertical rhythm
```

## Typography Scale

```
Heading 1:  clamp(2.45rem, 4vw, 3.6rem)    ━━━━━━━━━━━━━━━━
Heading 2:  clamp(2rem, 3vw, 2.9rem)       ━━━━━━━━━━━━━
Heading 3:  clamp(1.45rem, 2.2vw, 2rem)    ━━━━━━━━━━
Heading 4:  clamp(1.2rem, 1.7vw, 1.45rem)  ━━━━━━━━
Body:       1rem (16px)                     ━━━━━━
Small:      0.875rem (14px)                 ━━━━━
```

## Shadow Elevation

```
Level 0 (Flat):
  └─────────────┘

Level 1 (Soft):
  └─────────────┘
    ░░░░░░░░░░░

Level 2 (Lift):
  └─────────────┘
    ░░░░░░░░░░░░░░

Level 3 (Glow):
  ╔═════════════╗
  ║             ║ ← Focus ring
  ╚═════════════╝
```

## Border Radius System

```
┌─────────┐  ← sm:  12px
│  Small  │
└─────────┘

┌──────────┐  ← md:  16px
│  Medium  │
└──────────┘

┌────────────┐  ← lg:  24px
│   Large    │
└────────────┘

  ╭────────╮  ← pill: 999px
  │  Pill  │
  ╰────────╯
```

## Responsive Behavior

### Mobile (< 640px)
- Single column layouts
- Stacked cards
- Full-width buttons
- Larger touch targets
- Simplified navigation

### Tablet (640px - 1024px)
- 2-column grids
- Side-by-side cards
- Horizontal button groups
- Enhanced navigation

### Desktop (1024px+)
- 3+ column grids
- Complex layouts
- Hover effects
- Full navigation

## State Indicators

### Button States
```
Default:   [  Button  ]
Hover:     [  Button  ] ↑  (lifts up)
Focus:     [ 〰Button〰]    (focus ring)
Active:    [  Button  ] ↓  (pressed down)
Disabled:  [  Button  ]    (50% opacity)
```

### Input States
```
Default:   ┌─────────────┐
           │             │
           └─────────────┘

Focus:     ┌─────────────┐  ← Primary color border
           │ ▋           │     + glow shadow
           └─────────────┘

Error:     ┌─────────────┐  ← Red border
           │             │     + error message
           └─────────────┘
           ⚠ Error message

Valid:     ┌─────────────┐  ← Green border
           │             │     + success indicator
           └─────────────┘
           ✓ Looks good!
```

## Accessibility Features Visual Guide

```
┌──────────────────────────────────────┐
│  [Skip to main content]              │ ← Skip link (top left)
└──────────────────────────────────────┘

┌─────────────────┐
│   [  Button  ]  │ ← Focus visible outline
│     ╲____/      │   
└─────────────────┘

┌────────────────────────────────┐
│  High Contrast Text            │ ← 4.5:1 ratio minimum
│  ━━━━━━━━━━━━━━                │
│  Background                    │
└────────────────────────────────┘

┌────────────────────────────────┐
│ <button aria-label="Close">   │ ← ARIA labels for
│   ✕                            │   screen readers
│ </button>                      │
└────────────────────────────────┘
```

## File Import Order

```
main-build.scss
│
├─ base/_tokens.scss       ← 1. Design tokens
├─ base/_reset.scss        ← 2. Reset & normalize
├─ base/_typography.scss   ← 3. Typography
│
├─ layout/_container.scss  ← 4. Containers
├─ layout/_grid.scss       ← 5. Grid system
│
├─ components/_buttons.scss  ← 6. Buttons
├─ components/_cards.scss    ← 7. Cards
├─ components/_forms.scss    ← 8. Forms
├─ components/_header.scss   ← 9. Header
├─ components/_footer.scss   ← 10. Footer
├─ components/_hero.scss     ← 11. Hero
│
├─ utilities/_helpers.scss   ← 12. Utilities
│
└─ components/_theme.scss    ← 13. Legacy (compatibility)
```

## Performance Optimization

```
┌──────────────────────────────────────┐
│  CSS Architecture Benefits           │
├──────────────────────────────────────┤
│  ✓ Modular imports                   │
│  ✓ Minimal specificity               │
│  ✓ Utility-first approach            │
│  ✓ Design token reuse                │
│  ✓ Component composition             │
│  ✓ Reduced file size                 │
└──────────────────────────────────────┘
```

---

This visual guide helps understand the structure and hierarchy of the modern theme system. Use it as a reference when building new pages or components.
