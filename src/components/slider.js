import 'swiper/css';

import Swiper from 'swiper/bundle';

window.Webflow ||= [];
window.Webflow.push(() => {
  $('.homeb2b-slider_section').each(function (index) {
    let el = $(this);
    let sliderWrap = el.find('.swiper')[0];
    const slider = new Swiper(sliderWrap, {
      slidesPerView: 'auto',
      spaceBetween: 40,
      grabCursor: true,

      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
      freeMode: true,
      momentumBounce: false,
      momentumBounceRatio: 0.3,
    });
  });
  $('.swiper.is-slider-teamsb2b').each(function (index, el) {
    const slider = new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 40,
      grabCursor: true,

      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      freeMode: true,
      momentumBounce: false,
      momentumBounceRatio: 0.3,
    });
  });

  $('.swiper.is-slider-teams').each(function (index, el) {
    let list = $(this).find('.swiper-wrapper.is-slider-teams');
    let item = $(this).find('.swiper-slide.is-slider-teams');

    const slider = new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 12,
      grabCursor: true,

      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      freeMode: true,
      momentumBounce: false,
      momentumBounceRatio: 0.3,

      // Responsive breakpoints
      breakpoints: {
        // when window width is >= 640px
        1200: {
          slidesPerView: 'auto',
          spaceBetween: 24,
        },
      },
    });

    const updateSlider = () => {
      const windowWidth = $(window).width();

      const getTotalSlide = (selector) => {
        var totalWidth = 0;
        $(selector).each(function () {
          totalWidth += $(this).outerWidth(true);
        });
        return totalWidth;
      };

      let totalWidth = getTotalSlide(item);

      if (totalWidth <= windowWidth) {
        slider.disable();

        list.css('justify-content', 'center');
        list.css('transform', 'translate3d(0px, 0px, 0px)');
        $('.navigation_cards_wrapper').css('display', 'none');
      } else {
        slider.enable();
        list.css('justify-content', 'flex-start');
        $('.navigation_cards_wrapper').css('display', 'flex');
      }
    };
    updateSlider();
    window.addEventListener('resize', debounce(updateSlider));
  });

  $('.swiper.is-testimonial-card').each(function (index, el) {
    const slider = new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 12,
      grabCursor: true,
      centeredSlides: true,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      freeMode: true,
      momentumBounce: false,
      momentumBounceRatio: 0.3,
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },

      // Responsive breakpoints
      breakpoints: {
        779: {
          slidesPerView: 1.4,
          spaceBetween: 30,
        },
      },
    });
  });

  $('.swiper.is-slider-blog').each(function (index, el) {
    let swiper;

    function initSwiper() {
      swiper = new Swiper(el, {
        slidesPerView: 1.2,
        spaceBetween: 16,
        grabCursor: true,
        mousewheel: {
          forceToAxis: true,
        },
        freeMode: true,
        momentumBounce: false,
        momentumBounceRatio: 0.3,
        breakpoints: {
          480: {
            spaceBetween: 32,
            slidesPerView: 2,
          },
          990: {
            spaceBetween: 32,
            slidesPerView: 3,
          },
        },
        navigation: {
          nextEl: '.swiper-next',
          prevEl: '.swiper-prev',
        },
        keyboard: {
          enabled: true,
          onlyInViewport: false,
        },
      });
    }
    initSwiper();

    $('.blog_field').click(function () {
      if ($(this).hasClass('is-reset')) {
        if ($(this).hasClass('active')) {
          $(this).removeClass('active');
        } else {
          $('.blog_field').removeClass('active');
          $(this).addClass('active');
        }
      } else {
        $('.blog_field').removeClass('active');
      }
      setTimeout(() => {
        swiper.destroy(true, false); // Détruit l'instance Swiper avec réinitialisation
        initSwiper();
        swiper.update();
      }, 300);
    });
  });

  $('.swiper.is-slider-keys').each(function (index, el) {
    const slider = new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 24,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
      },
      freeMode: true,
      momentumBounce: false,
      momentumBounceRatio: 0.3,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      breakpoints: {
        767: {
          spaceBetween: 40,
        },
      },
    });
    let media = window.matchMedia('(min-width: 90rem)');
    mediaSlider(media);
    media.addEventListener('change', mediaSlider);

    function mediaSlider(media) {
      if (media.matches) {
        slider.disable();
      } else {
        slider.enable();
      }
    }
  });

  $('.swiper.is-slider-audit').each(function (index, el) {
    const slides = $(this).find('.swiper-slide');

    gsap.set(slides, { scale: 0.9, opacity: 0.9 });
    gsap.set(slides[0], { scale: 1, opacity: 1 });

    const swiper = new Swiper(el, {
      slidesPerView: 1.5,
      spaceBetween: 20,
      grabCursor: true,
      centeredSlides: true,
      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      navigation: {
        nextEl: '.swiper-next',
        prevEl: '.swiper-prev',
      },
      breakpoints: {
        767: {
          spaceBetween: 72,
          slidesPerView: 'auto',
        },
      },
    });

    swiper.on('slideChange', function () {
      const { slides } = swiper;

      // Réinitialiser les styles pour toutes les diapositives
      gsap.to(slides, {
        scale: 0.9,
        opacity: 0.3,
        ease: 'power3.out',
        duration: 0.5,
      });

      // Mettre à jour les styles de la diapositive active
      gsap.to(slides[swiper.activeIndex], {
        scale: 1,
        opacity: 1,
        ease: 'power3.out',
        duration: 0.5,
      });
    });
  });

  /*   $('.swiper.is-slider-solutions').each(function (index, el) {
    const slider = new Swiper(el, {
      slidesPerView: 'auto',
      spaceBetween: 16,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
      },
      freeMode: true,
      momentumBounce: false,
      momentumBounceRatio: 0.3,
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      breakpoints: {
        767: {
          spaceBetween: 32,
        },
      },
    });
    let media = window.matchMedia('(min-width: 90rem)');
    mediaSlider(media);
    media.addEventListener('change', mediaSlider);

    function mediaSlider(media) {
      if (media.matches) {
        slider.disable();
      } else {
        slider.enable();
      }
    }
  });
 */
  /* $('.swiper.is-slider-teams').each(function (index, el) {
    const slider = new Swiper(el, {
      slidesPerView: 1,
      spaceBetween: 12,
      grabCursor: true,

      mousewheel: {
        forceToAxis: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: false,
      },
      freeMode: true,
      momentumBounce: false,
      momentumBounceRatio: 0.3,

      // Responsive breakpoints
      breakpoints: {
        375: {
          slidesPerView: 1.3,
          spaceBetween: 30,
        },
        479: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        779: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        // when window width is >= 640px
        1200: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      },
    });
  }); */
});
