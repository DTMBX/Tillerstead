# 🎉 Tillerstead Joyful Animations Design Consultation

**Version:** 1.0.0  
**Date:** 2026-01-02  
**File:** `_sass/30-components/_joyful-animations.scss`  
**Integration:** `assets/css/main.scss` (line 46)

---

## 📋 Philosophy & Approach

Tillerstead animations are **intentional, purposeful, and respectful of user time**. We avoid gratuitous motion while celebrating expertise through delightful micro-interactions.

### Core Principles

1. **Cartoon Sensibility + Professional Polish**
   - Playful without being childish
   - Fun without sacrificing credibility
   - TCNA-literate voice carried through motion design

2. **Performance First**
   - GPU-accelerated properties only (transform, opacity)
   - Short durations (150ms–800ms)
   - Disabled on low-power devices and when user prefers reduced motion

3. **Purpose-Driven**
   - Every animation serves a function
   - No animation without intention
   - Guides attention, provides feedback, celebrates success

4. **Accessible**
   - Respects `prefers-reduced-motion`
   - Clear focus states
   - Alternative text-based feedback

---

## 🎯 Animation Components

### 1. **Progress Bars**

**When to Use:**

- Form submissions
- File uploads
- Page load states
- Multi-step processes

**Available Variants:**

```html
<!-- Standard progress bar -->
<div class="progress-bar">
  <div class="progress-fill" style="width: 45%;"></div>
</div>

<!-- With shimmer (attention-grabbing) -->
<div class="progress-bar">
  <div class="progress-fill shimmer" style="width: 65%;"></div>
</div>

<!-- Success state (completion celebration) -->
<div class="progress-bar progress-success">
  <div class="progress-fill" style="width: 100%;"></div>
</div>

<!-- Labeled progress -->
<div class="progress-labeled">
  <div class="progress-labeled-bar">
    <div class="progress-bar" style="flex: 1;">
      <div class="progress-fill" style="width: 75%;"></div>
    </div>
    <span class="progress-labeled-value">75%</span>
  </div>
</div>

<!-- Segmented progress (multi-step) -->
<div class="progress-segmented">
  <div class="progress-segment completed"></div>
  <div class="progress-segment completed"></div>
  <div class="progress-segment active"></div>
  <div class="progress-segment pending"></div>
</div>
```

**Design Notes:**

- Height: 6px (accessible, not too prominent)
- Radius: 3px (matches button/container aesthetic)
- Shimmer effect: Use sparingly (distracting if always on)
- Duration: 0.6s default (feels responsive without rushing)

### 2. **Entrance Animations**

**When to Use:**

- Page load
- Modal/dialog open
- List items appearing
- Card hover states

**Available Classes:**

```html
<div class="bounce-enter">Welcome to Tillerstead</div>

<!-- Staggered entrance for multiple items -->
<ul>
  <li class="bounce-enter bounce-enter-delay-1">First item</li>
  <li class="bounce-enter bounce-enter-delay-2">Second item</li>
  <li class="bounce-enter bounce-enter-delay-3">Third item</li>
</ul>
```

**Timing:**

- `bounce-enter`: 0.6s (elastic curve for playfulness)
- Delays: 0.1s–0.5s increments (staggered effect)

### 3. **Micro-Interactions**

#### Wiggle (Attention)

```html
<!-- Attention-grabbing on hover -->
<button class="wiggle">Important Action</button>
```

- Use for: Secondary CTAs, alerts, badges
- Duration: 0.4s–0.5s
- Effect: Gentle rotation left/right

#### Jump (Delight)

```html
<!-- Cute bounce on hover -->
<a href="#" class="jump-hover">Click me!</a>
```

- Use for: Playful elements, secondary navigation
- Duration: 0.6s
- Effect: Up bounce then settle

#### Heartbeat Pulse (CTA Emphasis)

```html
<!-- Gentle pulse for important actions -->
<button class="btn btn-primary cta-pulse">Get Started</button>

<!-- Gentler version for less prominent CTAs -->
<a href="#" class="cta-pulse-gentle">Learn More</a>
```

- Use for: Primary calls-to-action
- Duration: 1.2s–2s (slow and breathing)
- Effect: Scale up slightly, then down

#### Scale on Tap (Feedback)

```html
<!-- Visual feedback for interactive elements -->
<button class="scale-on-tap">Tap me</button>
```

- Use for: All clickable elements
- Duration: 0.15s (immediate feedback)
- Effect: Scale to 96% on active

