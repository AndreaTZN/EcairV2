import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { Reeller } from 'reeller';

Reeller.registerGSAP(gsap);
gsap.registerPlugin(ScrollTrigger, Flip, SplitText);

window.Webflow ||= [];
window.Webflow.push(() => {
  let mm = gsap.matchMedia();

  $('.feature_line').each(function (index, el) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
      },
    });

    tl.from(el, {
      width: 0,
      duration: 2,
      ease: 'power4.out',
    });
  });

  $('.joins_illu').each(function (index, el) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
      },
    });

    tl.set(el, {
      willChange: 'transform',
    });
    tl.from(el, {
      scale: 0.3,
      rotate: 0,
      duration: 2,
      ease: 'power4.out',
    });
  });

  $('.feature_image').each(function (index, el) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top center',
      },
    });

    tl.set(el, {
      willChange: 'transform',
    });
    tl.from(el, {
      scale: 1.2,
      duration: 2,
      ease: 'power4.out',
    });
  });

  $('.collection_partenaires').each(function () {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.partenaires_components',
        start: 'top 80%',
      },
    });

    tl.to('.collection_partenaires', {
      opacity: 1,
      ease: 'power3.inOut',
      stagger: {
        amount: 0.5,
      },
    });
  });

  $('.timeline_component').each(function () {
    const el = $(this);
    const steps = $('.progress_step');
    const timelineItems = el.find('.timeline_item');
    const childTargets = el.find('.timeline-left_content-wrap');

    function makeItemActive(index) {
      childTargets.removeClass('is-active');
      childTargets.eq(index).addClass('is-active');
    }

    timelineItems.each(function (index, timelineItem) {
      ScrollTrigger.create({
        trigger: timelineItem,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          if (index > 0) {
            $(timelineItem).addClass('active');
            steps.text(index + 1);
          }
        },
        onLeaveBack: () => {
          if (index > 0) {
            $(timelineItem).removeClass('active');
          }
        },
        onToggle: (isActive) => {
          if (isActive) {
            makeItemActive(index);
            steps.text(index + 1);
          }
        },
      });
    });

    makeItemActive(0);

    let progressbar = el.find('.timeline_progress_bar');

    // Desktop
    mm.add('(min-width: 767px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
        },
      });

      // Sélectionnez l'élément approprié en fonction de la page
      let timelineElement;
      if ($('.timeline-center_step').length) {
        timelineElement = $('.timeline-center_step');
      } else if ($('.timeline_step-wrapper').length) {
        timelineElement = $('.timeline_step-wrapper');
        // Ajoutez ici les animations spécifiques à la page avec l'élément .timeline_step-wrapper
      }
      tl.set(progressbar, {
        willChange: 'height',
        height: '0%',
      });

      tl.to(
        progressbar,
        {
          height: '101%',
          ease: 'none',
        },
        'start'
      ).to(
        timelineElement,
        {
          top: () => {
            let heightTimeline = $('.timeline_center').height();
            let height = heightTimeline - 10;
            return height + 'px';
          },
          ease: 'none',
        },
        'start'
      );
    });
    mm.add('(max-width: 767px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.timeline_progress-wrapper-mobile',
          start: 'top center',
          end: 'bottom center',
          invalidateOnRefresh: true,
          scrub: 0.5,
          normalizeScroll: true,
        },
      });
      tl.to(progressbar, {
        height: '100%',
        ease: 'none',
      });
    });
  });

  $('.sommaire_section').each(function () {
    let hamburgerEl = $(this).find('.sommaire_hamburger_wrap');

    let navLineEl = $(this).find('.sommaire_hamburger_line');
    let menuContainEl = $(this).find('.sommaire_menu_contain');
    let flipItemEl = $(this).find('.sommaire_hamburger_base');
    let menuWrapEl = $(this).find('.sommaire_menu');
    let triggerCloseEl = $(this).find('.sommaire_trigger_close');
    let menuLinkEl = $(this).find('.sommaire_menu_container');

    let flipDuration = 0.4;

    let tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.legale-hero_wrapper',
        start: 'clamp(center center)',
        scrub: true,
      },
    });
    tl2.to('.sommaire_wrapper', {
      top: '8rem',
    });

    function flip(forwards) {
      let state = Flip.getState(flipItemEl);
      if (forwards) {
        flipItemEl.appendTo(menuContainEl);
      } else {
        flipItemEl.appendTo(hamburgerEl);
      }
      Flip.from(state, { duration: flipDuration });
    }

    let tl = gsap.timeline({ paused: true });
    tl.set(triggerCloseEl, { display: 'flex' });
    tl.set(menuWrapEl, { display: 'flex' });
    tl.from(menuWrapEl, {
      opacity: 1,
      duration: flipDuration,
      ease: 'none',
      onStart: () => {
        flip(true);
      },
    });

    tl.to(navLineEl.eq(0), { y: 6, rotate: 45, duration: flipDuration }, '<');
    tl.to(navLineEl.eq(2), { y: -6, rotate: -45, duration: flipDuration }, '<');
    tl.to(navLineEl.eq(1), { opacity: 0, duration: flipDuration }, '<');
    tl.from(menuLinkEl, {
      opacity: 0,
      duration: 0.2,

      onReverseComplete: () => {
        flip(false);
      },
    });

    function openMenu(open) {
      if (!tl.isActive()) {
        if (open) {
          hamburgerEl.addClass('nav-open');

          tl.play();
        } else {
          tl.reverse();
          hamburgerEl.removeClass('nav-open');
        }
      }
    }

    hamburgerEl.on('click', function () {
      if ($(this).hasClass('nav-open')) {
        openMenu(false);
      } else {
        openMenu(true);
      }
    });

    triggerCloseEl.on('mouseenter', function () {
      openMenu(false);
    });
    triggerCloseEl.on('click', function () {
      openMenu(false);
    });

    $(document).on('keydown', function (e) {
      if (e.key === 'Escape') {
        openMenu(false);
      }
    });
  });

  $('.nav2_container').each(function () {
    const showAnim = gsap
      .from('.nav_component', {
        yPercent: -100,
        paused: true,
        duration: 0,
      })
      .progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 'max',
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });

    ScrollTrigger.create({
      trigger: $('body'),
      start: '12px top',
      onEnter: () => {
        $('.nav2_container').addClass('active');
        $('.nav2_container').css('opacity', '1');
      },
      onLeaveBack: () => {
        $('.nav2_container').removeClass('active');
      },
    });
  });

  $('.partners_logo-wrapper').each(() => {
    const reeller = new Reeller({
      container: '.partenaires_reel',
      wrapper: '.partenaires_reel_wrap',
      itemSelector: '.partenaires_reel_item',
      speed: 20,
    });
  });

  $('.home-tab_component').each(function () {
    let tabItem = $(this).find('.home-tab_link');
    let button = $(this).find('.auto-tabs_pause-btn');
    let itemDuration = 10;

    // create infinitely looping timeline
    let tl = gsap.timeline({
      repeat: -1,
      defaults: {
        ease: 'none',
      },
      paused: true,
      scrollTrigger: {
        trigger: this,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) {
            tl.resume();
          } else {
            tl.pause();
          }
        },
      },
    });

    function tabLoop(trigger) {
      let $next = trigger.next();
      if ($next.length) {
        $next.click();
      } else {
        $('.home-tab_link:first').click();
      }
    }
    // add a step to the timeline for each cms item
    tabItem.each(function (index) {
      tl.addLabel(`step${index}`);

      // animate the progress bar inside this item
      tl.to($(this).find('.home-tab_loader-bar'), {
        width: '100%',
        duration: itemDuration,
        onComplete: () => {
          tabLoop($(this));
        },
      });
      tl.to(
        $('.home-tab_loader-bar'),
        {
          width: '0%',
          duration: 0,
        },
        '<'
      );

      $(this).on('click', function () {
        tl.seek(`step${index}`);
      });
    });

    /*     button.on('click', function () {
      let clicks = $(this).data('clicks');
      if (clicks) {
        tl.resume();
      } else {
        tl.pause();
      }
      $(this).data('clicks', !clicks);
    }); */
  });

  $('.body_home').each(function () {
    let title = $(this).find('.heading-style-h1');
    let buttonGroupe = $(this).find('.button-center');
    let avis = $(this).find('.home_hero_avis-wrap');
    let card = $(this).find('.home-card_component');

    let split = new SplitText(title, { type: 'lines' });

    let tl = gsap.timeline();
    gsap.set(title, { opacity: 1 });
    gsap.set(buttonGroupe, { opacity: 1 });
    gsap.set(avis, { opacity: 1 });
    gsap.set(card, { opacity: 1 });

    tl.from(split.lines, {
      duration: 0.6,
      y: 30,
      autoAlpha: 0,
      stagger: 0.2,
    });
    tl.from(
      buttonGroupe,
      {
        y: '20px',
        duration: 1,
        opacity: 0,
      },
      '-=0.5'
    );
    tl.from(
      avis,
      {
        y: '20px',
        duration: 1,
        opacity: 0,
      },
      '-=0.5'
    );
    tl.from(
      card,
      {
        y: '50px',
        scale: 0.95,
        duration: 2,
        opacity: 0,
        ease: 'power4.out',
      },
      '-=0.5'
    );
  });

  $('.home-card_section').each(function () {
    let card = $(this).find('.home_card-key');
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: this,
        start: 'top center',
      },
    });
    tl.from([card], {
      scale: 0,
      duration: 2,
      ease: 'power4.out',
      delay: (i) => i * 0.1,
    });
  });

  $('[data-tab]').each(function () {
    const activeSelect = $(this).find('.tab_active')[0];
    const tabs = $(this).find('.tab-link');

    tabs.each((index, tab) => {
      tab.addEventListener('click', () => {
        // Obtenir l'état initial de l'élément
        const initialState = Flip.getState(activeSelect);

        // Ajouter l'élément au conteneur parent (tab)
        tab.appendChild(activeSelect);

        // Obtenir l'état final de l'élément
        const finalState = Flip.getState(activeSelect);

        Flip.fromTo(initialState, finalState, {
          duration: 0.6,
          ease: 'power2.inOut',
          scale: true,
          absolute: false,
        });
      });
    });
  });

  $('.audit-component').each(function () {
    let cards = $(this).find('.audit-card');
    cards = Array.from(cards).reverse();

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: this,
        start: 'top center',
        end: 'bottom center',
      },
    });
    tl.to(cards, {
      rotate: (i) => (cards.length - i - 1) * 3,

      stagger: 0.2,
      duration: 1,
      ease: 'power4.out',
    });
    tl.from(
      cards,
      {
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: 'power4.out',
      },
      '<'
    );
  });

  $('.faq_item').each(function () {
    let answer = $(this).find('.faq_answer');
    let spacer = $(this).find('.faq-spacer');
    let line1 = $(this).find('.faq-header_icon.is-1');
    let line2 = $(this).find('.faq-header_icon.is-2');

    const tl = gsap.timeline({ paused: true });

    tl.to(
      answer,
      {
        height: 'auto',
        duration: 0.6,
        ease: 'power2.inOut',
      },
      'start'
    )
      .to(
        spacer,
        {
          height: '2rem',
          duration: 0.6,
          ease: 'power2.inOut',
        },
        'start'
      )
      .to(
        line1,
        {
          rotate: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        'start'
      )
      .to(
        line2,
        {
          rotate: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        'start'
      );

    let isPlaying = false;
    $(this).on('click', () => {
      if (isPlaying) {
        tl.reverse();
        isPlaying = false;
      } else {
        tl.play();
        isPlaying = true;
      }
    });
  });
});
