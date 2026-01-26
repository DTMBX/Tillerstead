/**
 * Scroll Fix - Prevents nav-open from blocking scroll on desktop
 * Only blocks scroll on mobile when nav drawer is open
 */

(function() {
  'use strict';

  const MOBILE_BREAKPOINT = 1080;
  let navIsOpen = false;
  let savedScrollPosition = 0;

  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  function disableBodyScroll() {
    // ONLY disable scroll on mobile with nav drawer open
    if (!isMobile()) {
      return; // Never block scroll on desktop
    }

    // Save current scroll position
    savedScrollPosition = window.pageYOffset;

    // Apply scroll lock
    document.body.style.position = 'fixed';
    document.body.style.top = `-${savedScrollPosition}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  function enableBodyScroll() {
    // Remove scroll lock
    const wasFixed = document.body.style.position === 'fixed';
    
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';

    // Restore scroll position if it was saved
    if (wasFixed && savedScrollPosition) {
      window.scrollTo(0, savedScrollPosition);
      savedScrollPosition = 0;
    }
  }

  // Monitor nav state changes via body class
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const hasNavOpen = document.body.classList.contains('nav-open');
        
        if (hasNavOpen !== navIsOpen) {
          navIsOpen = hasNavOpen;
          
          if (navIsOpen) {
            disableBodyScroll();
          } else {
            enableBodyScroll();
          }
        }
      }
    });
  });

  // Start observing
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });

  // Handle window resize - close mobile nav if resized to desktop
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // If we're on desktop and nav is open, close it
      if (!isMobile() && navIsOpen) {
        document.body.classList.remove('nav-open');
        enableBodyScroll();
        
        // Close mobile nav drawer
        const mobileNav = document.getElementById('mobile-nav-drawer');
        if (mobileNav) {
          mobileNav.setAttribute('aria-hidden', 'true');
        }
      }
    }, 150);
  }, { passive: true });

  // Expose global API
  window.tsScrollFix = {
    enable: enableBodyScroll,
    disable: disableBodyScroll,
    isEnabled: () => !navIsOpen || !isMobile()
  };

})();
