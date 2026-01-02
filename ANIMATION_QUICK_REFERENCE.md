# Animation Quick Reference

## 🎬 Entrance Animations

Apply to any element for entrance effect on page load:

```html
<div class="animate-fade-in">Fades in</div>
<div class="animate-slide-in-up">Slides up, fades in</div>
<div class="animate-slide-in-down">Slides down, fades in</div>
<div class="animate-slide-in-left">Slides left, fades in</div>
<div class="animate-slide-in-right">Slides right, fades in</div>
<div class="animate-scale-in">Scales in, fades in</div>
<div class="animate-bounce-in">Bounces in (playful)</div>
```

**Duration**: 300ms  
**Easing**: cubic-bezier(0, 0, 0.2, 1) (out)

---

## 🔄 Loop Animations

Continuous animations:

```html
<div class="animate-float">Floating element</div>
<div class="animate-pulse">Pulsing element</div>
<div class="animate-glow">Glowing element</div>
```

**Durations**: 2-3 seconds  
**Loop**: infinite

---

## 🎯 Transition Classes

Use on interactive elements:

```html
<button class="transition-hover">Hover effect</button>
<a class="transition-color">Color transition</a>
<div class="transition-transform">Transform transition</div>
<div class="transition-shadow">Shadow transition</div>
<div class="transition-elevation">Lift on hover</div>
```

**Duration**: 200-300ms  
**Auto-applied**: Cards, buttons, inputs

---

## 📊 Stagger Animations

Grid and list animations:

```html
<!-- Grid stagger -->
<div class="grid-3col grid-animate">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<!-- List stagger -->
<ul class="list-animate">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>

<!-- Custom stagger parent -->
<div class="animate-stagger">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**Base delay**: 30-75ms per item  
**Max items**: 12 (with built-in delays)

---

## 🔘 Button Animations (Auto)

Buttons automatically animate:

```html
<button class="btn btn--primary">Hover me</button>
```

**On hover**:

- Lift 1px
- Color glow appears
- Shadow increases

**On click**:

- Return to baseline
- Scale 0.98

---

## 📦 Card Animations (Auto)

Cards automatically animate:

```html
<div class="card">
  <img src="image.jpg" />
  <h3>Title</h3>
  <p>Description</p>
</div>
```

**On hover**:

- Lift 4px
- Shadow increases
- Image scales 1.05

---

## 📝 Input Animations (Auto)

Inputs automatically animate:

```html
<input type="text" placeholder="Focus me" />
<textarea placeholder="Or me"></textarea>
```

**On focus**:

- Border color changes
- Glow shadow appears

---

## 🌀 Scroll-Triggered Animations

Animate as user scrolls:

```html
<div data-scroll-animate="fade-in">Fade on scroll</div>
<div data-scroll-animate="fade-in-left">Slide left on scroll</div>
<div data-scroll-animate="fade-in-right">Slide right on scroll</div>
<div data-scroll-animate="scale-in">Scale on scroll</div>
```

**When**: Element enters viewport  
**Duration**: 300ms  
**Note**: Requires JavaScript to add `.in-view` class

---

## 🎨 Advanced Animations

### Staggered Grid

```html
<div data-stagger-animate>
  <div>Item 1</div>
  <div>Item 2</div>
  <!-- ... 12 items max ... -->
</div>
```

**Delays**: 0ms, 60ms, 120ms...

### Expandable Panel

```html
<div data-expand-toggle>Content that expands/collapses</div>
```

**Classes**: `.is-open` to expand

### Modal

```html
<div data-modal class="is-visible">Modal content (scales in)</div>
```

### Dropdown

```html
<div data-dropdown class="is-open">Dropdown content (slides down)</div>
```

### Side Panel

```html
<div data-slide-panel class="is-open">Side panel slides in from right</div>
```

---

## ⚡ Performance Helpers

```html
<!-- Force GPU acceleration -->
<div class="gpu-accelerate animate-float">Smooth animation on GPU</div>

<!-- Mark element as animating (careful with overuse) -->
<div class="will-animate">Uses will-change hint</div>

