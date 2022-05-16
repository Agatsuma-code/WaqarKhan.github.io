/*jQuery(document).ready(function () {
  jQuery('.skillbar').each(function () {
    jQuery(this).find('.skillbar-bar').animate({
      width: jQuery(this).attr('data-percent')
    }, 6000);
  });
});

jQuery('.Count').each(function () {
  var $this = $(this);
  jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
    duration: 6000,
    easing: 'swing',
    step: function () {
      $this.text(Math.ceil(this.Counter));
    }
  });
});*/

document.querySelector('.console').classList.add('hidden');

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)

    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Scrolls to an element with header offset
   */
  // const scrollto = (el) => {
  //   window.scrollTo({
  //     top: 0,
  //     behavior: 'smooth'
  //   })
  // }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })
  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '#navbar .nav-link', function (e) {
    let section = select(this.hash)
    if (section) {
      e.preventDefault()

      let navbar = select('#navbar')
      let header = select('#header')
      let sections = select('section', true)
      let navlinks = select('#navbar .nav-link', true)

      navlinks.forEach((item) => {
        item.classList.remove('active')
      })

      this.classList.add('active')

      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      if (this.hash == "#Console") {
        console.log("🚀 ~ file: main.js ~ line 97 ~ konsole.elem", konsole.elem)
        document.querySelector('.console').classList.remove('hidden');
        konsole.elem.focus();
      } else {
        document.querySelector('.console').classList.add('hidden');
        konsole.elem.html("");
        konsole.awaitKommand();

      }

      if (this.hash == '#header') {
        header.classList.remove('header-top')
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        return;
      }

      if (!header.classList.contains('header-top')) {
        header.classList.add('header-top')
        setTimeout(function () {
          sections.forEach((item) => {
            item.classList.remove('section-show')
          })
          section.classList.add('section-show')

        }, 350);
      } else {
        sections.forEach((item) => {
          item.classList.remove('section-show')
        })
        section.classList.add('section-show')
      }

      // scrollto(this.hash)
    }
  }, true)

  /**
   * Activate/show sections on load with hash links
   */
  // window.addEventListener('load', () => {
  //   if (window.location.hash) {
  //     let initial_nav = select(window.location.hash)

  //     if (initial_nav) {
  //       let header = select('#header')
  //       let navlinks = select('#navbar .nav-link', true)

  //       header.classList.add('header-top')

  //       navlinks.forEach((item) => {
  //         if (item.getAttribute('href') == window.location.hash) {
  //           item.classList.add('active')
  //         } else {
  //           item.classList.remove('active')
  //         }
  //       })

  //       setTimeout(function () {
  //         initial_nav.classList.add('section-show')
  //       }, 350);

  //       scrollto(window.location.hash)
  //     }
  //   }
  // });

  /**
   * Skills animation
   */
  // let skilsContent = select('.skills-content');
  // if (skilsContent) {
  //   new Waypoint({
  //     element: skilsContent,
  //     offset: '0%',
  //     handler: function (direction) {
  //       let progress = select('.progress .progress-bar', true);
  //       progress.forEach((el) => {
  //         el.style.width = el.getAttribute('aria-valuenow') + '%'
  //       });
  //     }
  //   })
  // }


  /**
   * Porfolio isotope and filter
   */
  // window.addEventListener('load', () => {
  //   let portfolioContainer = select('.tabs-container');
  //   if (portfolioContainer) {
  //     let portfolioIsotope = new Isotope(portfolioContainer, {
  //       itemSelector: '.tab-item',
  //       layoutMode: 'fitRows'
  //     });

  //     let portfolioFilters = select('#tabs-filters li', true);

  //     on('click', '#tabs-filters li', function (e) {
  //       e.preventDefault();
  //       portfolioFilters.forEach(function (el) {
  //         el.classList.remove('filter-active');
  //       });
  //       this.classList.add('filter-active');

  //       portfolioIsotope.arrange({
  //         filter: this.getAttribute('data-filter')
  //       });
  //     }, true);
  //   }

  // });

  /**
   * Initiate portfolio lightbox 
   */
  // const portfolioLightbox = GLightbox({
  //   selector: '.portfolio-lightbox'
  // });

  /**
   * Initiate portfolio details lightbox 
   */
  // const portfolioDetailsLightbox = GLightbox({
  //   selector: '.portfolio-details-lightbox',
  //   width: '90%',
  //   height: '90vh'
  // });

  /**
   * Portfolio details slider
   */
  // new Swiper('.portfolio-details-slider', {
  //   speed: 400,
  //   loop: true,
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   pagination: {
  //     el: '.swiper-pagination',
  //     type: 'bullets',
  //     clickable: true
  //   }
  // });

})()




// $("document").ready(function () {
//   $(".tab-item").hide();
//   $(".tab-item:first").show();
// });

// $(".tab-slider--nav li").click(function () {
//   $(".tab-item").hide();
//   var activeTab = $(this).attr("rel");
//   console.log(activeTab);
//   $("#" + activeTab).fadeIn();
//   if ($(this).attr("rel") == activeTab) {
//     $('.tab-slider--tabs').addClass('active');
//     console.log($('.tab-slider--tabs'));
//   } else {
//     $('.tab-slider--tabs').removeClass('active');
//   }
//   $(".tab-slider--nav li").removeClass("active");
//   $(this).addClass("active");
// });



$(document).ready(function () {

  (function ($) {
    $('.tab ul.tabs').addClass('active').find('> li:eq(0)').addClass('current');

    $('.tab ul.tabs li').click(function (g) {
      var tab = $(this).closest('.tab'),
        index = $(this).closest('li').index();

      tab.find('ul.tabs > li').removeClass('current');
      $(this).closest('li').addClass('current');

      tab.find('.tab_content').find('div.tabs_item').not('div.tabs_item:eq(' + index + ')').slideUp();
      tab.find('.tab_content').find('div.tabs_item:eq(' + index + ')').slideDown();

      g.preventDefault();
    });
  })(jQuery);

});


// $('.counts').each(function () {
//   $(this).prop('Counter', 0).animate({
//     Counter: $(this).text()
//   }, {
//     duration: 4000,
//     easing: 'swing',
//     step: function (now) {
//       $(this).text(Math.ceil(now));
//     }
//   });
// });