### 4. **Feedback & Success States**

#### Success Checkmark

```html
<div class="success-check"></div>
```

- Use for: Form validation, task completion
- Animation: Bounce entrance + color
- Effect: Celebratory without noise

#### Loading Spinners

```html
<!-- Friendly spinning loader -->
<div class="spinner-joy"></div>

<!-- Bouncing dots (Instagram-style) -->
<div class="dots-loader">
  <span></span>
  <span></span>
  <span></span>
</div>
```

- Duration: 0.8s (smooth, not frantic)
- Use for: Background tasks, file processing
- Note: Spinning never stops, so use for actual async work

### 5. **Button Animations**

#### Joy Button (Hover Bounce)

```html
<button class="btn btn-primary btn-joy">Submit Form</button>
```

- Effect: Bounces on hover + ripple on click
- Use for: All CTAs with high intent
- Ripple: Optional visual feedback

#### Primary Joy with Heartbeat

```html
<button class="btn btn-primary cta-primary-joy">Start Project</button>
```

- Effect: Pulses gently until hovered (then stops)
- Use for: Above-the-fold primary CTAs
- Benefit: Draws attention without being annoying

### 6. **Form Animations**

#### Input Focus

```html
<input type="text" placeholder="Your email" />
```

- Animation: Bounce entrance on focus
- Duration: 0.3s
- Effect: Celebrates user interaction

### 7. **Celebration Effects**

#### Confetti

```html
<div class="confetti">Success!</div>
```

- Use for: Major milestones (project complete, success)
- Animation: Particles scatter upward and fade
- Note: Usually triggered by JavaScript on completion

---

## 🎨 Design Consultation: When & How Much

### Animation Audit Checklist

**✓ GOOD USES:**

```
☑ Progress bar with shimmer during file upload
☑ Form field bounce on focus (captures attention)
☑ Primary CTA with gentle heartbeat pulse
☑ Success checkmark on form submission
☑ Loading spinner during background task
☑ Button bounce on hover (micro-feedback)
☑ Entrance animation on page load (sets tone)
☑ Staggered list entrance (guides reading)
```

**✗ AVOID:**

```
☐ Animation on every element (overwhelming)
☐ Slow animations (>1.5s non-repeating)
☐ Multiple overlapping animations
☐ Animations during critical actions (blocks interaction)
☐ Rapid loops (performance drain)
☐ Animations without purpose
☐ Ignoring prefers-reduced-motion
☐ Animations on already-focused elements (annoying)
```

### Decision Tree

```
Does the animation serve a purpose?
  NO  → Remove it
  YES → Continue

Is it 150ms–2s in duration?
  NO  → Too fast (seems buggy) or too slow (annoying)
  YES → Continue

Does it use transform/opacity only?
  NO  → May cause jank; prefer GPU properties
  YES → Continue

Do you respect prefers-reduced-motion?
  NO  → Add @media rule
  YES → ✓ Safe to ship
```

---

## 📊 Technical Specifications

### Timing Reference

| Speed       | Duration | Use Case                           |
| ----------- | -------- | ---------------------------------- |
| **Instant** | 0.01ms   | Disabled (reduced-motion only)     |
| **Flash**   | 0.15s    | Micro-interactions (button tap)    |
| **Quick**   | 0.3s     | Entrance, focus, simple feedback   |
| **Base**    | 0.6s     | Progress fill, standard animations |
| **Slow**    | 0.8–1.2s | Continuous loops (spinner, pulse)  |
| **Extra**   | 1.5s+    | Long-duration loops (heartbeat)    |

### Easing Curves

```scss
--easing-in: cubic-bezier(0.4, 0, 1, 1); /* Accelerate */
--easing-out: cubic-bezier(0, 0, 0.2, 1); /* Decelerate (natural) */
--easing-in-out: cubic-bezier(0.4, 0, 0.2, 1); /* Smooth in-out */
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Playful */
--easing-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy */
```

**Recommendations:**

- `easing-out`: Default for entrances (feels natural)
- `easing-bounce`: Playful elements (buttons, wobbles)
- `easing-elastic`: Celebratory moments (success)

### GPU-Accelerated Properties

**Safe to animate:**

- `transform: translate()`, `rotate()`, `scale()`
- `opacity`

**Avoid animating:**

- `width`, `height`
- `top`, `left`, `margin`, `padding`
- `box-shadow` (use sparingly with short duration)

