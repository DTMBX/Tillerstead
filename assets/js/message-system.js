/* ============================================================
   PERFECT MESSAGE SYSTEM - JavaScript Controller
   Creates delightful, perfectly-timed notifications
   ============================================================ */

(function() {
  'use strict';
  
  // Message queue for perfect timing
  let messageQueue = [];
  let isShowingMessage = false;
  
  /**
   * Show a toast notification with perfect timing
   * @param {string} message - The message text
   * @param {string} type - success, error, warning, info
   * @param {number} duration - How long to show (ms)
   */
  window.showToast = function(message, type = 'info', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    
    // Add to DOM
    document.body.appendChild(toast);
    
    // Auto-remove after duration
    setTimeout(() => {
      toast.classList.add('toast--exit');
      setTimeout(() => {
        toast.remove();
      }, 500); // Match exit animation duration
    }, duration);
    
    // Accessibility - announce to screen readers
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  };
  
  /**
   * Show notification banner (like "Scheduling January")
   * @param {string} message - Banner message
   * @param {number} duration - How long to show
   */
  window.showBanner = function(message, duration = 10000) {
    // Remove existing banner
    const existing = document.querySelector('.notification-banner');
    if (existing) existing.remove();
    
    const banner = document.createElement('div');
    banner.className = 'notification-banner scheduling-banner';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.textContent = message;
    
    // Make it clickable to dismiss
    banner.style.cursor = 'pointer';
    banner.addEventListener('click', () => {
      banner.classList.add('notification-banner--exit');
      setTimeout(() => banner.remove(), 500);
    });
    
    document.body.appendChild(banner);
    
    // Auto-hide after duration
    if (duration > 0) {
      setTimeout(() => {
        if (banner.parentNode) {
          banner.classList.add('notification-banner--exit');
          setTimeout(() => banner.remove(), 500);
        }
      }, duration);
    }
  };
  
  /**
   * Stagger multiple messages for perfect timing
   * @param {Array} messages - Array of {text, type} objects
   */
  window.showMessages = function(messages, delayBetween = 800) {
    messages.forEach((msg, index) => {
      setTimeout(() => {
        showToast(msg.text, msg.type || 'info', msg.duration || 5000);
      }, index * delayBetween);
    });
  };
  
  /**
   * Success message with confetti
   */
  window.showSuccess = function(message, duration = 5000) {
    const toast = document.createElement('div');
    toast.className = 'toast toast--success with-confetti';
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'polite');
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    // Play success sound if available
    playSound('success');
    
    setTimeout(() => {
      toast.classList.add('toast--exit');
      setTimeout(() => toast.remove(), 500);
    }, duration);
  };
  
  /**
   * Loading message
   */
  window.showLoading = function(message = 'Loading...') {
    const loading = document.createElement('div');
    loading.className = 'toast loading-message';
    loading.innerHTML = `
      <span>${message}</span>
      <span class="loading-spinner"></span>
    `;
    loading.id = 'loading-toast';
    
    document.body.appendChild(loading);
    
    return {
      hide: function() {
        loading.classList.add('toast--exit');
        setTimeout(() => loading.remove(), 500);
      }
    };
  };
  
  /**
   * Play subtle sound effects (if enabled)
   */
  function playSound(type) {
    // Only play if user has interacted and sounds are enabled
    if (!window.soundsEnabled) return;
    
    const sounds = {
      success: [480, 0.1, 'sine'],
      error: [240, 0.15, 'square'],
      info: [360, 0.08, 'sine']
    };
    
    const [frequency, duration, waveType] = sounds[type] || sounds.info;
    
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = waveType;
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      // Silently fail if audio not supported
    }
  }
  
  /**
   * Auto-detect and style existing "Scheduling January" messages
   */
  function enhanceSchedulingMessages() {
    // Find any text containing "Scheduling"
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const schedulingTexts = [];
    let node;
    
    while (node = walker.nextNode()) {
      if (node.textContent.includes('Scheduling January') || 
          node.textContent.includes('Scheduling') && node.textContent.includes('projects')) {
        schedulingTexts.push(node);
      }
    }
    
    schedulingTexts.forEach(textNode => {
      const parent = textNode.parentElement;
      if (parent && !parent.classList.contains('notification-banner')) {
        parent.classList.add('scheduling-banner');
        parent.setAttribute('role', 'status');
        parent.setAttribute('aria-live', 'polite');
      }
    });
  }
  
  /**
   * Initialize on page load
   */
  function init() {
    // Enhance existing messages
    enhanceSchedulingMessages();
    
    // Show welcome banner if first visit
    if (!sessionStorage.getItem('welcomeShown')) {
      setTimeout(() => {
        showBanner('🎉 Scheduling January 2026 projects now', 15000);
        sessionStorage.setItem('welcomeShown', 'true');
      }, 1000);
    }
    
    // Add keyboard shortcut to enable sounds (Ctrl+Shift+S)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        window.soundsEnabled = !window.soundsEnabled;
        showToast(
          `Sounds ${window.soundsEnabled ? 'enabled' : 'disabled'}`,
          'info',
          2000
        );
      }
    });
    
    console.log('[MESSAGES] Perfect timing system loaded ✨');
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
})();
