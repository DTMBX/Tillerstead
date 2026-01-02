# 🎉 Joyful Animations - Quick Start Implementation Guide

**Ready to use immediately after CSS compilation.**

---

## 🚀 Fast Implementation Examples

### 1. Add Progress Bar to Form Submission

```html
<!-- In your form template -->
<form id="contactForm" class="contact-form">
  <!-- Progress indicator -->
  <div class="progress-labeled" style="margin-bottom: 2rem;">
    <div class="progress-labeled-bar">
      <div class="progress-bar" style="flex: 1;">
        <div class="progress-fill" id="formProgress" style="width: 0%;"></div>
      </div>
      <span class="progress-labeled-value" id="formPercent">0%</span>
    </div>
  </div>

  <!-- Your existing form fields -->
  <input type="text" placeholder="Name" class="form-field" />
  <input type="email" placeholder="Email" class="form-field" />
  <textarea placeholder="Message" class="form-field"></textarea>

  <!-- Success message (hidden initially) -->
  <div id="formSuccess" style="display: none;">
    <div class="success-check"></div>
    <p>Thank you! We'll be in touch soon.</p>
  </div>

  <!-- Submit button with joy animation -->
  <button type="submit" class="btn btn-lg btn-primary btn-joy">
    Send Message
  </button>
</form>

<script>
  const form = document.getElementById("contactForm");
  const fields = form.querySelectorAll(".form-field");
  const progress = document.getElementById("formProgress");
  const percent = document.getElementById("formPercent");

  // Update progress as user fills form
  fields.forEach((field) => {
    field.addEventListener("input", () => {
      let filled = 0;
      fields.forEach((f) => {
        if (f.value.trim()) filled++;
      });
      const p = Math.round((filled / fields.length) * 100);
      progress.style.width = p + "%";
      percent.textContent = p + "%";
    });
  });

  // Handle submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading spinner
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    button.innerHTML = '<div class="spinner-joy"></div>';
    button.disabled = true;

    // Submit form (your logic here)
    try {
      // await fetch('/api/contact', { ... })

      // Show success
      setTimeout(() => {
        form.style.display = "none";
        document.getElementById("formSuccess").style.display = "block";
      }, 800);
    } catch (err) {
      button.textContent = originalText;
      button.disabled = false;
    }
  });
</script>
```

### 2. Multi-Step Form with Progress Indicator

```html
<section class="form-steps">
  <!-- Segmented progress -->
  <div class="progress-segmented" style="margin-bottom: 2rem;">
    <div class="progress-segment completed"></div>
    <div class="progress-segment completed"></div>
    <div class="progress-segment active"></div>
    <div class="progress-segment pending"></div>
  </div>

  <!-- Step content with entrance animation -->
  <div class="bounce-enter" id="step3">
    <h2>Step 3: Project Details</h2>
    <form>
      <!-- Your fields here -->
    </form>
    <div class="btn-group btn-group-between">
      <button class="btn btn-secondary jump-hover">← Back</button>
      <button class="btn btn-primary btn-joy">Next →</button>
    </div>
  </div>
</section>

<script>
  // Update progress as steps complete
  function completeStep(stepNumber) {
    const segments = document.querySelectorAll(".progress-segment");
    segments[stepNumber - 1].classList.add("completed");
    if (stepNumber < segments.length) {
      segments[stepNumber].classList.add("active");
    }
  }
</script>
```

### 3. File Upload with Progress

