# Animation Optimization Guide

## 🎬 Overview

Tillerstead.com's animation system has been optimized for performance, accessibility, and user experience. This guide covers the animation system, best practices, and how to extend it.

---

## ✨ What Was Optimized

### Performance Improvements

- ✅ GPU acceleration via `transform` and `opacity` only
- ✅ Removed expensive properties (width, height, etc.)
- ✅ Optimized easing curves for smoothness
- ✅ Efficient stagger patterns with balanced delays
- ✅ `will-change` usage for animation hints
- ✅ Proper cleanup with `will-change: auto`

### Accessibility

- ✅ `prefers-reduced-motion` respected site-wide
- ✅ High contrast mode support
- ✅ Print styles disable animations
- ✅ Keyboard navigation animations preserved

### User Experience

- ✅ Smooth transitions on all interactive elements
- ✅ Consistent timing across the site
- ✅ Purposeful animations (never distracting)
- ✅ Mobile-optimized animation timings

---

## 🎯 Animation System

### Core Animations

#### Entrance Animations

```scss
.animate-fade-in        /* Simple opacity fade */
.animate-slide-in-up    /* Slide up with fade */
.animate-slide-in-down  /* Slide down with fade */
.animate-slide-in-left  /* Slide left with fade */
.animate-slide-in-right /* Slide right with fade */
.animate-scale-in       /* Scale up with fade */
.animate-bounce-in      /* Playful bounce entrance */
```

#### Loop Animations

```scss
.animate-float   /* Subtle floating motion */
.animate-pulse   /* Attention-getting pulse */
.animate-glow    /* Emphasis glow effect */
```

#### Transition Classes

```scss
.transition-hover      /* Smooth color + transform transitions */
.transition-color      /* Color, background, border transitions */
.transition-transform  /* GPU-accelerated transform transitions */
.transition-shadow     /* Box shadow transitions */
.transition-elevation  /* Elevation effect (shadow + transform) */
```

### Stagger Animations

For grids and lists:

```html
<!-- Grid animation -->
<div class="grid-animate">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>

<!-- List animation -->
<ul class="list-animate">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<!-- Stagger parent -->
<div class="animate-stagger">
  <div>Staggered item 1</div>
  <div>Staggered item 2</div>
  <div>Staggered item 3</div>
</div>
```

**Stagger Timing:**

- Item 1: 0ms delay
- Item 2: 75ms delay
- Item 3: 150ms delay
- Item 4: 225ms delay
- Item 5: 300ms delay
- Item 6+: 375ms delay

This creates smooth, cascading animations without overwhelming the user.

---

## 🔧 Advanced Animations

### Scroll-Triggered Animations

```html
<!-- Fade in on scroll -->
<div data-scroll-animate="fade-in">Content</div>

<!-- Slide in from left -->
<div data-scroll-animate="fade-in-left">Content</div>

<!-- Slide in from right -->
<div data-scroll-animate="fade-in-right">Content</div>

<!-- Scale in -->
<div data-scroll-animate="scale-in">Content</div>
```

These automatically apply the `.in-view` class when scrolled into viewport.

### Staggered Grid Animations

```html
<!-- Stagger grid items as they appear in viewport -->
<div data-stagger-animate class="grid-3col">
  <div>Item 1</div>
  <div>Item 2</div>
  <!-- ... -->
</div>
```

Delays: 0ms, 60ms, 120ms, 180ms... (up to 12 items)

### State Transitions

```html
<!-- Expandable panel -->
<div data-expand-toggle>
  <!-- Content that expands/collapses -->
</div>

<!-- Side panel -->
<div data-slide-panel class="is-open">
  <!-- Slides in from right -->
</div>

<!-- Modal -->
<div data-modal class="is-visible">
  <!-- Scales up with fade -->
</div>

<!-- Dropdown -->
<div data-dropdown class="is-open">
  <!-- Slides down with fade -->
</div>
```

---

## ⚡ Performance Best Practices

### DO ✅

- ✅ Use `transform` and `opacity` for animations
- ✅ Use `will-change` sparingly on animated elements
- ✅ Remove `will-change: auto` after animation completes
- ✅ Use GPU acceleration for complex animations
- ✅ Stagger animations with balanced delays (50-100ms)
- ✅ Respect `prefers-reduced-motion`
- ✅ Test on mobile devices (lower performance)

### DON'T ❌

- ❌ Animate width, height, left, right, top, bottom
- ❌ Animate layout-affecting properties
- ❌ Use `transition: all` (specify which properties)
- ❌ Overuse animations (max 3-4 simultaneous)
- ❌ Use long animation durations (keep <500ms for entrance)
- ❌ Animate on page load without user interaction
- ❌ Ignore `prefers-reduced-motion`

### Animation Timings

```scss
Fast animations:    200ms (hover effects, focus states)
Base animations:    300ms (entrance effects, transitions)
Slow animations:    500ms (page load sequences)
Loop animations:    1-3s (continuous effects)
```

---

## ♿ Accessibility

### Respecting User Preferences

All animations respect `prefers-reduced-motion`:

```scss
@media (prefers-reduced-motion: reduce) {
  /* Animations disabled for users who prefer reduced motion */
  animation: none !important;
  transition: none !important;
}
```

**What this means:**

- Users who prefer reduced motion will see instant changes
- No animation delays, all content appears immediately
- Fully functional, just without the motion

### Testing

To test reduced motion:

**Chrome/Edge:**

1. DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion
2. Select "prefers-reduced-motion: reduce"

**Firefox:**

1. about:config
2. Search "ui.prefersReducedMotion"
3. Set to 1

**macOS:**

1. System Preferences > Accessibility > Display
2. Enable "Reduce motion"

---

## 🎨 Animation Patterns