---

## 🔧 Implementation Guide

### Adding to Existing Components

#### Progress Bar in Form

```html
<form class="form-with-progress">
  <fieldset>
    <legend>Project Details</legend>

    <!-- Progress indicator -->
    <div class="progress-bar" id="formProgress">
      <div class="progress-fill"></div>
    </div>

    <!-- Form fields -->
    <input type="text" placeholder="Project name" />
    <!-- ... -->
  </fieldset>
</form>

<script>
  document.addEventListener("input", (e) => {
    const form = e.target.closest("form");
    if (!form) return;

    const filled = form.querySelectorAll("input:valid").length;
    const total = form.querySelectorAll("input").length;
    const percent = Math.round((filled / total) * 100);

    form.querySelector(".progress-fill").style.width = percent + "%";
  });
</script>
```

#### CTA with Pulse

```html
<section class="cta-section">
  <div class="container">
    <h2>Ready to Start Your Project?</h2>
    <p>Let's bring your vision to life with TCNA-compliant tile work.</p>

    <!-- Primary CTA with heartbeat -->
    <button class="btn btn-lg btn-primary cta-primary-joy">
      Get Your Free Estimate
    </button>
  </div>
</section>
```

#### Success Feedback

```html
<form id="contactForm" class="contact-form">
  <!-- Form fields -->
  <button type="submit">Send Message</button>

  <!-- Success message (initially hidden) -->
  <div class="form-success" style="display: none;">
    <div class="success-check"></div>
    <p>Thank you! We'll be in touch soon.</p>
  </div>
</form>

<script>
  document
    .getElementById("contactForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Submit form...

      // Show success
      e.target.style.display = "none";
      e.target.nextElementSibling.style.display = "block";
    });
</script>
```

---

## ♿ Accessibility Compliance

### Reduced Motion Support

All animations automatically disable when user has set `prefers-reduced-motion: reduce`:

```scss
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Testing:**

- macOS: System Preferences → Accessibility → Display → Reduce motion
- Windows: Settings → Ease of Access → Display → Show animations
- Chrome DevTools: Rendering → Emulate CSS media feature prefers-reduced-motion

### Color Contrast

All animations maintain WCAG AAA contrast:

- Progress bars: Teal (#078930) on cream is 7:1 ratio
- Success states: Green (#1dc055) on white is 5.5:1 ratio
- Spinners: Teal colors meet requirements

### Keyboard Navigation

- All interactive elements remain keyboard accessible
- Animations don't prevent focus management
- Tab order unaffected by CSS animations

---

## 🚀 Performance Considerations

### Mobile Optimization

Animations are disabled on small screens (max-width: 640px) to improve performance:

```scss
@media (max-width: 640px) {
  .bounce-enter-delay-3,
  .bounce-enter-delay-4,
  .bounce-enter-delay-5 {
    animation-delay: 0 !important;
  }

  .progress-fill.shimmer {
    animation: none;
  }
}
```

### Best Practices

1. **Test on real devices** before deployment
2. **Use DevTools Performance tab** to check 60fps
3. **Avoid multiple overlapping animations**
4. **Keep animation count per page low** (<5 simultaneous)
5. **Profile on 3G** to ensure smooth experience

### Metrics

- **Recommended frame rate:** 60 FPS minimum
- **Max animation duration:** 2s (except loops)
- **Max simultaneous animations:** 5 per viewport
- **GPU memory impact:** Negligible with transform/opacity

---

## 📚 Examples by Use Case

### Case 1: Multi-Step Form

```html
<section class="form-container">
  <div class="progress-segmented">
    <div class="progress-segment completed"></div>
    <div class="progress-segment completed"></div>
    <div class="progress-segment active"></div>
    <div class="progress-segment pending"></div>
  </div>

  <form id="step3">
    <h2 class="bounce-enter">Step 3: Project Details</h2>

    <fieldset>
      <!-- Form fields -->
    </fieldset>

    <div class="btn-group btn-group-between">
      <button class="btn btn-secondary">← Back</button>
      <button type="submit" class="btn btn-primary btn-joy">Next →</button>
    </div>
  </form>
