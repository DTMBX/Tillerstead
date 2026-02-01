/**
 * Mobile Scroll Guardian
 * Ensures scroll is never accidentally blocked by nav state
 * 2026-01-31
 */

(function() {
  'use strict';
  
  // Check if on mobile
  function isMobile() {
    return window.innerWidth <= 768;
  }
  
  // Ensure body is scrollable when nav is closed
  function ensureScrollable() {
    const body = document.body;
    const hasNavOpen = body.classList.contains('nav-open') || body.classList.contains('menu-open');
    
    // Only enforce scroll on mobile when nav is closed
    if (isMobile() && !hasNavOpen) {
      // Remove any scroll locks
      if (body.style.overflow === 'hidden' || body.style.overflowY === 'hidden') {
        body.style.overflow = '';
        body.style.overflowY = '';
        body.style.position = '';
        body.style.height = '';
        body.style.width = '';
      }
      
      // Ensure data attribute reflects scroll state
      body.dataset.scrollBlocked = 'false';
    } else if (hasNavOpen) {
      body.dataset.scrollBlocked = 'true';
    }
  }
  
  // Ensure nav overlay doesn't block interaction when closed
  function fixNavOverlay() {
    const overlays = document.querySelectorAll('.nav-overlay, .ts-drawer__overlay');
    overlays.forEach(overlay => {
      const isOpen = overlay.classList.contains('is-open') || 
                     (overlay.getAttribute('aria-hidden') !== 'true');
      
      if (!isOpen) {
        overlay.style.pointerEvents = 'none';
        overlay.style.visibility = 'hidden';
      }
    });
  }
  
  // Ensure nav drawer doesn't block interaction when closed
  function fixNavDrawer() {
    const drawers = document.querySelectorAll(
      '.ts-drawer[aria-hidden="true"], ' +
      '#ts-mobile-nav[aria-hidden="true"], ' +
      '#mobile-nav-drawer[aria-hidden="true"]'
    );
    
    drawers.forEach(drawer => {
      drawer.style.pointerEvents = 'none';
    });
  }
  
  // Run fixes
  function runFixes() {
    ensureScrollable();
    fixNavOverlay();
    fixNavDrawer();
  }
  
  // Watch for nav state changes
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && 
          (mutation.attributeName === 'class' || mutation.attributeName === 'aria-hidden')) {
        runFixes();
      }
    }
  });
  
  // Start observing body for class changes
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
  
  // Observe nav elements for aria-hidden changes
  document.addEventListener('DOMContentLoaded', function() {
    const navElements = document.querySelectorAll(
      '.ts-drawer, #ts-mobile-nav, #mobile-nav-drawer, .nav-overlay, .ts-drawer__overlay'
    );
    
    navElements.forEach(el => {
      observer.observe(el, {
        attributes: true,
        attributeFilter: ['class', 'aria-hidden']
      });
    });
    
    // Run initial fix
    runFixes();
  });
  
  // Run on resize (orientation change)
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(runFixes, 150);
  }, { passive: true });
  
  // Emergency restore on visibility change (tab switch)
  document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
      setTimeout(runFixes, 100);
    }
  });
  
  // Initial run
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFixes);
  } else {
    runFixes();
  }
  
  // Expose global restore function for debugging
  window.restoreScroll = function() {
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    document.body.style.position = '';
    document.body.style.height = '';
    document.body.classList.remove('nav-open', 'menu-open');
    runFixes();
  };
})();