### Button Hover Effect

```html
<button class="btn btn--primary">Click me</button>
```

**Animation:**

- On hover: Lift 1px, glow appears, color brightens
- On active: Return to baseline, reduced glow
- Duration: 200ms (fast)
- Easing: Material Design standard curve

### Card Hover Effect

```html
<div class="card">
  <img src="image.jpg" alt="Description" />
  <h3>Card Title</h3>
  <p>Card description</p>
</div>
```

**Animation:**

- On hover: Lift 4px, shadow increases, image scales 1.05
- Duration: 300ms (smooth)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Input Focus Effect

```html
<input type="text" placeholder="Enter text" />
```

**Animation:**

- On focus: Border color changes, glow shadow appears
- Duration: 300ms (smooth)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Entrance Animation Sequence

```html
<div class="animate-stagger">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</div>
```

**Animation Sequence:**

1. Title: Fades in, slides up (0ms)
2. Paragraph 1: Fades in, slides up (75ms delay)
3. Paragraph 2: Fades in, slides up (150ms delay)

- Total sequence duration: ~450ms
- Feels smooth and natural, not overwhelming

---

## 🚀 Using the Animation System

### Simple Entrance

```html
<!-- Fade in on page load -->
<section class="animate-fade-in">Content appears smoothly</section>

<!-- Slide up on page load -->
<div class="animate-slide-in-up">Content slides up and fades in</div>
```

### Grid Animation

```html
<div class="grid-3col grid-animate">
  <div class="card">Item 1</div>
  <div class="card">Item 2</div>
  <div class="card">Item 3</div>
  <!-- Items appear with staggered animation -->
</div>
```

### Scroll-Triggered Animation

```html
<!-- Requires JavaScript to toggle .in-view class -->
<div data-scroll-animate="fade-in">Animates when scrolled into view</div>
```

### Interactive Elements

```html
<!-- Button with hover animation -->
<button class="btn btn--primary transition-hover">Hover to see effect</button>

<!-- Card with hover animation -->
<div class="card transition-elevation">Hover to lift</div>

<!-- Input with focus animation -->
<input type="text" class="transition-color" />
```

---

## 📊 Performance Metrics

### Animation Budget

Modern devices can comfortably handle:

- ✅ 2-3 simultaneous animations
- ✅ 4-6 staggered animations (sequential)
- ✅ 10+ hover state transitions
- ✅ 20+ page load entrances (staggered)

### Device Performance

| Device         | Animation Performance | Notes                                   |
| -------------- | --------------------- | --------------------------------------- |
| Desktop        | Excellent             | 60fps smooth                            |
| Tablet         | Good                  | 60fps, reduce simultaneous animations   |
| Mobile         | Fair                  | 30-60fps, use only necessary animations |
| Low-end Mobile | Limited               | Respect prefers-reduced-motion          |

---

## 🔍 Debugging

### Common Issues

**Animation doesn't play:**

- Check `.in-view` class is being applied
- Verify CSS compiled successfully
- Check browser DevTools Performance tab

**Janky/stuttering animation:**

- Avoid animating layout properties
- Stick to transform and opacity
- Check for JavaScript performance issues
- Profile with Chrome DevTools

**Animation plays once then stops:**

- Ensure `animation-fill-mode` is set correctly
- Check for conflicting CSS rules
- Verify element isn't hidden/removed

**Animation plays when it shouldn't:**

- Check `prefers-reduced-motion` is respected
- Verify conditional classes are applied correctly
- Clear browser cache (Ctrl+Shift+Delete)

---

## 📚 File Structure

### Animation Files

```
_sass/10-base/_animations.scss           /* Core animations & transitions */
_sass/30-components/_animations.scss     /* Component-specific animations */
_sass/30-components/_advanced-animations.scss /* Scroll/stagger patterns */
_sass/30-components/_joyful-animations.scss   /* Playful animations */
```

### What's in Each

**`_animations.scss` (Core):**

- Entrance keyframes (fadeIn, slideIn, scaleIn, bounceIn)
- Loop keyframes (float, pulse, glow, rotate, wave)
- Transition classes (hover, color, transform, shadow)
- Button & link animations
- Card & component hover effects
- Input focus states
- List & grid stagger animations
- Accessibility support (prefers-reduced-motion)

**`_advanced-animations.scss`:**

- Scroll-triggered animations
- Staggered grid patterns
- State transitions (expand, modal, dropdown, panel)
- Loading patterns (segmented, spinner, pulse, progress)
- Keyframes (bounceEnter, slideOut)

**`_joyful-animations.scss`:**

- Playful entrance animations
- Celebration effects
- Fun micro-interactions
- Keeps brand personality

---

## ✅ Checklist for New Animations

Before adding new animations:

- [ ] Does it serve a purpose? (entrance, feedback, progress, delight)
- [ ] Does it respect `prefers-reduced-motion`?
- [ ] Does it use only `transform` and `opacity`?
- [ ] Is the duration appropriate? (200-500ms for most)
- [ ] Does it work on mobile devices?
- [ ] Is it tested with keyboard navigation?
- [ ] Does it have a fallback for no-animation?
- [ ] Is it documented in code comments?

---

## 🎯 Summary

The animation system is:

- ✅ **Performant**: GPU-accelerated, optimized for all devices
- ✅ **Accessible**: Respects user motion preferences
- ✅ **Purposeful**: Every animation has a reason
- ✅ **Consistent**: Same easing curves, timings across site
- ✅ **Maintainable**: Centralized, well-documented
- ✅ **Extensible**: Easy to add new animations

Use animations to enhance, not distract. Keep the user's preferences and device capabilities in mind.

---

**Last Updated:** January 2, 2026  
**Status:** Optimized & Production Ready
