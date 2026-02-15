/**
 * @file
 * Apex Theme - Animations JavaScript
 *
 * Intersection Observer-based scroll-triggered animations.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.apexAnimations = {
    attach: function (context) {
      once('apex-animations', 'body', context).forEach(function () {
        // Respect user preference for reduced motion.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          Drupal.apex.animations.showAll();
          return;
        }
        Drupal.apex.animations.init();
      });
    }
  };

  Drupal.apex = Drupal.apex || {};

  Drupal.apex.animations = {

    observer: null,

    init: function () {
      const self = this;

      // Create Intersection Observer.
      self.observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute('data-apex-delay') || 0;

            setTimeout(function () {
              el.classList.add('is-animated');
            }, parseInt(delay, 10));

            // Stop observing once animated.
            self.observer.unobserve(el);
          }
        });
      }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
      });

      // Observe all animated elements.
      self.observeElements();

      // Parallax scroll effect.
      self.parallax();

      // Staggered children animation.
      self.staggerChildren();
    },

    /**
     * Observe all elements with data-apex-animate attribute.
     */
    observeElements: function () {
      const self = this;
      const elements = document.querySelectorAll('[data-apex-animate]:not(.is-animated)');
      elements.forEach(function (el) {
        self.observer.observe(el);
      });
    },

    /**
     * Show all animated elements immediately (for reduced motion).
     */
    showAll: function () {
      const elements = document.querySelectorAll('[data-apex-animate]');
      elements.forEach(function (el) {
        el.classList.add('is-animated');
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    },

    /**
     * Parallax scrolling effect for hero backgrounds.
     */
    parallax: function () {
      const parallaxElements = document.querySelectorAll('[data-apex-parallax]');
      if (!parallaxElements.length) return;

      let ticking = false;

      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            const scrolled = window.pageYOffset;
            parallaxElements.forEach(function (el) {
              const speed = parseFloat(el.getAttribute('data-apex-parallax')) || 0.3;
              const rect = el.getBoundingClientRect();

              // Only apply when element is in viewport.
              if (rect.bottom > 0 && rect.top < window.innerHeight) {
                const yPos = -(scrolled * speed);
                el.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
              }
            });
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    },

    /**
     * Stagger animation for children of a container.
     */
    staggerChildren: function () {
      const self = this;
      const containers = document.querySelectorAll('[data-apex-stagger]');

      if (!containers.length) return;

      const staggerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const container = entry.target;
            const staggerDelay = parseInt(container.getAttribute('data-apex-stagger'), 10) || 100;
            const children = container.children;

            Array.from(children).forEach(function (child, index) {
              setTimeout(function () {
                child.classList.add('is-animated');
                child.style.opacity = '1';
                child.style.transform = 'translateY(0)';
              }, staggerDelay * index);
            });

            staggerObserver.unobserve(container);
          }
        });
      }, {
        threshold: 0.2
      });

      containers.forEach(function (container) {
        // Set initial state for children.
        Array.from(container.children).forEach(function (child) {
          child.style.opacity = '0';
          child.style.transform = 'translateY(20px)';
          child.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        staggerObserver.observe(container);
      });
    }
  };

})(Drupal, once);
