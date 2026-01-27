/**
 * Performance Mode (Speedy Mode)
 * Reduces animations, simplifies effects for better performance
 */

(function() {
  'use strict';

  const PERF_KEY = 'ts:performance-mode';
  const REDUCE_MOTION_KEY = 'ts:reduce-motion';

  class PerformanceMode {
    constructor() {
      this.enabled = this.getStoredPreference();
      this.reducedMotion = this.checkReducedMotion();
      this.init();
    }

    init() {
      // Check system preference
      this.checkSystemPreferences();
      
      // Apply saved preference
      if (this.enabled || this.reducedMotion) {
        this.enable();
      }

      // Add toggle button if not exists
      this.addToggleButton();

      // Listen for preference changes
      this.listenForChanges();
    }

    checkSystemPreferences() {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion = mediaQuery.matches;

      if (this.reducedMotion) {
        this.enable();
      }

      // Listen for changes
      mediaQuery.addEventListener('change', (e) => {
        this.reducedMotion = e.matches;
        if (e.matches) {
          this.enable();
        }
      });
    }

    getStoredPreference() {
      return localStorage.getItem(PERF_KEY) === 'true' ||
             localStorage.getItem(REDUCE_MOTION_KEY) === 'true';
    }

    checkReducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    enable() {
      this.enabled = true;
      localStorage.setItem(PERF_KEY, 'true');
      
      // Add performance class to html
      document.documentElement.classList.add('performance-mode');
      document.documentElement.classList.add('reduce-motion');

      // Disable heavy animations
      this.disableHeavyAnimations();

      // Simplify effects
      this.simplifyEffects();
    }

    disable() {
      // Don't disable if system prefers reduced motion
      if (this.reducedMotion) {
        return;
      }

      this.enabled = false;
      localStorage.setItem(PERF_KEY, 'false');
      
      // Remove performance class
      document.documentElement.classList.remove('performance-mode');
      document.documentElement.classList.remove('reduce-motion');

      // Re-enable animations
      this.enableAnimations();
    }

    toggle() {
      if (this.enabled) {
        this.disable();
      } else {
        this.enable();
      }
    }

    disableHeavyAnimations() {
      // Disable parallax
      document.querySelectorAll('[data-parallax]').forEach(el => {
        el.style.transform = 'none';
      });

      // Disable 3D transforms
      document.querySelectorAll('[data-tilt]').forEach(el => {
        el.style.transform = 'none';
      });

      // Disable complex animations
      document.querySelectorAll('[data-magnetic]').forEach(el => {
        el.style.transition = 'none';
      });
    }

    enableAnimations() {
      // Re-enable by removing inline styles
      document.querySelectorAll('[data-parallax], [data-tilt], [data-magnetic]').forEach(el => {
        el.style.transform = '';
        el.style.transition = '';
      });
    }

    simplifyEffects() {
      // Reduce animation durations
      const style = document.createElement('style');
      style.id = 'performance-mode-styles';
      style.textContent = `
        .performance-mode *,
        .performance-mode *::before,
        .performance-mode *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
        
        .performance-mode .scroll-fade-in,
        .performance-mode .animate-on-scroll {
          opacity: 1 !important;
          transform: none !important;
        }
      `;

      // Remove old style if exists
      const oldStyle = document.getElementById('performance-mode-styles');
      if (oldStyle) {
        oldStyle.remove();
      }

      document.head.appendChild(style);
    }

    addToggleButton() {
      // Check if button already exists
      if (document.getElementById('perf-mode-toggle')) {
        return;
      }

      const button = document.createElement('button');
      button.id = 'perf-mode-toggle';
      button.className = 'perf-mode-toggle';
      button.setAttribute('aria-label', 'Toggle performance mode');
      button.setAttribute('title', this.enabled ? 'Disable Performance Mode' : 'Enable Performance Mode');
      button.innerHTML = this.enabled ? '⚡ Speedy ON' : '⚡ Speedy OFF';

      button.addEventListener('click', () => {
        this.toggle();
        button.innerHTML = this.enabled ? '⚡ Speedy ON' : '⚡ Speedy OFF';
        button.setAttribute('title', this.enabled ? 'Disable Performance Mode' : 'Enable Performance Mode');
      });

      // Style the button
      const style = document.createElement('style');
      style.textContent = `
        .perf-mode-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          padding: 10px 16px;
          background: #10b981;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.2s ease;
        }

        .perf-mode-toggle:hover {
          background: #059669;
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        }

        .perf-mode-toggle:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .perf-mode-toggle {
            display: none !important; /* Hide on mobile - causes confusion */
          }
        }
      `;
      document.head.appendChild(style);

      // Add to page
      document.body.appendChild(button);
    }

    listenForChanges() {
      // Listen for storage changes from other tabs
      window.addEventListener('storage', (e) => {
        if (e.key === PERF_KEY) {
          this.enabled = e.newValue === 'true';
          if (this.enabled) {
            this.enable();
          } else {
            this.disable();
          }
        }
      });
    }
  }

  // Initialize performance mode
  const perfMode = new PerformanceMode();

  // Expose globally
  window.tsPerformanceMode = perfMode;

  // Keyboard shortcut: Alt + Shift + S
  document.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && e.code === 'KeyS') {
      e.preventDefault();
      perfMode.toggle();
    }
  });

})();
