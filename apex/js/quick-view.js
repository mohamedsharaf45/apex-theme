/**
 * @file
 * Apex Theme - Quick View JavaScript
 *
 * Product quick view modal with AJAX content loading.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.apexQuickView = {
    attach: function (context) {
      once('apex-quick-view', '.apex-quick-view-trigger', context).forEach(
        function (trigger) {
          trigger.addEventListener('click', function (e) {
            e.preventDefault();
            const url = trigger.getAttribute('data-quick-view-url') ||
                        trigger.getAttribute('href');
            if (url) {
              Drupal.apex.quickView.open(url);
            }
          });
        }
      );
    }
  };

  Drupal.apex = Drupal.apex || {};

  Drupal.apex.quickView = {

    modal: null,

    /**
     * Open quick view modal.
     */
    open: function (url) {
      const self = this;
      self.createModal();
      self.showLoading();

      // Fetch product content.
      fetch(url, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' }
      })
        .then(function (response) {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.text();
        })
        .then(function (html) {
          self.loadContent(html);
        })
        .catch(function (error) {
          self.showError(Drupal.t('Unable to load product. Please try again.'));
          console.error('Quick view error:', error);
        });
    },

    /**
     * Create modal structure.
     */
    createModal: function () {
      const self = this;

      if (self.modal) {
        self.modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
        return;
      }

      const modal = document.createElement('div');
      modal.className = 'apex-quick-view';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-label', Drupal.t('Product quick view'));

      modal.innerHTML =
        '<div class="apex-quick-view__overlay"></div>' +
        '<div class="apex-quick-view__dialog">' +
          '<button class="apex-quick-view__close" aria-label="' + Drupal.t('Close') + '">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
              '<line x1="18" y1="6" x2="6" y2="18"></line>' +
              '<line x1="6" y1="6" x2="18" y2="18"></line>' +
            '</svg>' +
          '</button>' +
          '<div class="apex-quick-view__content"></div>' +
        '</div>';

      document.body.appendChild(modal);
      self.modal = modal;

      // Event listeners.
      modal.querySelector('.apex-quick-view__close').addEventListener('click', function () {
        self.close();
      });

      modal.querySelector('.apex-quick-view__overlay').addEventListener('click', function () {
        self.close();
      });

      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape' && self.modal && self.modal.classList.contains('is-open')) {
          self.close();
        }
      });

      // Animate open.
      requestAnimationFrame(function () {
        modal.classList.add('is-open');
      });

      document.body.style.overflow = 'hidden';
    },

    /**
     * Show loading state.
     */
    showLoading: function () {
      const content = this.modal.querySelector('.apex-quick-view__content');
      content.innerHTML =
        '<div class="apex-quick-view__loading">' +
          '<div class="apex-quick-view__spinner"></div>' +
          '<p>' + Drupal.t('Loading product...') + '</p>' +
        '</div>';
    },

    /**
     * Load product content into modal.
     */
    loadContent: function (html) {
      const content = this.modal.querySelector('.apex-quick-view__content');

      // Parse out just the product content.
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const productContent = doc.querySelector('.apex-product-detail') ||
                             doc.querySelector('.node--type-product') ||
                             doc.querySelector('article') ||
                             doc.body;

      content.innerHTML = '';
      content.appendChild(productContent.cloneNode(true));

      // Re-attach Drupal behaviors to new content.
      Drupal.attachBehaviors(content);

      // Focus the first focusable element.
      const focusable = content.querySelector('a, button, input, select, textarea');
      if (focusable) focusable.focus();
    },

    /**
     * Show error state.
     */
    showError: function (message) {
      const content = this.modal.querySelector('.apex-quick-view__content');
      content.innerHTML =
        '<div class="apex-quick-view__error">' +
          '<p>' + message + '</p>' +
          '<button class="apex-btn apex-btn--primary apex-quick-view__retry">' +
            Drupal.t('Close') +
          '</button>' +
        '</div>';

      content.querySelector('.apex-quick-view__retry').addEventListener('click', this.close.bind(this));
    },

    /**
     * Close the modal.
     */
    close: function () {
      const self = this;
      if (!self.modal) return;

      self.modal.classList.remove('is-open');
      document.body.style.overflow = '';

      setTimeout(function () {
        const content = self.modal.querySelector('.apex-quick-view__content');
        if (content) {
          Drupal.detachBehaviors(content);
          content.innerHTML = '';
        }
      }, 300);
    }
  };

})(Drupal, once);
