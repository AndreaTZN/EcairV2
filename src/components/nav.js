window.Webflow ||= [];
window.Webflow.push(() => {
  $('.navb2b-component').each(function () {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 992px)', () => {
      const $navWrapper = $('.navb2b-component');
      const $blurBg = $('.dropdown_blur-bg');

      const dropdowns = [{ key: 'solutions', className: 'is-solutions' }];

      const timelines = {}; // { key: { openTl, closeTl } }
      const isOpen = {};

      // Blur Timeline
      const blurTl = gsap
        .timeline({ paused: true, reversed: true })
        .fromTo(
          $blurBg,
          { opacity: 0, display: 'none' },
          { opacity: 1, display: 'block', duration: 0.3, ease: 'power2.out' }
        );

      function getElements(className) {
        return {
          $link: $(`.navbar_menu-dropdown.${className}`),
          $arrow: $(`.dropdown-chevron.${className}`),
          $container: $(`.dropdown.${className}`),
          $wrapper: $(`.dropdown_container.${className}`),
        };
      }

      function createOpenTimeline({ $container, $arrow, $wrapper }) {
        const tl = gsap.timeline({ paused: true });

        tl.set($container, { display: 'flex' });
        tl.fromTo($container, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
        tl.fromTo($wrapper, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' }, '<');
        tl.to($arrow, { rotate: 180, duration: 0.5, ease: 'power2.out' }, '<');

        return tl;
      }

      function createCloseTimeline({ $container, $arrow, $wrapper }) {
        const tl = gsap.timeline({
          paused: true,
          onComplete: () => {
            gsap.set($container, { display: 'none' });
          },
        });

        tl.to($arrow, { rotate: 0, duration: 0.5, ease: 'power2.inOut' });
        tl.to($wrapper, { opacity: 0, duration: 0.3, ease: 'power2.inOut' }, '<');
        tl.to($container, { opacity: 0, duration: 0.3, ease: 'power2.inOut' }, '<');

        return tl;
      }

      function initDropdown({ key, className }) {
        const { $link, $arrow, $container, $wrapper } = getElements(className);
        if (!$link.length || !$arrow.length || !$container.length || !$wrapper.length) return;

        const openTl = createOpenTimeline({ $container, $arrow, $wrapper });
        const closeTl = createCloseTimeline({ $container, $arrow, $wrapper });

        timelines[key] = { openTl, closeTl };
        isOpen[key] = false;

        const open = () => {
          closeAllDropdowns(); // ferme les autres
          timelines[key].openTl.restart(); // ✅ important

          isOpen[key] = true;
          $link.addClass('is-open');

          if (blurTl.reversed() || !blurTl.isActive()) {
            blurTl.play();
          }
        };

        const close = () => {
          timelines[key].closeTl.restart(); // ✅ important

          isOpen[key] = false;
          $link.removeClass('is-open');

          const anyStillOpen = Object.values(isOpen).some(Boolean);
          if (!anyStillOpen) {
            blurTl.reverse();
          }
        };

        function closeAllDropdowns() {
          Object.entries(timelines).forEach(([otherKey, { openTl, closeTl }]) => {
            if (key !== otherKey && isOpen[otherKey]) {
              openTl.pause(0);
              closeTl.play();
              isOpen[otherKey] = false;
              $(`.navbar_menu-dropdown.is-${otherKey}`).removeClass('is-open');
            }
          });
        }

        // EVENTS
        $link.on('click', (e) => {
          e.preventDefault();
          if (isOpen[key]) {
            close();
          } else {
            open();
          }
        });

        $blurBg.on('click', () => {
          close();
        });
      }

      dropdowns.forEach(initDropdown);
    });
  });
  $('.navb2b-component').each(function () {
    const $nav = $(this);

    // ScrollTrigger pour ajouter la classe is-active selon la position
    ScrollTrigger.create({
      trigger: '.main-wrapper',
      start: '10px top',
      end: 'bottom top',
      onEnter: () => {
        $nav.addClass('is-active');
      },
      onLeaveBack: () => {
        $nav.removeClass('is-active');
      },
    });

    // ScrollTrigger pour détecter le scroll direction
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const direction = self.direction;

        if (direction === 1) {
          // scroll vers le bas
          gsap.to($nav, {
            yPercent: -100,
            duration: 0.3,
            ease: 'power2.out',
          });
        } else {
          // scroll vers le haut
          gsap.to($nav, {
            yPercent: 0,
            duration: 0.6,
            ease: 'power2.out',
          });
        }
      },
    });
  });
});
