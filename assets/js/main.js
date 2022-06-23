
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
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
    // $('#Console').classList.add('hidden');
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
        // console.log("🚀 ~ file: main.js ~ line 97 ~ konsole.elem", konsole.elem)
        document.querySelector('.console').classList.remove('hidden');
        // konsole.print("If you don't know how to use it, please type \"help\" to find out commands.")
        // konsoleSettings.konsoleHelpMsg()
        konsole.print("If you don't know how to use it, please type \"help\" to find out commands.'Mobile Not Supported'")
        konsole.awaitKommand();
        konsole.elem.focus();
      } else {
        document.querySelector('.console').classList.add('hidden');
        konsole.elem.html("");
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

  new Swiper('.testimonials-swiper', {
    // slidesPerView: 1,
    // spaceBetween: 30,
    // loop: true,
    // rewind: true,
    effect: "coverflow",
    mousewheel: true,
    keyboard: {
      enabled: true,
    },
    // freeMode:true,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      // type: "progressbar",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  $(".projects").sliphover();
})()

// About Tabs 
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
// Sending EMail

const form = document.querySelector('.contact_form');
function success() {
  swal({
    title: "Good job!",
    text: "Successfully Sent Message!",
    icon: "success"
  });
}
function error() {
  swal({
    title: "Please Try Again!",
    text: "Something Went wrong!",
    icon: "success"
  });
}
function sendEmail() {
  emailjs.init("jZodjXjZwfNf2QSco");
  var params = {
    userName: $('.userName').val(),
    userEmail: $('.sender').val(),
    subject: $('.senderSubject').val(),
    message: $('.message').val()
  }
  form.reset();
  emailjs.send("service_wjphzpa", "template_iwtvq1f", params).then(function (res) {
    if (res.status == '200') {
      success()
    } else {
      error()
    }
  })
}

// Directional Overlay
// $(".portfolio").sliphover();
