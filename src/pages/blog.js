window.Webflow ||= [];
window.Webflow.push(() => {
  const tocWrapper = document.querySelector('.blogpost-toc_items-wrapper');

  document
    .getElementById('content')
    .querySelectorAll('h2')
    .forEach(function (heading, i) {
      // Assign a unique id to each heading
      heading.setAttribute('id', 'toc-' + i);

      // Generate slug for each heading
      let str = heading.innerHTML;
      str = str
        .replace(/\s+/g, '-')
        .replace(/[°&\/\\#,+()$~%.'":;*?<>{}-’]/g, '')
        .toLowerCase();
      heading.setAttribute('id', str);

      // Create TOC item
      const div = document.createElement('div');
      div.setAttribute('class', 'blogpost-toc_link-wrapper');
      const item = document.createElement('a');
      div.append(item);
      item.innerHTML = heading.innerHTML;
      item.setAttribute('class', 'blogpost-toc_link');
      item.setAttribute('href', '#' + str);
      document.querySelector('#toc').appendChild(div);

      ScrollTrigger.create({
        trigger: heading,
        start: 'top center',
        end: 'bottom center',

        onEnter: () => {
          document
            .querySelectorAll('.blogpost-toc_link')
            .forEach((link) => link.classList.remove('active'));
          item.classList.add('active');
          gsap.to(tocWrapper, {
            scrollTop: item.offsetTop - tocWrapper.offsetTop,
            duration: 0.5,
            ease: 'power2.inOut',
          });
        },
        onLeaveBack: () => {
          if (i > 0) {
            const prevItem = document.querySelectorAll('.blogpost-toc_link')[i - 1];
            prevItem.classList.add('active');
            gsap.to(tocWrapper, {
              scrollTop: prevItem.offsetTop - tocWrapper.offsetTop,
              duration: 0.5,
              ease: 'power2.inOut',
            });
          }
          item.classList.remove('active');
        },
      });
    });

  setTimeout(() => {
    $('.blogpost-toc_items-wrapper').each(function () {
      let title = $(this).find('.blogpost-toc_link');
      title.each(function (index) {
        $(this).text((i, oldText) => `${index + 1}. ${oldText}`);
      });
    });
  }, 100);

  $('.blogpost-relative_section').each(function () {
    let item = $(this).find('.blog-collection_item');
    if (item.length < 1) {
      $(this).remove();
    }
  });

  $('.blogpost_progress-wrapper').each(function () {
    let progressBar = $(this).find('.blogpost_progress-bar');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.blogpost_rich-text',
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
      },
    });
    tl.to(progressBar, {
      height: '100%',
      ease: 'none',
    });

    function handleLazyLoad(config = {}) {
      let lazyImages = gsap.utils.toArray("img[loading='lazy']"),
        timeout = gsap.delayedCall(config.timeout || 1, ScrollTrigger.refresh).pause(),
        lazyMode = config.lazy !== false,
        imgLoaded = lazyImages.length,
        onImgLoad = () =>
          lazyMode ? timeout.restart(true) : --imgLoaded || ScrollTrigger.refresh();
      lazyImages.forEach((img, i) => {
        lazyMode || (img.loading = 'eager');
        img.naturalWidth ? onImgLoad() : img.addEventListener('load', onImgLoad);
      });
    }
    // usage: you can optionally set lazy to false to change all images to load="eager". timeout is how many seconds it throttles the loading events that call ScrollTrigger.refresh()
    handleLazyLoad({ lazy: true, timeout: 1 });
  });
});
