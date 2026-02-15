/**
 * @file
 * Apex Theme - Dark Mode JavaScript
 *
 * Dark mode toggle with localStorage persistence and system preference detection.
 */

(function (Drupal, drupalSettings, once) {
  'use strict';

  Drupal.behaviors.apexDarkMode = {
    attach: function (context) {
      once('apex-dark-mode', 'body', context).forEach(function () {
        Drupal.apex.darkMode.init();
      });
    }
  };

  Drupal.apex = Drupal.apex || {};

  Drupal.apex.darkMode = {
    storageKey: 'apex-dark-mode',
    htmlEl: document.documentElement,

    init: function () {
      const self = this;

      // Check if dark mode is enabled via theme settings.
      const settings = drupalSettings.apex || {};
      if (!settings.darkMode) return;

      // Determine initial state.
      const stored = localStorage.getItem(self.storageKey);
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      if (stored === 'dark' || (stored === null && systemPrefersDark)) {
        self.enable(false);
      } else {
        self.disable(false);
      }

      // Create toggle button if none exists.
      self.createToggle();

      // Listen for system preference changes.
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', function (e) {
          // Only follow system preference if user hasn't set a preference.
          if (localStorage.getItem(self.storageKey) === null) {
            if (e.matches) {
              self.enable(true);
            } else {
              self.disable(true);
            }
          }
        });
    },

    /**
     * Create and insert the dark mode toggle.
     */
    createToggle: function () {
      const self = this;
      const existing = document.querySelector('.apex-dark-toggle');
      if (existing) {
        existing.addEventListener('click', function () {
          self.toggle();
        });
        self.updateToggle(existing);
        return;
      }

      const toggle = document.createElement('button');
      toggle.className = 'apex-dark-toggle';
      toggle.setAttribute('type', 'button');
      toggle.setAttribute('aria-label', Drupal.t('Toggle dark mode'));
      toggle.setAttribute('role', 'switch');
      toggle.innerHTML = '<span class="apex-dark-toggle__track">' +
        '<span class="apex-dark-toggle__thumb"></span>' +
        '</span>';

      toggle.addEventListener('click', function () {
        self.toggle();
      });

      // Insert into header actions or body.
      const headerActions = document.querySelector('.apex-header__actions');
      if (headerActions) {
        headerActions.insertBefore(toggle, headerActions.firstChild);
      } else {
        toggle.style.position = 'fixed';
        toggle.style.bottom = '80px';
        toggle.style.right = '20px';
        toggle.style.zIndex = '998';
        document.body.appendChild(toggle);
      }

      self.updateToggle(toggle);
    },

    /**
     * Update toggle ARIA and visual state.
     */
    updateToggle: function (toggle) {
      const isDark = this.htmlEl.getAttribute('data-theme') === 'dark';
      toggle.setAttribute('aria-checked', isDark ? 'true' : 'false');
      if (isDark) {
        toggle.classList.add('is-dark');
      } else {
        toggle.classList.remove('is-dark');
      }
    },

    /**
     * Toggle dark mode.
     */
    toggle: function () {
      if (this.htmlEl.getAttribute('data-theme') === 'dark') {
        this.disable(true);
      } else {
        this.enable(true);
      }
    },

    /**
     * Enable dark mode.
     */
    enable: function (save) {
      this.htmlEl.setAttribute('data-theme', 'dark');
      this.htmlEl.classList.add('dark-mode');
      if (save) {
        localStorage.setItem(this.storageKey, 'dark');
      }
      const toggle = document.querySelector('.apex-dark-toggle');
      if (toggle) this.updateToggle(toggle);

      // Update meta theme-color.
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#1a1a2e');

      // Dispatch custom event for other scripts.
      document.dispatchEvent(new CustomEvent('apex:darkModeChange', {
        detail: { dark: true }
      }));
    },

    /**
     * Disable dark mode.
     */
    disable: function (save) {
      this.htmlEl.removeAttribute('data-theme');
      this.htmlEl.classList.remove('dark-mode');
      if (save) {
        localStorage.setItem(this.storageKey, 'light');
      }
      const toggle = document.querySelector('.apex-dark-toggle');
      if (toggle) this.updateToggle(toggle);

      // Update meta theme-color.
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', '#ffffff');

      document.dispatchEvent(new CustomEvent('apex:darkModeChange', {
        detail: { dark: false }
      }));
    }
  };

  // Apply dark mode as early as possible to avoid FOUC.
  (function () {
    const stored = localStorage.getItem('apex-dark-mode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (stored === 'dark' || (stored === null && systemPrefersDark)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      document.documentElement.classList.add('dark-mode');
    }
  })();

})(Drupal, drupalSettings, once);