<!-- Optimized hover state -->
<div class="perf-optimized">Only transforms & opacity animate</div>
```

---

## ♿ Accessibility

### Automatic Respect for User Preferences

No code needed—automatically disabled for users who prefer reduced motion.

### Test Reduced Motion

**Chrome**: DevTools → Rendering → prefers-reduced-motion  
**Firefox**: about:config → ui.prefersReducedMotion = 1  
**macOS**: System Preferences → Accessibility → Display → Reduce motion

---

## 🚀 Common Patterns

### Page Hero

```html
<header>
  <h1 class="animate-slide-in-up">Title</h1>
  <p class="animate-slide-in-up">Subtitle</p>
  <button class="animate-slide-in-up">CTA</button>
</header>
```

Each element slides up with stagger effect.

### Feature Grid

```html
<div class="grid-3col grid-animate">
  <div class="card">Feature 1</div>
  <div class="card">Feature 2</div>
  <div class="card">Feature 3</div>
</div>
```

Cards cascade in as user loads page.

### Portfolio Section

```html
<section>
  <h2 class="animate-fade-in">Portfolio</h2>
  <div data-stagger-animate>
    <div class="card">Project 1</div>
    <div class="card">Project 2</div>
  </div>
</section>
```

Heading fades, projects stagger in.

### Call to Action

```html
<div class="animate-bounce-in">
  <h3>Ready to start?</h3>
  <button class="btn btn--primary">Let's go</button>
</div>
```

Playful bounce entrance for engagement.

---

## 🎯 Timing Cheat Sheet

| Effect  | Duration | Best For                   |
| ------- | -------- | -------------------------- |
| Instant | 150ms    | Feedback, focus            |
| Fast    | 200ms    | Hover, active states       |
| Normal  | 300ms    | Page transitions, entrance |
| Slow    | 500ms    | Sequential reveals         |
| Loop    | 1-3s     | Infinite patterns          |

---

## ❌ What NOT to Do

```html
<!-- DON'T: Animate layout properties -->
<div style="transition: width 300ms">Bad</div>

<!-- DON'T: Use transition: all -->
<div style="transition: all 300ms">Bad</div>

<!-- DON'T: Ignore reduced motion -->
<div class="animate-spin">Always animates</div>

<!-- DON'T: Animate too many things at once -->
<div class="animate-bounce-in animate-spin animate-pulse">Bad</div>

<!-- DON'T: Overly long animations -->
<div style="animation-duration: 2s">Slow</div>
```

---

## ✅ Best Practices

```html
<!-- DO: Use transform & opacity -->
<button style="transition: transform 200ms">Good</button>

<!-- DO: Specify each property -->
<div style="transition: color 300ms, background 300ms">Good</div>

<!-- DO: Respect user preferences (auto) -->
<!-- prefers-reduced-motion: reduce automatically disables -->

<!-- DO: Keep it purposeful -->
<div class="animate-slide-in-up">Entrance effect</div>

<!-- DO: Reasonable durations -->
<button style="transition: all 300ms">Standard</button>
```

---

## 📞 When to Animate

✅ **Entrance**: Welcome elements as page loads  
✅ **Feedback**: Show action was registered (button, input)  
✅ **Progress**: Show loading or transition  
✅ **Delight**: Celebrate user actions

❌ **Distraction**: Animations that don't add value  
❌ **Confusion**: Unclear what's animating  
❌ **Accessibility**: Ignoring motion preferences  
❌ **Performance**: Unnecessary simultaneous animations

---

## 🐛 Debugging Tips

**Animation not playing:**

```scss
/* Check if:
   - Element has correct class
   - CSS compiled successfully
   - will-change set correctly
   - prefers-reduced-motion not enabled
   - Element is visible
*/
```

**Animation looks janky:**

```scss
/* Check if:
   - Only transform/opacity animated
   - will-change is appropriate
   - No conflicting CSS
   - Mobile device has enough performance
*/
```

**Animation plays when disabled:**

```scss
/* Ensure prefers-reduced-motion media query catches it:
   @media (prefers-reduced-motion: reduce) {
     animation: none !important;
   }
*/
```

---

## 🎓 Learn More

Full guide: `ANIMATION_OPTIMIZATION_GUIDE.md`

Topics:

- Complete animation system reference
- Advanced patterns and use cases
- Performance optimization details
- Accessibility guidelines
- Comprehensive examples
- Troubleshooting guide

---

**Quick Start**: Use `.animate-*` classes for entrance, cards auto-animate on hover, buttons have built-in feedback.

**Key Principle**: Animations should enhance UX, not distract from it.
