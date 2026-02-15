/**
 * @file
 * Apex Theme - Commerce JavaScript
 *
 * Product grid/list toggle, filtering, AJAX cart, quantity selectors.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.apexCommerce = {
    attach: function (context) {
      once('apex-commerce', '.apex-commerce', context).forEach(function (el) {
        Drupal.apex.commerce.viewToggle(el);
        Drupal.apex.commerce.quantitySelector(context);
        Drupal.apex.commerce.miniCart(context);
        Drupal.apex.commerce.productGallery(context);
        Drupal.apex.commerce.wishlist(context);
        Drupal.apex.commerce.filters(el);
      });
    }
  };

  Drupal.apex = Drupal.apex || {};
  Drupal.apex.commerce = {};

  /**
   * Product grid/list view toggle.
   */
  Drupal.apex.commerce.viewToggle = function (container) {
    const toggles = container.querySelectorAll('.apex-view-toggle__btn');
    const productGrid = container.querySelector('.apex-products');

    if (!toggles.length || !productGrid) return;

    toggles.forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggles.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');

        const view = btn.getAttribute('data-view');
        productGrid.classList.remove('apex-products--grid', 'apex-products--list');
        productGrid.classList.add('apex-products--' + view);

        localStorage.setItem('apex-product-view', view);
      });
    });

    // Restore preference.
    const savedView = localStorage.getItem('apex-product-view');
    if (savedView) {
      toggles.forEach(function (btn) {
        btn.classList.remove('is-active');
        if (btn.getAttribute('data-view') === savedView) {
          btn.classList.add('is-active');
        }
      });
      productGrid.classList.remove('apex-products--grid', 'apex-products--list');
      productGrid.classList.add('apex-products--' + savedView);
    }
  };

  /**
   * Quantity selector (plus/minus buttons).
   */
  Drupal.apex.commerce.quantitySelector = function (context) {
    const selectors = context.querySelectorAll
      ? context.querySelectorAll('.apex-quantity')
      : [];

    selectors.forEach(function (selector) {
      if (selector.dataset.apexInit) return;
      selector.dataset.apexInit = 'true';

      const input = selector.querySelector('.apex-quantity__input');
      const minus = selector.querySelector('.apex-quantity__minus');
      const plus = selector.querySelector('.apex-quantity__plus');

      if (!input || !minus || !plus) return;

      const min = parseInt(input.getAttribute('min'), 10) || 1;
      const max = parseInt(input.getAttribute('max'), 10) || 999;
      const step = parseInt(input.getAttribute('step'), 10) || 1;

      minus.addEventListener('click', function () {
        let val = parseInt(input.value, 10) || min;
        val = Math.max(min, val - step);
        input.value = val;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      plus.addEventListener('click', function () {
        let val = parseInt(input.value, 10) || min;
        val = Math.min(max, val + step);
        input.value = val;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });

      input.addEventListener('change', function () {
        let val = parseInt(this.value, 10);
        if (isNaN(val) || val < min) val = min;
        if (val > max) val = max;
        this.value = val;
      });
    });
  };

  /**
   * Mini cart dropdown.
   */
  Drupal.apex.commerce.miniCart = function (context) {
    const cartToggle = document.querySelector('.apex-header__cart-toggle');
    const miniCart = document.querySelector('.apex-mini-cart');

    if (!cartToggle || !miniCart) return;

    cartToggle.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      miniCart.classList.toggle('is-open');
      cartToggle.setAttribute(
        'aria-expanded',
        miniCart.classList.contains('is-open')
      );
    });

    // Close on outside click.
    document.addEventListener('click', function (e) {
      if (!miniCart.contains(e.target) && !cartToggle.contains(e.target)) {
        miniCart.classList.remove('is-open');
        cartToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && miniCart.classList.contains('is-open')) {
        miniCart.classList.remove('is-open');
        cartToggle.setAttribute('aria-expanded', 'false');
        cartToggle.focus();
      }
    });

    // Remove item from mini cart.
    miniCart.addEventListener('click', function (e) {
      const removeBtn = e.target.closest('.apex-mini-cart__remove');
      if (removeBtn) {
        e.preventDefault();
        const item = removeBtn.closest('.apex-mini-cart__item');
        if (item) {
          item.style.opacity = '0';
          item.style.height = item.offsetHeight + 'px';
          setTimeout(function () {
            item.style.height = '0';
            item.style.padding = '0';
            item.style.margin = '0';
          }, 200);
          setTimeout(function () {
            item.remove();
            updateCartCount();
          }, 400);
        }
      }
    });

    function updateCartCount() {
      const count = miniCart.querySelectorAll('.apex-mini-cart__item').length;
      const badge = document.querySelector('.apex-header__cart-count');
      if (badge) {
        badge.textContent = count;
        if (count === 0) {
          badge.style.display = 'none';
        }
      }
    }
  };

  /**
   * Product image gallery with thumbnails.
   */
  Drupal.apex.commerce.productGallery = function (context) {
    const gallery = context.querySelector
      ? context.querySelector('.apex-product-gallery')
      : null;

    if (!gallery) return;

    const mainImage = gallery.querySelector('.apex-product-gallery__main img');
    const thumbnails = gallery.querySelectorAll('.apex-product-gallery__thumb');

    if (!mainImage || !thumbnails.length) return;

    thumbnails.forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        thumbnails.forEach(function (t) { t.classList.remove('is-active'); });
        thumb.classList.add('is-active');

        const src = thumb.getAttribute('data-full') || thumb.querySelector('img').src;
        const alt = thumb.querySelector('img')
          ? thumb.querySelector('img').alt
          : '';

        mainImage.style.opacity = '0';
        setTimeout(function () {
          mainImage.src = src;
          mainImage.alt = alt;
          mainImage.style.opacity = '1';
        }, 200);
      });
    });

    // Lightbox / zoom on main image click.
    mainImage.addEventListener('click', function () {
      const lightbox = document.createElement('div');
      lightbox.className = 'apex-lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-label', Drupal.t('Image zoom'));

      const img = document.createElement('img');
      img.src = mainImage.src;
      img.alt = mainImage.alt;
      img.className = 'apex-lightbox__image';

      const closeBtn = document.createElement('button');
      closeBtn.className = 'apex-lightbox__close';
      closeBtn.setAttribute('aria-label', Drupal.t('Close'));
      closeBtn.innerHTML = '&times;';

      lightbox.appendChild(img);
      lightbox.appendChild(closeBtn);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(function () {
        lightbox.classList.add('is-open');
      });

      function closeLightbox() {
        lightbox.classList.remove('is-open');
        setTimeout(function () {
          lightbox.remove();
          document.body.style.overflow = '';
        }, 300);
      }

      closeBtn.addEventListener('click', closeLightbox);
      lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
      });
      document.addEventListener('keydown', function handler(e) {
        if (e.key === 'Escape') {
          closeLightbox();
          document.removeEventListener('keydown', handler);
        }
      });
    });
  };

  /**
   * Wishlist toggle.
   */
  Drupal.apex.commerce.wishlist = function (context) {
    const buttons = context.querySelectorAll
      ? context.querySelectorAll('.apex-wishlist-toggle')
      : [];

    buttons.forEach(function (btn) {
      if (btn.dataset.apexInit) return;
      btn.dataset.apexInit = 'true';

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const productId = btn.getAttribute('data-product-id');
        const isActive = btn.classList.contains('is-active');

        btn.classList.toggle('is-active');
        btn.setAttribute('aria-pressed', !isActive);

        // Store in localStorage.
        let wishlist = JSON.parse(localStorage.getItem('apex-wishlist') || '[]');
        if (isActive) {
          wishlist = wishlist.filter(function (id) { return id !== productId; });
        } else {
          if (wishlist.indexOf(productId) === -1) {
            wishlist.push(productId);
          }
        }
        localStorage.setItem('apex-wishlist', JSON.stringify(wishlist));

        // Dispatch event.
        document.dispatchEvent(new CustomEvent('apex:wishlistChange', {
          detail: { productId: productId, added: !isActive }
        }));
      });

      // Restore state.
      const productId = btn.getAttribute('data-product-id');
      const wishlist = JSON.parse(localStorage.getItem('apex-wishlist') || '[]');
      if (wishlist.indexOf(productId) !== -1) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
      }
    });
  };

  /**
   * Product filter sidebar toggle (mobile).
   */
  Drupal.apex.commerce.filters = function (container) {
    const filterToggle = container.querySelector('.apex-filter-toggle');
    const filterSidebar = container.querySelector('.apex-filter-sidebar');

    if (!filterToggle || !filterSidebar) return;

    filterToggle.addEventListener('click', function () {
      filterSidebar.classList.toggle('is-open');
      filterToggle.setAttribute(
        'aria-expanded',
        filterSidebar.classList.contains('is-open')
      );
    });

    // Price range slider update.
    const rangeInputs = container.querySelectorAll('.apex-price-range__input');
    const rangeDisplay = container.querySelector('.apex-price-range__display');

    if (rangeInputs.length === 2 && rangeDisplay) {
      rangeInputs.forEach(function (input) {
        input.addEventListener('input', function () {
          const min = rangeInputs[0].value;
          const max = rangeInputs[1].value;
          rangeDisplay.textContent = '$' + min + ' - $' + max;
        });
      });
    }
  };

})(Drupal, once);
