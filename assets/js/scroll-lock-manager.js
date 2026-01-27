/**
 * Scroll Lock Manager - Centralized scroll control
 * 
 * Purpose: Prevent scroll conflicts between components
 * Features:
 *  - Reference counting for multiple lock sources
 *  - Mobile-aware (no locking on small screens)
 *  - Position restoration on unlock
 *  - Emergency unlock mechanisms
 * 
 * @version 2.0.0
 */

(function() {
  'use strict';

  // ============================================================
  // CONFIGURATION
  // ============================================================

  const CONFIG = {
    MOBILE_BREAKPOINT: 1080,
    MOBILE_LOCK_BREAKPOINT: 768, // Never lock below this
    EMERGENCY_TIMEOUT: 500,       // Auto-unlock if stuck
    DEBUG: location.hostname === 'localhost'
  };

  // ============================================================
  // STATE
  // ============================================================

  let scrollLockCount = 0;
  let savedScrollPosition = 0;
  const lockSources = new Set(); // Track who's locking

  // ============================================================
  // UTILITIES
  // ============================================================

  function isMobile() {
    return window.innerWidth < CONFIG.MOBILE_BREAKPOINT;
  }

  function isMobileSmall() {
    return window.innerWidth <= CONFIG.MOBILE_LOCK_BREAKPOINT;
  }

  function log(level, message, ...args) {
    if (!CONFIG.DEBUG && level === 'debug') return;
    const icon = level === 'error' ? '❌' : level === 'warn' ? '⚠️' : '📜';
    console[level === 'debug' ? 'log' : level](`${icon} [Scroll Lock] ${message}`, ...args);
  }

  // ============================================================
  // CORE FUNCTIONS
  // ============================================================

  /**
   * Lock scroll (increments counter)
   * Mobile-aware: Only locks on desktop viewports
   * @param {string} source - Component requesting lock
   */
  function lockScroll(source = 'unknown') {
    // Don't lock on mobile - prevents content blocking
    if (isMobileSmall()) {
      log('debug', `Lock request from "${source}" IGNORED on mobile`);
      return;
    }
    
    lockSources.add(source);
    scrollLockCount++;
    
    if (scrollLockCount === 1) {
      // First lock - save position and apply
      savedScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollPosition}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      log('debug', `🔒 Locked by "${source}" (count: ${scrollLockCount})`);
    } else {
      log('debug', `Already locked, count increased: ${scrollLockCount} (by "${source}")`);
    }
  }

  /**
   * Release scroll lock (decrements counter)
   * @param {string} source - Component releasing lock
   */
  function unlockScroll(source = 'unknown') {
    lockSources.delete(source);
    scrollLockCount = Math.max(0, scrollLockCount - 1);
    
    if (scrollLockCount === 0) {
      // Last lock released - restore scroll
      const wasFixed = document.body.style.position === 'fixed';
      
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      if (wasFixed && savedScrollPosition) {
        // Restore scroll position instantly
        window.scrollTo({
          top: savedScrollPosition,
          behavior: 'instant'
        });
        savedScrollPosition = 0;
      }
      
      log('debug', `🔓 Unlocked by "${source}" (count: ${scrollLockCount})`);
    } else {
      log('debug', `Still locked, count decreased: ${scrollLockCount} (by "${source}")`);
      log('debug', `Active locks: ${Array.from(lockSources).join(', ')}`);
    }
  }

  /**
   * Force unlock (emergency reset)
   * Clears all locks and restores scroll
   */
  function forceUnlock() {
    const hadLocks = scrollLockCount > 0;
    
    scrollLockCount = 0;
    lockSources.clear();
    
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    
    if (hadLocks) {
      log('warn', '⚡ Force unlocked! All locks cleared.');
    }
  }

  /**
   * Check if scroll is currently locked
   * @returns {boolean}
   */
  function isLocked() {
    return scrollLockCount > 0;
  }

  /**
   * Get current lock status
   * @returns {Object} Status info
   */
  function getStatus() {
    return {
      locked: scrollLockCount > 0,
      count: scrollLockCount,
      sources: Array.from(lockSources),
      savedPosition: savedScrollPosition
    };
  }

  // ============================================================
  // PUBLIC API
  // ============================================================

  window.ScrollLockManager = {
    lock: lockScroll,
    unlock: unlockScroll,
    forceUnlock: forceUnlock,
    isLocked: isLocked,
    getStatus: getStatus,
    getCount: () => scrollLockCount,
    getSources: () => Array.from(lockSources)
  };

  // ============================================================
  // SAFETY MECHANISMS
  // ============================================================

  /**
   * Emergency unlock on DOM ready
   */
  document.addEventListener('DOMContentLoaded', () => {
    // Reset to clean state
    scrollLockCount = 0;
    lockSources.clear();
    savedScrollPosition = 0;
    
    // Clear all scroll-blocking styles
    document.documentElement.style.overflow = '';
    document.documentElement.style.overflowY = '';
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.height = 'auto';
    
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    log('debug', '✓ Initialized - scroll enabled');
  });
  
  /**
   * Final verification after page load
   */
  window.addEventListener('load', () => {
    setTimeout(() => {
      const bodyStyles = window.getComputedStyle(document.body);
      const isStuck = scrollLockCount > 0 || 
                     bodyStyles.overflow === 'hidden' || 
                     bodyStyles.position === 'fixed';
      
      if (isStuck) {
        log('error', '⚠️ Detected stuck scroll lock after page load!');
        forceUnlock();
        
        // Nuclear clear
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
      }
      
      log('debug', '✓ Load verification complete');
    }, CONFIG.EMERGENCY_TIMEOUT);
  });

  // ============================================================
  // ROGUE SCRIPT MONITOR
  // ============================================================

  /**
   * Watch for unauthorized scroll locks
   */
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
        const target = mutation.target;
        
        // If body/html has overflow:hidden but we have no active locks, restore it
        if ((target === document.body || target === document.documentElement) && scrollLockCount === 0) {
          const overflow = target.style.overflow;
          const overflowY = target.style.overflowY;
          
          if (overflow === 'hidden' || overflowY === 'hidden') {
            log('warn', '🚨 Detected unauthorized scroll lock - restoring...');
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
