/**
 * @file
 * Apex Theme - Widgets JavaScript
 *
 * Widget-specific interactions: progress bars, sliders, testimonial carousels.
 */

(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.apexWidgets = {
    attach: function (context) {
      once('apex-widgets', 'body', context).forEach(function () {
        Drupal.apex.widgets.progressBars();
        Drupal.apex.widgets.testimonialSlider();
        Drupal.apex.widgets.logoSlider();
        Drupal.apex.widgets.filterGrid();
        Drupal.apex.widgets.tooltip();
      });
    }
  };

  Drupal.apex = Drupal.apex || {};
  Drupal.apex.widgets = {};

  /**
   * Animated progress bars.
   */
  Drupal.apex.widgets.progressBars = function () {
    const bars = document.querySelectorAll('.apex-progress__bar');
    if (!bars.length) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const value = bar.getAttribute('data-value') || bar.getAttribute('aria-valuenow') || 0;
          bar.style.width = value + '%';
          bar.classList.add('is-animated');

          // Animate the percentage label.
          const label = bar.querySelector('.apex-progress__label');
          if (label) {
            animateValue(label, 0, parseInt(value, 10), 1200);
          }

          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    bars.forEach(function (bar) {
      bar.style.width = '0%';
      observer.observe(bar);
    });

    function animateValue(el, start, end, duration) {
      let startTime = null;
      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * (end - start) + start) + '%';
        if (progress < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  };

  /**
   * Testimonial slider / carousel.
   */
  Drupal.apex.widgets.testimonialSlider = function () {
    const sliders = document.querySelectorAll('.apex-testimonial-slider');

    sliders.forEach(function (slider) {
      const track = slider.querySelector('.apex-testimonial-slider__track');
      const slides = slider.querySelectorAll('.apex-testimonial-slider__slide');
      const prevBtn = slider.querySelector('.apex-testimonial-slider__prev');
      const nextBtn = slider.querySelector('.apex-testimonial-slider__next');
      const dots = slider.querySelector('.apex-testimonial-slider__dots');

      if (!track || slides.length < 2) return;

      let current = 0;
      let autoplayTimer = null;
      const autoplayDelay = parseInt(slider.getAttribute('data-autoplay'), 10) || 5000;

      // Create dots.
      if (dots) {
        slides.forEach(function (_, i) {
          const dot = document.createElement('button');
          dot.className = 'apex-testimonial-slider__dot';
          dot.setAttribute('aria-label', Drupal.t('Go to slide @num', { '@num': i + 1 }));
          dot.addEventListener('click', function () { goTo(i); });
          dots.appendChild(dot);
        });
      }

      function goTo(index) {
        current = index;
        if (current < 0) current = slides.length - 1;
        if (current >= slides.length) current = 0;

        track.style.transform = 'translateX(-' + (current * 100) + '%)';

        // Update dots.
        if (dots) {
          const allDots = dots.querySelectorAll('.apex-testimonial-slider__dot');
          allDots.forEach(function (d, i) {
            d.classList.toggle('is-active', i === current);
          });
        }

        // Update ARIA.
        slides.forEach(function (slide, i) {
          slide.setAttribute('aria-hidden', i !== current);
        });

        resetAutoplay();
      }

      if (prevBtn) {
        prevBtn.addEventListener('click', function () { goTo(current - 1); });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () { goTo(current + 1); });
      }

      // Touch / swipe support.
      let touchStartX = 0;
      let touchEndX = 0;

      track.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      track.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
          if (diff > 0) goTo(current + 1);
          else goTo(current - 1);
        }
      }, { passive: true });

      // Keyboard navigation.
      slider.setAttribute('tabindex', '0');
      slider.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') goTo(current - 1);
        else if (e.key === 'ArrowRight') goTo(current + 1);
      });

      // Autoplay.
      function startAutoplay() {
        if (autoplayDelay > 0) {
          autoplayTimer = setInterval(function () {
            goTo(current + 1);
          }, autoplayDelay);
        }
      }

      function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
      }

      // Pause on hover.
      slider.addEventListener('mouseenter', function () {
        clearInterval(autoplayTimer);
      });
      slider.addEventListener('mouseleave', function () {
        startAutoplay();
      });

      // Initialize.
      goTo(0);
    });
  };

  /**
   * Logo / client carousel.
   */
  Drupal.apex.widgets.logoSlider = function () {
    const sliders = document.querySelectorAll('.apex-logo-slider');

    sliders.forEach(function (slider) {
      const track = slider.querySelector('.apex-logo-slider__track');
      if (!track) return;

      // Clone items for infinite scroll.
      const items = track.innerHTML;
      track.innerHTML = items + items;

      // CSS-based infinite scroll (handled by CSS animation).
      // Just ensure the track width is correct.
      const children = track.children;
      let totalWidth = 0;
      Array.from(children).forEach(function (child) {
        totalWidth += child.offsetWidth +
          parseInt(getComputedStyle(child).marginRight, 10) || 0;
      });
      track.style.width = totalWidth + 'px';

      // Pause on hover.
      slider.addEventListener('mouseenter', function () {
        track.style.animationPlayState = 'paused';
      });
      slider.addEventListener('mouseleave', function () {
        track.style.animationPlayState = 'running';
      });
    });
  };

  /**
   * Filterable grid (portfolio, blog, etc.).
   */
  Drupal.apex.widgets.filterGrid = function () {
    const grids = document.querySelectorAll('[data-apex-filter-grid]');

    grids.forEach(function (grid) {
      const filters = grid.querySelectorAll('.apex-filter-btn');
      const items = grid.querySelectorAll('.apex-filter-item');

      if (!filters.length || !items.length) return;

      filters.forEach(function (filter) {
        filter.addEventListener('click', function () {
          filters.forEach(function (f) { f.classList.remove('is-active'); });
          filter.classList.add('is-active');

          const category = filter.getAttribute('data-filter');

          items.forEach(function (item) {
            const itemCats = item.getAttribute('data-category') || '';
            if (category === 'all' || itemCats.indexOf(category) !== -1) {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.8)';
              setTimeout(function () {
                item.style.display = '';
                requestAnimationFrame(function () {
                  item.style.opacity = '1';
                  item.style.transform = 'scale(1)';
                });
              }, 200);
            } else {
              item.style.opacity = '0';
              item.style.transform = 'scale(0.8)';
              setTimeout(function () {
                item.style.display = 'none';
              }, 300);
            }
          });
        });
      });
    });
  };

  /**
   * Tooltip handler.
   */
  Drupal.apex.widgets.tooltip = function () {
    const triggers = document.querySelectorAll('[data-apex-tooltip]');

    triggers.forEach(function (trigger) {
      const text = trigger.getAttribute('data-apex-tooltip');
      const position = trigger.getAttribute('data-tooltip-position') || 'top';

      const tooltip = document.createElement('span');
      tooltip.className = 'apex-tooltip apex-tooltip--' + position;
      tooltip.textContent = text;
      tooltip.setAttribute('role', 'tooltip');

      trigger.style.position = 'relative';
      trigger.appendChild(tooltip);

      trigger.addEventListener('mouseenter', function () {
        tooltip.classList.add('is-visible');
      });
      trigger.addEventListener('mouseleave', function () {
        tooltip.classList.remove('is-visible');
      });
      trigger.addEventListener('focus', function () {
        tooltip.classList.add('is-visible');
      });
      trigger.addEventListener('blur', function () {
        tooltip.classList.remove('is-visible');
      });
    });
  };

})(Drupal, once);