```html
<div class="upload-container">
  <div id="uploadPrompt" class="upload-zone bounce-enter">
    <svg class="upload-icon" width="48" height="48" viewBox="0 0 48 48">
      <path
        d="M24 4v20M14 20l10-10 10 10"
        stroke="currentColor"
        fill="none"
        stroke-width="2"
      />
      <path d="M8 38h32" stroke="currentColor" stroke-width="2" />
    </svg>
    <p>Drag files here or click to upload</p>
    <input type="file" id="fileInput" hidden />
  </div>

  <!-- During upload -->
  <div id="uploadProgress" style="display: none;">
    <div class="progress-labeled">
      <div class="progress-labeled-bar">
        <div class="progress-bar" style="flex: 1;">
          <div
            class="progress-fill shimmer"
            id="uploadBar"
            style="width: 0%;"
          ></div>
        </div>
        <span class="progress-labeled-value" id="uploadPercent">0%</span>
      </div>
    </div>
    <p id="fileName"></p>
  </div>

  <!-- After upload -->
  <div id="uploadSuccess" style="display: none;">
    <div class="success-check"></div>
    <p>File uploaded successfully!</p>
  </div>
</div>

<script>
  document.getElementById("uploadPrompt").addEventListener("click", () => {
    document.getElementById("fileInput").click();
  });

  document.getElementById("fileInput").addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    document.getElementById("uploadPrompt").style.display = "none";
    document.getElementById("uploadProgress").style.display = "block";
    document.getElementById("fileName").textContent = file.name;

    // Simulate upload with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress > 100) progress = 100;

      document.getElementById("uploadBar").style.width = progress + "%";
      document.getElementById("uploadPercent").textContent =
        Math.round(progress) + "%";

      if (progress === 100) {
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

### 4. Service Cards with Staggered Entrance

```html
<section class="services-section">
  <h2>Our Services</h2>

  <!-- Cards with staggered bounce entrance -->
  <div class="grid-3col">
    <article class="card service-card bounce-enter bounce-enter-delay-1">
      <h3>Bathroom Remodeling</h3>
      <p>TCNA-compliant waterproofing and tile installation.</p>
      <button class="btn btn-secondary jump-hover">Learn More</button>
    </article>

    <article class="card service-card bounce-enter bounce-enter-delay-2">
      <h3>Kitchen Backsplash</h3>
      <p>Custom design with professional installation.</p>
      <button class="btn btn-secondary jump-hover">Learn More</button>
    </article>

    <article class="card service-card bounce-enter bounce-enter-delay-3">
      <h3>Shower Enclosures</h3>
      <p>Waterproof, leak-tested installations.</p>
      <button class="btn btn-secondary jump-hover">Learn More</button>
    </article>
  </div>
</section>
```

### 5. Hero CTA with Pulse Animation

```html
<section class="hero-section">
  <div class="hero-content">
    <h1>Tile Work That Lasts</h1>
    <p>TCNA-compliant installations, tested and documented.</p>

    <!-- Primary CTA with heartbeat pulse -->
    <button class="btn btn-xl btn-primary cta-primary-joy">
      Get Your Free Estimate
    </button>
  </div>
</section>

