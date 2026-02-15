/**
 * @file
 * Apex Theme - Core JavaScript
 *
 * Handles sticky header, back-to-top button, preloader,
 * accordions, tabs, smooth scroll, and general UI interactions.
 */

(function (Drupal, drupalSettings, once) {
  'use strict';

  /**
   * Apex core behavior.
   */
  Drupal.behaviors.apexCore = {
    attach: function (context) {
      // Run only once on full page load.
      once('apex-core', 'body', context).forEach(function () {
        Drupal.apex.init();
      });
    }
  };

  /**
   * Apex namespace.
   */
  Drupal.apex = Drupal.apex || {};

  /**
   * Initialize all core features.
   */
  Drupal.apex.init = function () {
    const settings = drupalSettings.apex || {};

    if (settings.headerSticky) {
      Drupal.apex.stickyHeader();
    }

    if (settings.backToTop) {
      Drupal.apex.backToTop();
    }

    if (settings.preloader) {
      Drupal.apex.preloader();
    }

    Drupal.apex.accordions();
    Drupal.apex.tabs();
    Drupal.apex.smoothScroll();
    Drupal.apex.counters();
  };

  /**
   * Sticky Header.
   */
  Drupal.apex.stickyHeader = function () {
    const header = document.querySelector('.apex-header--sticky');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 100;

    function handleScroll() {
      const currentScroll = window.pageYOffset;

      if (currentScroll > scrollThreshold) {
        header.classList.add('apex-header--scrolled');
      } else {
        header.classList.remove('apex-header--scrolled');
      }

      // Hide/show on scroll direction.
      if (currentScroll > lastScroll && currentScroll > 300) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    }

    // Use passive listener for performance.
    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  /**
   * Back to Top Button.
   */
  Drupal.apex.backToTop = function () {
    const btn = document.querySelector('.apex-back-to-top');
    if (!btn) return;

    function toggleVisibility() {
      if (window.pageYOffset > 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true });

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  /**
   * Preloader.
   */
  Drupal.apex.preloader = function () {
    const preloader = document.querySelector('.apex-preloader');
    if (!preloader) return;

    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('is-hidden');
        // Remove from DOM after transition.
        setTimeout(function () {
          preloader.remove();
        }, 500);
      }, 300);
    });
  };

  /**
   * Accordions.
   */
  Drupal.apex.accordions = function () {
    const headers = document.querySelectorAll('.apex-accordion__header');

    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        const body = this.nextElementSibling;
        const isOpen = this.classList.contains('is-active');

        // Close all in same accordion.
        const accordion = this.closest('.apex-accordion');
        if (accordion) {
          accordion.querySelectorAll('.apex-accordion__header').forEach(function (h) {
            h.classList.remove('is-active');
            h.setAttribute('aria-expanded', 'false');
          });
          accordion.querySelectorAll('.apex-accordion__body').forEach(function (b) {
            b.classList.remove('is-open');
          });
        }

        // Toggle current.
        if (!isOpen) {
          this.classList.add('is-active');
          this.setAttribute('aria-expanded', 'true');
          body.classList.add('is-open');
        }
      });

      // Keyboard support.
      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
    });
  };

  /**
   * Tabs.
   */
  Drupal.apex.tabs = function () {
    const tabContainers = document.querySelectorAll('.apex-tabs');

    tabContainers.forEach(function (container) {
      const tabs = container.querySelectorAll('.apex-tabs__tab');
      const panels = container.querySelectorAll('.apex-tabs__panel');

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          const target = this.getAttribute('data-tab');

          // Deactivate all.
          tabs.forEach(function (t) {
            t.classList.remove('is-active');
            t.setAttribute('aria-selected', 'false');
          });
          panels.forEach(function (p) {
            p.classList.remove('is-active');
          });

          // Activate selected.
          this.classList.add('is-active');
          this.setAttribute('aria-selected', 'true');
          const panel = container.querySelector('[data-tab-panel="' + target + '"]');
          if (panel) {
            panel.classList.add('is-active');
          }
        });

        // Keyboard navigation.
        tab.addEventListener('keydown', function (e) {
          const tabList = Array.from(tabs);
          const index = tabList.indexOf(this);

          if (e.key === 'ArrowRight') {
            e.preventDefault();
            const next = tabList[(index + 1) % tabList.length];
            next.focus();
            next.click();
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prev = tabList[(index - 1 + tabList.length) % tabList.length];
            prev.focus();
            prev.click();
          }
        });
      });
    });
  };

  /**
   * Smooth Scroll for anchor links.
   */
  Drupal.apex.smoothScroll = function () {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.apex-header')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Update focus for accessibility.
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }
      });
    });
  };

  /**
   * Animated counters.
   */
  Drupal.apex.counters = function () {
    const counters = document.querySelectorAll('.apex-counter__number[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          function updateCount(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic.
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);
            el.textContent = prefix + current.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = prefix + target.toLocaleString() + suffix;
            }
          }

          requestAnimationFrame(updateCount);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  };

})(Drupal, drupalSettings, once);
