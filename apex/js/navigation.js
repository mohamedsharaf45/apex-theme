/**
 * @file
 * Apex Theme - Navigation JavaScript
 *
 * Mobile navigation toggle, dropdown menus, search overlay.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.apexNavigation = {
    attach: function (context) {
      once('apex-nav', 'body', context).forEach(function () {
        Drupal.apex.mobileNav();
        Drupal.apex.searchOverlay();
        Drupal.apex.dropdownAccessibility();
      });
    }
  };

  Drupal.apex = Drupal.apex || {};

  /**
   * Mobile Navigation.
   */
  Drupal.apex.mobileNav = function () {
    const toggle = document.querySelector('.apex-mobile-toggle');
    const nav = document.querySelector('.apex-mobile-nav');
    const overlay = document.querySelector('.apex-mobile-nav__overlay');
    const close = document.querySelector('.apex-mobile-nav__close');

    if (!toggle || !nav) return;

    function openNav() {
      toggle.classList.add('is-active');
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
      if (overlay) overlay.classList.add('is-visible');
      document.body.style.overflow = 'hidden';

      // Focus trap.
      const focusable = nav.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) {
        focusable[0].focus();
      }
    }

    function closeNav() {
      toggle.classList.remove('is-active');
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-visible');
      document.body.style.overflow = '';
      toggle.focus();
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    if (close) {
      close.addEventListener('click', closeNav);
    }

    if (overlay) {
      overlay.addEventListener('click', closeNav);
    }

    // Close on Escape.
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        closeNav();
      }
    });

    // Mobile sub-menu toggles.
    const subToggles = nav.querySelectorAll('.apex-mobile-nav__toggle');
    subToggles.forEach(function (subToggle) {
      subToggle.addEventListener('click', function (e) {
        e.preventDefault();
        const subMenu = this.nextElementSibling || this.parentElement.querySelector('.apex-mobile-nav__sub');
        if (subMenu) {
          subMenu.classList.toggle('is-open');
          this.setAttribute('aria-expanded', subMenu.classList.contains('is-open'));
        }
      });
    });

    // Close nav on window resize to desktop.
    let resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth >= 1024 && nav.classList.contains('is-open')) {
          closeNav();
        }
      }, 250);
    });
  };

  /**
   * Search Overlay.
   */
  Drupal.apex.searchOverlay = function () {
    const searchToggle = document.querySelector('.apex-header__search-toggle');
    const searchOverlay = document.querySelector('.apex-search-overlay');
    const searchClose = document.querySelector('.apex-search-overlay__close');
    const searchInput = document.querySelector('.apex-search-overlay__input');

    if (!searchToggle || !searchOverlay) return;

    function openSearch() {
      searchOverlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      if (searchInput) {
        setTimeout(function () {
          searchInput.focus();
        }, 300);
      }
    }

    function closeSearch() {
      searchOverlay.classList.remove('is-open');
      document.body.style.overflow = '';
      searchToggle.focus();
    }

    searchToggle.addEventListener('click', function (e) {
      e.preventDefault();
      openSearch();
    });

    if (searchClose) {
      searchClose.addEventListener('click', closeSearch);
    }

    searchOverlay.addEventListener('click', function (e) {
      if (e.target === searchOverlay) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay.classList.contains('is-open')) {
        closeSearch();
      }
    });
  };

  /**
   * Dropdown Accessibility for keyboard navigation.
   */
  Drupal.apex.dropdownAccessibility = function () {
    const navItems = document.querySelectorAll('.apex-nav__item');

    navItems.forEach(function (item) {
      const link = item.querySelector('.apex-nav__link');
      const dropdown = item.querySelector('.apex-nav__dropdown, .apex-mega-menu');

      if (!link || !dropdown) return;

      // Close dropdown when focus leaves the item.
      item.addEventListener('focusout', function (e) {
        setTimeout(function () {
          if (!item.contains(document.activeElement)) {
            dropdown.style.opacity = '';
            dropdown.style.visibility = '';
          }
        }, 100);
      });

      // Open dropdown on Enter key for parent items.
      link.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === 'ArrowDown') {
          if (dropdown) {
            e.preventDefault();
            dropdown.style.opacity = '1';
            dropdown.style.visibility = 'visible';
            const firstLink = dropdown.querySelector('a');
            if (firstLink) firstLink.focus();
          }
        }
      });

      // Arrow key navigation within dropdown.
      dropdown.addEventListener('keydown', function (e) {
        const links = Array.from(dropdown.querySelectorAll('a'));
        const current = links.indexOf(document.activeElement);

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = links[(current + 1) % links.length];
          if (next) next.focus();
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          const prev = links[(current - 1 + links.length) % links.length];
          if (prev) prev.focus();
        } else if (e.key === 'Escape') {
          dropdown.style.opacity = '';
          dropdown.style.visibility = '';
          link.focus();
        }
      });
    });
  };

})(Drupal, once);