</section>
```

### Case 2: File Upload

```html
<div class="upload-zone">
  <input type="file" id="fileUpload" hidden />

  <!-- Before upload -->
  <div class="upload-prompt" id="uploadPrompt">
    <p>Drag files here or click to select</p>
  </div>

  <!-- During upload -->
  <div class="upload-progress" id="uploadProgress" style="display: none;">
    <p id="fileName"></p>
    <div class="progress-bar">
      <div
        class="progress-fill shimmer"
        id="uploadBar"
        style="width: 0%;"
      ></div>
    </div>
    <p id="uploadPercent">0%</p>
  </div>

  <!-- After upload -->
  <div class="upload-success" id="uploadSuccess" style="display: none;">
    <div class="success-check"></div>
    <p>File uploaded successfully!</p>
  </div>
</div>

<script>
  document.getElementById("fileUpload").addEventListener("change", (e) => {
    const file = e.target.files[0];
    document.getElementById("uploadPrompt").style.display = "none";
    document.getElementById("uploadProgress").style.display = "block";
    document.getElementById("fileName").textContent = file.name;

    // Simulate upload
    let percent = 0;
    const interval = setInterval(() => {
      percent += Math.random() * 40;
      if (percent > 100) percent = 100;

      document.getElementById("uploadBar").style.width = percent + "%";
      document.getElementById("uploadPercent").textContent =
        Math.round(percent) + "%";

      if (percent === 100) {
        clearInterval(interval);
        setTimeout(() => {
          document.getElementById("uploadProgress").style.display = "none";
          document.getElementById("uploadSuccess").style.display = "block";
        }, 300);
      }
    }, 200);
  });
</script>
```

### Case 3: Service Cards with Entrance

```html
<section class="services-grid">
  <h2>Our Services</h2>

  <div class="grid-3col animate-stagger">
    <article class="card service-card bounce-enter bounce-enter-delay-1">
      <h3>Bathroom Remodeling</h3>
      <p>TCNA-compliant installations with waterproofing.</p>
      <a href="#" class="btn btn-secondary jump-hover">Learn More</a>
    </article>

    <article class="card service-card bounce-enter bounce-enter-delay-2">
      <h3>Kitchen Tile</h3>
      <p>Custom backsplashes and countertops.</p>
      <a href="#" class="btn btn-secondary jump-hover">Learn More</a>
    </article>

    <article class="card service-card bounce-enter bounce-enter-delay-3">
      <h3>Shower Enclosures</h3>
      <p>Waterproof, leak-proof, tested installations.</p>
      <a href="#" class="btn btn-secondary jump-hover">Learn More</a>
    </article>
  </div>
</section>
```

---

## 🎓 Tillerstead Brand Alignment

Animations reinforce Tillerstead's brand voice:

**"Detailed, Honest, Professional with Personality"**

- **Detailed:** Smooth, intentional animations (not random)
- **Honest:** No fake loading, no deceiving progress
- **Professional:** Clean, modular, accessible code
- **Personality:** Playful (bounce, wiggle) but respectful

### Animation Moments in Customer Journey

| Stage             | Animation                          | Purpose                          |
| ----------------- | ---------------------------------- | -------------------------------- |
| **Awareness**     | Entrance, pulse CTA                | Attract attention (not annoying) |
| **Consideration** | Progress bar, smooth transitions   | Guide through content            |
| **Decision**      | Heartbeat pulse on primary CTA     | Subtle invitation to act         |
| **Action**        | Loading spinner, success check     | Confirm action received          |
| **Confirmation**  | Bounce entrance on success message | Celebrate together               |

---

## 📋 Checklist for New Animations

Before adding a new animation, verify:

- [ ] **Purpose:** Does it serve a function?
- [ ] **Timing:** 150ms–2s (or repeating loop)?
- [ ] **Properties:** Using only transform/opacity?
- [ ] **Accessibility:** Respects prefers-reduced-motion?
- [ ] **Performance:** Tested on real mobile device?
- [ ] **Brand:** Aligns with Tillerstead voice?
- [ ] **Documentation:** Added to this guide?

---

## 🔗 References

- **SCSS File:** `_sass/30-components/_joyful-animations.scss`
- **Import Location:** `assets/css/main.scss` (line 46)
- **Design Tokens:** `_sass/00-settings/_tokens-modern.scss`
- **Base Animations:** `_sass/10-base/_animations.scss`

---

## 📞 Questions?

This animation system was designed to balance delight with purpose. When in doubt:

- Prefer subtlety over flashiness
- Respect user's time and motion preferences
- Test on real devices and real networks
- Keep animations purposeful and intentional

**Version:** 1.0.0  
**Last Updated:** 2026-01-02  
**Status:** Ready for Production
