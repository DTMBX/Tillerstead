/**
 * NATIVE SCROLL RESTORATION - Master Controller
 * 
 * Problem: Multiple scripts (nav.js, scroll-fix.js, lead-magnet, modals) 
 * all try to manage body scroll, causing conflicts.
 * 
 * Solution: Central scroll lock manager with reference counting
 * - Multiple components can request scroll lock
 * - Scroll only unlocks when ALL components release it
 * - Native scroll is the default state
 */

(function() {
  'use strict';

  // Scroll lock reference counter
  let scrollLockCount = 0;
  let savedScrollPosition = 0;
  const MOBILE_BREAKPOINT = 1080;

  function isMobile() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  /**
   * Lock scroll (increments counter)
   * MOBILE FIX: Only lock on desktop, never on mobile
   * @param {string} source - Name of component requesting lock
   */
  function lockScroll(source = 'unknown') {
    // CRITICAL: Don't lock scroll on mobile - causes content to disappear
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      console.log(`[Scroll Lock] Lock request from ${source} IGNORED on mobile`);
      return;
    }
    
    scrollLockCount++;
    
    if (scrollLockCount === 1) {
      // First lock - save position and apply
      savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollPosition}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      console.log(`[Scroll Lock] Locked by ${source} (count: ${scrollLockCount})`);
    } else {
      console.log(`[Scroll Lock] Already locked, count increased: ${scrollLockCount} (by ${source})`);
    }
  }

  /**
   * Release scroll lock (decrements counter)
   * @param {string} source - Name of component releasing lock
   */
  function unlockScroll(source = 'unknown') {
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    
    if (scrollLockCount === 0) {
      // Last lock released - restore scroll
      const wasFixed = document.body.style.position === 'fixed';
      
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      if (wasFixed && savedScrollPosition) {
        // Restore scroll position smoothly
        window.scrollTo({
          top: savedScrollPosition,
          behavior: 'instant'
        });
        savedScrollPosition = 0;
      }
      
      console.log(`[Scroll Lock] Unlocked by ${source} (count: ${scrollLockCount})`);
    } else {
      console.log(`[Scroll Lock] Still locked, count decreased: ${scrollLockCount} (by ${source})`);
    }
  }

  /**
   * Force unlock (emergency reset)
   */
  function forceUnlock() {
    scrollLockCount = 0;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    console.warn('[Scroll Lock] Force unlocked!');
  }

  /**
   * Check if scroll is currently locked
   */
  function isLocked() {
    return scrollLockCount > 0;
  }

  // Global API
  window.ScrollLockManager = {
    lock: lockScroll,
    unlock: unlockScroll,
    forceUnlock: forceUnlock,
    isLocked: isLocked,
    getCount: () => scrollLockCount
  };

  // Ensure scroll is unlocked on page load
  document.addEventListener('DOMContentLoaded', function() {
    // EMERGENCY: Force unlock everything
    scrollLockCount = 0;
    savedScrollPosition = 0;
    
    // Force enable native scrolling
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = '';
    document.body.style.overflow = '';
    document.body.style.overflowY = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.height = 'auto';
    
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    console.log('[Scroll Lock] EMERGENCY unlock on DOM ready - count reset to 0');
  });
  
  // SECOND CHECK: After everything loads
  window.addEventListener('load', function() {
    setTimeout(function() {
      if (scrollLockCount > 0 || document.body.style.overflow === 'hidden' || document.body.style.position === 'fixed') {
        console.warn('[Scroll Lock] CRITICAL: Detected stuck scroll lock after page load, forcing unlock!');
        forceUnlock();
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
      }
      console.log('[Scroll Lock] Page load verification complete - scroll enabled');
    }, 500);
  });

  // Monitor for rogue scripts that set overflow:hidden directly
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const target = mutation.target;
        
        // If body/html overflow is set to hidden but we have no locks, restore it
        if ((target === document.body || target === document.documentElement) && scrollLockCount === 0) {
          const overflow = target.style.overflow;
          const overflowY = target.style.overflowY;
          
          if (overflow === 'hidden' || overflowY === 'hidden') {
            console.warn('[Scroll Lock] Detected unauthorized scroll lock, restoring...');
            target.style.overflow = '';
            target.style.overflowY = '';
          }
        }
      }
    });
  });

  // Start monitoring
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ['style']
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['style']
  });

  // Keyboard shortcut for emergency unlock (Ctrl+Shift+U)
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'U') {
      forceUnlock();
      console.log('[Scroll Lock] Emergency unlock triggered!');
    }
  });

  console.log('[Scroll Lock Manager] Initialized');

})();
