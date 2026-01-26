/**
 * EMERGENCY SERVICE WORKER BYPASS + SCROLL LOCK FIX
 * Unregisters ALL service workers and prevents re-registration
 * ALSO prevents scroll locking that's hiding content
 * Use this ONLY for emergency mobile debugging
 */

(function() {
  'use strict';
  
  console.log('[EMERGENCY] Service worker bypass + scroll lock fix loaded');
  
  // FIX #1: Unregister ALL service workers immediately
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      registrations.forEach(function(registration) {
        console.log('[EMERGENCY] Unregistering service worker:', registration.scope);
        registration.unregister();
      });
    });
    
    // Prevent new registrations
    const originalRegister = navigator.serviceWorker.register;
    navigator.serviceWorker.register = function() {
      console.log('[EMERGENCY] Service worker registration blocked');
      return Promise.reject(new Error('Service worker disabled for emergency debugging'));
    };
  }
  
  // FIX #2: Clear all caches
  if ('caches' in window) {
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          console.log('[EMERGENCY] Deleting cache:', cacheName);
          return caches.delete(cacheName);
        })
      );
    });
  }
  
  // FIX #3: DISABLE SCROLL LOCK MANAGER - This is what's hiding content!
  window.ScrollLockManager = {
    lock: function(source) {
      console.log('[EMERGENCY] ScrollLockManager.lock() blocked for:', source);
      // DO NOTHING - don't lock scroll
    },
    unlock: function(source) {
      console.log('[EMERGENCY] ScrollLockManager.unlock() called for:', source);
      // DO NOTHING - don't unlock scroll
    },
    forceUnlock: function() {
      console.log('[EMERGENCY] ScrollLockManager.forceUnlock() called');
      // Ensure body is NOT fixed
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    }
  };
  
  // FIX #4: Force unlock on page load
  function forceUnlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    console.log('[EMERGENCY] Forced scroll unlock');
  }
  
  // Run immediately
  forceUnlockScroll();
  
  // Run again after DOM loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', forceUnlockScroll);
  } else {
    setTimeout(forceUnlockScroll, 100);
  }
  
  // Run again after 1 second (in case scripts try to lock later)
  setTimeout(forceUnlockScroll, 1000);
  
  console.log('[EMERGENCY] All fixes applied - page should work now');
})();
