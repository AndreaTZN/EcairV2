import SplitType from 'split-type';

window.Webflow ||= [];
window.Webflow.push(() => {
  // ================================================
  // HOME PAGE
  // ================================================

  $('.homeb2b_hero-wrap').each(function (index) {
    let title = $(this).find('.headingb2b-style-h1');
    let subtitle = $(this).find('.homeb2b_hero-text-wrapper');
    let button = $(this).find('.button-group');
    let illu = $(this).find('.homeb2b_hero-illu');
    let tl = gsap.timeline();

    let typeSplit = new SplitType(title, {
      types: 'lines,words',
      tagName: 'span',
    });

    tl.to($(this), { opacity: 1 });
    tl.from(
      title,
      {
        yPercent: 10,
        duration: 1,
        ease: 'power3.out',
      },
      '<'
    );
    tl.from(
      subtitle,
      {
        yPercent: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      },
      '<'
    );
    tl.from(
      button,
      {
        yPercent: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      },
      '<'
    );
    tl.from(
      illu,
      {
        xPercent: 10,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      },
      '<'
    );
  });

  $('.homeb2b-propos_section').each(function () {
    let el = $(this);

    let illu = el.find('.homeb2b-propos_illu');
    let illuImage = illu.find('img');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: illu,
        start: 'top 80%',
      },
    });
    gsap.set(illu, { opacity: 0 });
    tl.to([illu], { opacity: 1, duration: 0.3, ease: 'none', stagger: 0.2 });
    tl.from(illuImage, { scale: 1.4, duration: 1.3, ease: 'power2.out' }, '-=1');
  });

  $('.fonctionnementb2b_component').each(function (index) {
    // get elements
    let component = $(this);
    let lists = component.find("[data-el='list']");
    let content = component.find('.fonctionnementb2b-content_list');
    let illu = component.find('.fonctionnementb2b-illu_list');
    let itemTotal = lists.first().children().length;

    let typeSplit = new SplitType('[text-split]', {
      types: 'lines,words',
      tagName: 'span',
    });

    // create trigger divs & spacer
    let firstTrigger = component.find("[data-el='trigger']").first();
    for (let i = 1; i < itemTotal; i++) {
      firstTrigger.clone().appendTo(component);
    }
    let triggers = component.find("[data-el='trigger']");
    firstTrigger.css('margin-top', '-100vh');
    let trSpacer = $("<div style='width: 100%; height: 70vh;'></div>").hide().appendTo(component);

    const makeItemActive = (activeIndex) => {
      lists.each(function () {
        component.find("[data-el='number']").text(activeIndex + 1);
        $(this).children().removeClass('is-active');
        $(this).children().eq(activeIndex).addClass('is-active');
      });
    };

    // main breakpoint
    gsap.matchMedia().add('(min-width:768px)', () => {
      // show spacer
      trSpacer.show();
      makeItemActive(0);

      // triggers timeline
      triggers.each(function (index) {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top 30%',
            end: 'bottom 30%',
            scrub: true,
            onToggle: ({ self, isActive }) => {
              if (isActive) {
                makeItemActive(index);
              }
            },
          },
          defaults: {
            ease: 'none',
          },
        });
        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: $(this),
            start: 'top 30%',
            end: 'bottom 30%',
            onEnter: function (self) {
              if (self.isActive) {
                // Replay the animation
                tl2.restart();
              }
            },

            onEnterBack: function (self) {
              const isLastTrigger = index === triggers.length - 1;

              if (!isLastTrigger) {
                // Replay the animation
                tl2.restart();
              }
            },
            onLeave: function (self) {
              if (self.isActive) {
                // Replay the animation
                tl2.restart();
              }
            },
            onLeaveBack: function (self) {
              const isFirstTrigger = index === 0;
              if (isFirstTrigger) {
                tl2.reverse();
              }
              if (self.isActive) {
                // Replay the animation
                tl2.restart();
              }
            },
          },
        });
        content.each(function () {
          const childItem = $(this).find('.fonctionnementb2b-content_item').eq(index);

          tl2
            .from(childItem.find('.fonctionnementb2b_text-wrapper'), {
              yPercent: 50,
              duration: 0.6,
              ease: 'power3.inOut',
              opacity: 0,
            })
            .from(
              childItem.find('[text-split]').find('.word'),
              {
                yPercent: 100,
                duration: 1,
                ease: 'power3.out',
                stagger: { amount: 0.2 },
              },
              '<'
            )
            .from(
              childItem.find('.fonctionnementb2b_number-wrapper'),
              {
                yPercent: 50,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.inOut',
              },
              '<'
            )
            .from(
              childItem.find('.fonctionnementb2b_number'),
              {
                yPercent: 100,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.inOut',
              },
              '<'
            );
        });
        illu.each(function () {
          const childItem = $(this).find('.fonctionnementb2b-illu_item').eq(index);

          tl2.from(
            childItem.find('img'),
            {
              yPercent: 10,
              duration: 0.6,
              ease: 'power3.inOut',
              opacity: 0,
            },
            '<'
          );
        });
      });
      // component timeline
      /*    let tl = gsap.timeline({
        scrollTrigger: {
          trigger: component,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
        defaults: {
          ease: 'none',
        },
      }); */

      // smaller screen sizes
      return () => {
        trSpacer.hide();
        lists.each(function (index) {
          $(this).children().removeClass('is-active');
        });
      };
    });
    gsap.matchMedia().add('(max-width:767px)', () => {
      $('.fonctionnementb2b-content_item').each(function (index) {
        $(this)
          .find("[data-el='number']")
          .each(function () {
            $(this).text(index + 1);
          });
      });
    });
  });

  $('.teamsb2b_component').each(function (index) {
    let component = $(this);

    let items = component.find('.teamsb2b-desktop_overview');
    let itemsHeight = items.height();
    let contentheight = $(this).find('.teamsb2b_overview').height();
    let totalHeight = itemsHeight - contentheight;

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
      },
    });
    tl.to(items, { y: -totalHeight, duration: 1 });
  });

  $('.tabb2b_component').each(function (index) {
    let buttonLink = $(this).find('.tabb2b_link');
    let buttonTab = $(this).find('.tabb2b_button');
    let buttonTabSVG = $(this).find('.tabb2b_button svg');

    gsap.to(buttonTabSVG.last(), { display: 'none', opacity: 0, scale: 0 });

    buttonTab.on('click', function () {
      let el = $(this);
      let tabIndex = buttonTab.index(this);
      buttonLink.eq(tabIndex).trigger('click');
      el.addClass('is-active');
      buttonTab.not(el).removeClass('is-active');
      gsap.to(buttonTabSVG.not(el.find('svg')), {
        display: 'none',
        scale: 0,
        opacity: 0,
        duration: 0,
      });
      gsap.to(el.find('svg'), {
        display: 'block',
        scale: 1,
        opacity: 1,
        duration: 0.3,
      });
    });
  });

  $('.homeb2b_tabs').each(function () {
    let tabInterval;

    function tabLoop() {
      let current = $('.homeb2b-tabs_menu-link.w--current');
      let next = current.next();
      if (!next || !next.hasClass('homeb2b-tabs_menu-link')) {
        next = $('.homeb2b-tabs_menu-link:first-child');
      }
      next.click();
    }

    function startTabRotation() {
      if (!tabInterval) {
        tabInterval = setInterval(tabLoop, 5000);
      }
    }
    function stopTabRotation() {
      clearInterval(tabInterval);
      tabInterval = null;
    }

    function setFirstTabCurrent() {
      let firstTab = $('.homeb2b-tabs_menu-link:first-child');
      if (!firstTab.hasClass('w--current')) {
        firstTab.click();
      }
    }

    // Initialisation
    $('.homeb2b-tabs_menu-link').on('click', function (event) {
      clearInterval(tabInterval);
      tabInterval = setInterval(tabLoop, 5000);
    });

    ScrollTrigger.create({
      trigger: $(this),
      start: 'top bottom',
      onEnter: () => {
        setFirstTabCurrent();
        startTabRotation();
      },
      onLeave: () => {
        stopTabRotation();
      },
      onEnterBack: () => {
        startTabRotation();
      },
    });
  });

  $('.tic_component').each(function (index) {
    let square = $(this).find('.tic_square');
    let text = $(this).find('div')[1];

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: $(this),
        start: 'top 80%',
      },
    });
    gsap.set(square, { scale: 0 });
    gsap.set(text, { opacity: 0, x: -10 });
    tl.to(square, { scale: 1, duration: 0.5 });
    tl.to(text, { opacity: 1, x: 0, duration: 0.8 }, '-=0.3');
  });

  // ================================================
  // ABOUT PAGE
  // ================================================

  $('.about-logo_sectionb2b').each(function (index) {
    let el = $(this);
    let logos = el.find('.featuresb2b_invests-illu-wrap');
    let logo = logos.find('.featuresb2b_invests-illu');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
      },
    });

    tl.fromTo(logo, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2 });
  });

  $('.b2b_text-wrap').each(function (index) {
    let el = $(this);
    let paragraphs = el.find('p');

    paragraphs.each(function (index, el) {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
        },
      });

      tl.fromTo(el, { opacity: 0.2 }, { opacity: 1, duration: 1 });
    });
  });

  $('.usagesb2b_component').each(function () {
    const $component = $(this);
    const $items = $component.find('.usagesb2b_item');

    $items.each(function () {
      const $item = $(this);

      ScrollTrigger.create({
        trigger: $item,
        start: 'top 80%',
        end: 'bottom top',

        toggleClass: {
          targets: $item,
          className: 'active',
        },
      });
    });
  });
});