<style>
  /* Optional: Add background decoration */
  .hero-section {
    background: linear-gradient(135deg, #f9f7f4 0%, #eefbf5 100%);
    padding: 4rem 2rem;
    border-radius: 2.75rem;
  }
</style>
```

### 6. Loading States in Components

```html
<!-- During async operation -->
<div class="data-container">
  <!-- Show this while loading -->
  <div class="loading-state" id="loadingState">
    <div class="dots-loader">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <p>Loading your projects...</p>
  </div>

  <!-- Show this after loading -->
  <div class="content-state" id="contentState" style="display: none;">
    <!-- Your content here -->
  </div>
</div>

<script>
  async function loadProjects() {
    try {
      // Simulate API call
      const response = await fetch("/api/projects");
      const data = await response.json();

      // Hide loader, show content
      document.getElementById("loadingState").style.display = "none";
      document.getElementById("contentState").style.display = "block";

      // Render projects with stagger animation
      const projectsHTML = data
        .map(
          (project, i) => `
        <div class="project-card bounce-enter bounce-enter-delay-${Math.min(i + 1, 5)}">
          <h3>${project.name}</h3>
          <p>${project.description}</p>
        </div>
      `,
        )
        .join("");

      document.getElementById("contentState").innerHTML = projectsHTML;
    } catch (err) {
      console.error("Failed to load projects:", err);
    }
  }

  loadProjects();
</script>
```

---

## 🎯 Common Patterns

### Pattern 1: Form Submission Flow

```
1. User starts filling form → progress bar updates
2. User clicks submit → button shows spinner
3. Request processing → shimmer progress bar
4. Success → success-check animation, thank you message
```

### Pattern 2: Multi-Step Process

```
1. Step 1 → bounce-enter animation, complete button
2. Complete step 1 → progress segment fills
3. Step 2 → new content bounce-enter, active segment highlighted
4. Repeat...
```

### Pattern 3: Page Load

```
1. Page loads → main content bounce-enter
2. Services grid → staggered card entrances
3. Hero CTA → starts with heartbeat pulse
4. User scrolled sections → fade-in animations
```

---

## 📊 CSS Classes Quick Reference

### Progress Bars

- `.progress-bar` — Container
- `.progress-fill` — Fill bar
- `.progress-fill.shimmer` — Add shimmer effect
- `.progress-success` — Success state
- `.progress-labeled` — With label
- `.progress-segmented` — Multi-step

### Entrance Animations

- `.bounce-enter` — Bounce entrance
- `.bounce-enter-delay-1` through `.bounce-enter-delay-5` — Stagger delays

### Button Animations

- `.btn-joy` — Bounce on hover + ripple on click
- `.cta-primary-joy` — Heartbeat pulse
- `.jump-hover` — Cute jump animation
- `.wiggle` — Attention wiggle
- `.scale-on-tap` — Scale feedback

### Feedback

- `.success-check` — Success checkmark
- `.spinner-joy` — Spinning loader
- `.dots-loader` — Bouncing dots

### Utilities

- `.cta-pulse` — Heartbeat animation
- `.cta-pulse-gentle` — Slower heartbeat
- `.animate-none` — Disable animations
- `.transition-none` — Disable transitions

---

## 🎨 Customization

### Change Progress Bar Color

```scss
.progress-bar {
  --pg-color: var(--color-accent); /* Use red instead of teal */
}
```

### Change Animation Duration

```scss
.progress-bar {
  --pg-duration: 0.3s; /* Faster fill animation */
}
```

### Adjust Button Joy Animation

```scss
.btn-joy:hover:not(:disabled) {
  animation: jumpJoy 0.4s ease-out; /* Faster jump */
}
```

---

## ♿ Accessibility Checklist

- [x] All animations respect `prefers-reduced-motion`
- [x] Focus states remain visible
- [x] Color contrast meets WCAG AAA
- [x] No animations block user interaction
- [x] Loading states clearly visible
- [x] Success states confirmed with visual + text

---

## 📱 Mobile Considerations

- Animations automatically disable on screens < 640px
- Staggered entrances become instant (performance)
- Shimmer effects removed (battery optimization)
- All button interactions remain functional

---

## 🧪 Testing Your Animations

1. **Visual Testing:**
   - Open `joyful-animations-demo.html`
   - Test each component
   - Verify timing feels right

2. **Performance Testing:**
   - DevTools Performance tab
   - Target 60 FPS minimum
   - Profile on real mobile device

3. **Accessibility Testing:**
   - Enable `prefers-reduced-motion` in DevTools
   - Verify all animations disable
   - Test with keyboard navigation

4. **Cross-Browser Testing:**
   - Chrome, Firefox, Safari, Edge
   - Mobile browsers (iOS Safari, Chrome Android)
   - Verify smooth on all platforms

---

## 🚫 Don't Do This

```html
<!-- ❌ Too many animations at once -->
<div class="bounce-enter cta-pulse jump-hover animate-float">Too much!</div>

<!-- ❌ Ignoring prefers-reduced-motion -->
.animation { animation: spin 1s infinite; } /* No @media rule */

<!-- ❌ Long-running animations on page load -->
<div class="infinite-spinner"></div>
<!-- Spinning forever = battery drain -->

<!-- ❌ Animations on critical UI paths -->
<form>
  <input class="animate-wiggle" />
  <!-- User can't focus while animating -->
</form>
```

---

## ✅ Do This Instead

```html
<!-- ✅ One animation per element -->
<button class="btn btn-primary btn-joy">Submit</button>

<!-- ✅ Respect motion preferences -->
@media (prefers-reduced-motion: reduce) { /* Already included! */ }

<!-- ✅ Loading spinners only during async -->
<div id="loader" class="spinner-joy" style="display: none;"></div>

<!-- ✅ Keep UI interactive -->
<form>
  <input type="text" />
  <!-- Focuses normally -->
  <button class="btn-joy" type="submit">Submit</button>
  <!-- Joy on hover -->
</form>
```

---

## 📞 Troubleshooting

**Q: Animations not working**

- A: Make sure `assets/css/main.css` is compiled with the latest SCSS
- Run: `npm run build:css`

**Q: Animations feel jittery**

- A: Check DevTools Performance tab for frame drops
- Disable other animations, profile CPU usage
- Test on different device

**Q: Prefers-reduced-motion not working**

- A: Clear browser cache and reload
- The `@media` rule is automatically included in the SCSS

**Q: Staggered delays not working**

- A: Make sure you have the `.bounce-enter-delay-{n}` class
- Example: `<div class="bounce-enter bounce-enter-delay-2">`

---

## 📚 Full Documentation

For comprehensive details, see:

- `JOYFUL_ANIMATIONS_GUIDE.md` — Complete design system documentation
- `_sass/30-components/_joyful-animations.scss` — Source code with comments
- `joyful-animations-demo.html` — Live examples

---

**Ready to use. Happy animating! 🎉**
