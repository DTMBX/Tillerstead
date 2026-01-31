/**
 * Animation Utilities
 * Premium animation library using GSAP, Lottie, and AOS
 * Note: Requires GSAP, Lottie, and AOS libraries to be loaded via CDN or bundler
 */

// Note: Import these libraries via CDN in your HTML or via bundler
// For CDN usage, these will be available as global variables:
// - gsap (from GSAP CDN)
// - lottie (from Lottie CDN)
// - AOS (from AOS CDN)

// Initialize AOS (Animate On Scroll)
export function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 120,
    });
  }
}

// GSAP Fade In Animation
export function fadeIn(element, options = {}) {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Animation skipped.');
    return null;
  }
  return gsap.from(element, {
    opacity: 0,
    duration: options.duration || 1,
    delay: options.delay || 0,
    ease: options.ease || 'power2.out',
    ...options,
  });
}

// GSAP Slide Up Animation
export function slideUp(element, options = {}) {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not loaded. Animation skipped.');
    return null;
  }
  return gsap.from(element, {
    y: options.distance || 50,
    opacity: 0,
    duration: options.duration || 0.8,
    ease: options.ease || 'power3.out',
    ...options,
  });
}

// GSAP Stagger Animation
export function staggerIn(elements, options = {}) {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    duration: options.duration || 0.6,
    stagger: options.stagger || 0.1,
    ease: options.ease || 'power2.out',
    scrollTrigger: options.scrollTrigger,
    ...options,
  });
}

// Scroll-Triggered Animations
export function animateOnScroll(element, animation = {}) {
  return gsap.from(element, {
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      ...animation.scrollTrigger,
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power2.out',
    ...animation,
  });
}

// Parallax Effect
export function parallax(element, options = {}) {
  return gsap.to(element, {
    y: options.distance || 100,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: options.scrub || 1,
      ...options.scrollTrigger,
    },
  });
}

// Lottie Animation Loader
export function loadLottie(container, animationPath, options = {}) {
  return lottie.loadAnimation({
    container,
    renderer: 'svg',
    loop: options.loop !== undefined ? options.loop : true,
    autoplay: options.autoplay !== undefined ? options.autoplay : true,
    path: animationPath,
    ...options,
  });
}

// Counter Animation
export function animateCounter(element, endValue, options = {}) {
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: endValue,
    duration: options.duration || 2,
    ease: options.ease || 'power1.inOut',
    onUpdate: () => {
      element.textContent = Math.round(obj.value).toLocaleString();
    },
    ...options,
  });
}

// Hover Scale Effect
export function scaleOnHover(element, scale = 1.05) {
  element.addEventListener('mouseenter', () => {
    gsap.to(element, {
      scale,
      duration: 0.3,
      ease: 'power2.out',
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
  });
}

// Smooth Scroll to Element
export function scrollToElement(target, options = {}) {
  gsap.to(window, {
    scrollTo: {
      y: target,
      offsetY: options.offset || 0,
    },
    duration: options.duration || 1,
    ease: options.ease || 'power2.inOut',
  });
}

// Page Transition
export function pageTransition(options = {}) {
  const tl = gsap.timeline();
  
  tl.to(options.element || 'body', {
    opacity: 0,
    duration: options.duration || 0.3,
    ease: 'power2.inOut',
  });
  
  return tl;
}

// Initialize all animations
export function initAnimations() {
  // Initialize AOS
  initAOS();

  // Auto-animate elements with data attributes
  document.querySelectorAll('[data-animate="fade-in"]').forEach((el) => {
    fadeIn(el);
  });

  document.querySelectorAll('[data-animate="slide-up"]').forEach((el) => {
    slideUp(el);
  });

  document.querySelectorAll('[data-animate="stagger"]').forEach((el) => {
    const children = el.children;
    staggerIn(children);
  });

  document.querySelectorAll('[data-animate="scroll"]').forEach((el) => {
    animateOnScroll(el);
  });

  document.querySelectorAll('[data-animate="parallax"]').forEach((el) => {
    parallax(el);
  });

  document.querySelectorAll('[data-hover="scale"]').forEach((el) => {
    scaleOnHover(el);
  });

  console.log('✨ Premium animations initialized');
}

export default {
  initAOS,
  fadeIn,
  slideUp,
  staggerIn,
  animateOnScroll,
  parallax,
  loadLottie,
  animateCounter,
  scaleOnHover,
  scrollToElement,
  pageTransition,
  initAnimations,
};
