window.Webflow ||= [];
window.Webflow.push(() => {
  $('.navb2b-component').each(function () {
    let mm = gsap.matchMedia();
    mm.add('(min-width: 992px)', () => {
      const $navWrapper = $('.navb2b-component');
      const $blurBg = $('.dropdown_blur-bg');

      const dropdowns = [{ key: 'solutions', className: 'is-solutions' }];

      const timelines = {};
      const isOpen = {};

      // Timeline pour le blur
      const blurTl = gsap.timeline({ paused: true });
      blurTl.fromTo(
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

      function createTimeline({ $container, $arrow, $wrapper }) {
        const tl = gsap.timeline({ paused: true, reversed: true });

        tl.fromTo(
          $container,
          { display: 'none', opacity: 0 },
          {
            display: 'flex',
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          }
        )
          .fromTo(
            $wrapper,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',
            },
            '-=0.3'
          )
          .to($arrow, { rotate: 180, duration: 0.8, ease: 'power2.out' }, '<');

        return tl;
      }

      function initDropdown({ key, className }) {
        const { $link, $arrow, $container, $wrapper } = getElements(className);
        if (!$link.length || !$arrow.length || !$container.length || !$wrapper.length) return;

        timelines[key] = createTimeline({ $container, $arrow, $wrapper });
        isOpen[key] = false;

        const open = () => {
          timelines[key].timeScale(1).play();
          isOpen[key] = true;
          $link.addClass('is-open');
          // Si c'est le premier dropdown ouvert → lancer le blur
          if (blurTl.reversed() || !blurTl.isActive()) {
            blurTl.play();
          }
        };

        const close = () => {
          timelines[key].timeScale(1).reverse();
          isOpen[key] = false;

          const stillOpen = Object.values(isOpen).some((val) => val === true);

          if (!stillOpen) {
            // Si plus aucun dropdown ouvert → fermer le blur
            blurTl.reverse();
            $link.removeClass('is-open');
          }
        };

        $link.on('click', () => {
          if (!isOpen[key]) open();
        });

        $blurBg.on('click', () => {
          close();
        });

        /*    $link.on('mouseleave', onLeave);
        $container.on('mouseleave', onLeave); */
      }

      dropdowns.forEach(initDropdown);
    });
  });

  /*   $('.navb2b-component').each(function () {
    let nav = $('.navb2b_fixed');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.main-wrapper',
        start: '500px top',
        end: 'bottom top',
        onEnter: () => {
          nav.addClass('is-active');
        },
        onLeaveBack: () => {
          nav.removeClass('is-active');
        },
      },
    });
  }); */
});
