(function () {
  // Polyfill for NodeList.prototype.forEach() in IE
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  // Variables
  var nav = document.querySelector('.header__navigation');
  var langSwitcher = document.querySelector('.header__language-switcher');
  var search = document.querySelector('.header__search');
  var allToggles = document.querySelectorAll('.header--toggle');
  var navToggle = document.querySelector('.header__navigation--toggle');
  var langToggle = document.querySelector('.header__language-switcher--toggle');
  var searchToggle = document.querySelector('.header__search--toggle');
  var closeToggle = document.querySelector('.header__close--toggle');
  var allElements = document.querySelectorAll(
    '.header--element, .header--toggle'
  );
  var emailGlobalUnsub = document.querySelector('input[name="globalunsub"]');

  // Functions

  // Function for executing code on document ready
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  // Function for toggling mobile navigation
  function toggleNav() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    nav.classList.toggle('open');
    navToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for toggling mobile language selector
  function toggleLang() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    langSwitcher.classList.toggle('open');
    langToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // ---------- Append Language Switcher, Serach and Button -------- //

  function appendButtonMobile() {
    $('.au-lang-switcher').appendTo('.au-header .au-menu-toggler-wrap');
    $('.au-header--btn').appendTo('.au-header .menu--mobile');
    $('.au-header--search-wrapper').appendTo('.au-header .au-menu-toggler-wrap');
    setTimeout((function() {
      $(".au-header--btn").addClass("active");
      $(".au-lang-switcher").addClass("active");
      $(".au-header--search-wrapper").addClass("active");
    }), 100)
  }

  function appendButtonDesktop() {
    $('.au-header--search-wrapper').appendTo('.au-header__controls');
    $('.au-lang-switcher').appendTo('.au-header__controls');
    $('.au-header--btn').appendTo('.au-header__controls');
  }

  $(window).on('load',function() {
    if ($(window).width() < 992) {
      appendButtonMobile();
    }
  })

  var timeOutFunctionId;
  var countMobile = 0 , countDesktop = 0;

  $(window).on('resize', function () {
    if ($(window).width() < 992) {
      countDesktop = 0;
      if(countMobile==0) {
        clearTimeout(timeOutFunctionId);
        timeOutFunctionId = setTimeout(appendButtonMobile, 100);
      }
      countMobile+=1;
    } else {
      countMobile = 0;
      if(countDesktop==0) {
        clearTimeout(timeOutFunctionId);
        timeOutFunctionId = setTimeout(appendButtonDesktop, 100);
      }
      countDesktop+=1;
    }
  });

  $('.au-lang-switcher').click(function() {
    $('.au-header .au-lang-switcher .lang_list_class').toggleClass('active');
  });
  $('main').click(function(){
    $('.au-header .au-lang-switcher .lang_list_class').toggleClass('active');
    $('.au-header .au-lang-switcher').removeClass('au-lang-open');
  });

  // Function for toggling mobile search field
  function toggleSearch() {
    allToggles.forEach(function (toggle) {
      toggle.classList.toggle('hide');
    });

    search.classList.toggle('open');
    searchToggle.classList.toggle('open');

    closeToggle.classList.toggle('show');
  }

  // Function for the header close option on mobile
  function closeAll() {
    allElements.forEach(function (element) {
      element.classList.remove('hide', 'open');
    });

    closeToggle.classList.remove('show');
  }

  // Function to disable the other checkbox inputs on the email subscription system page template
  function toggleDisabled() {
    var emailSubItem = document.querySelectorAll('#email-prefs-form .item');

    emailSubItem.forEach(function (item) {
      var emailSubItemInput = item.querySelector('input');

      if (emailGlobalUnsub.checked) {
        item.classList.add('disabled');
        emailSubItemInput.setAttribute('disabled', 'disabled');
        emailSubItemInput.checked = false;
      } else {
        item.classList.remove('disabled');
        emailSubItemInput.removeAttribute('disabled');
      }
    });
  }

  // Execute JavaScript on document ready
  domReady(function () {
    if (!document.body) {
      return;
    } else {
      // Function dependent on language switcher
      if (langSwitcher) {
        langToggle.addEventListener('click', toggleLang);
      }

      // Function dependent on navigation
      if (navToggle) {
        navToggle.addEventListener('click', toggleNav);
      }

      // Function dependent on search field
      if (searchToggle) {
        searchToggle.addEventListener('click', toggleSearch);
      }

      // Function dependent on close toggle
      if (closeToggle) {
        closeToggle.addEventListener('click', closeAll);
      }

      // Function dependent on email unsubscribe from all input
      if (emailGlobalUnsub) {
        emailGlobalUnsub.addEventListener('change', toggleDisabled);
      }
    }

    AOS.init({
      // Global settings:
      once: true, // whether animation should happen only once - while scrolling down

    });
  });
})();

// header height
var height = $(".header").outerHeight();

// mobile menu top padding 
$(".au-header .menu--mobile").css("padding-top", height + 'px');

// sticky header
{% if theme.layout_setting.header.sticky_header.enable == true %}

$("#main-content").css("margin-top", height + 'px');

$(window).scroll(function(){
  if ($(this).scrollTop() > 80) {
    $('.au-sticky-header').addClass('au-sticky');
  } else {
    $('.au-sticky-header').removeClass('au-sticky');
  }
});
{% endif %}
// end-of sticky header

// header on-top-scroll
{% if theme.layout_setting.header.header_on_top_scroll.enable_scroll == true %}
if (window.matchMedia('(min-width: 767px)').matches) {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('header').outerHeight();


  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var st = $(this).scrollTop();
    if(Math.abs(lastScrollTop - st) <= delta)
      return;
    if (st > lastScrollTop && st > navbarHeight){
      $('.header').removeClass('au-nav-down').addClass('au-nav-up');
      $(".au-nav-up").css("top", '-' + (height + 4) + 'px');
    } else {
      if(st + $(window).height() < $(document).height()) {
        $('.header').removeClass('au-nav-up').addClass('au-nav-down');
        $(".au-on-scroll").css("top", "0");
      }
    }
    lastScrollTop = st;
  }

  $("#main-content").css("margin-top", height + 'px');
}
{% endif %}

// side-bar menu
$('.au-side-bar .menu .menu__wrapper .menu__item--has-submenu').click(function() {
  $(this).toggleClass('au-side-bar-menu-active');
});

// Blog Tag
$('.au-blog__action-tag .au-button').click(function() {
  $(this).siblings('.au-blog__action-tag-list').toggleClass('active');
});

// Scroll-to-top
$('.au-scroll-to-top__btn').click(function() {
  $('html, body').animate({ scrollTop: 0 }, 'slow');
  return false;
});

var scrollTop = $('.scrollTop');

$(window).scroll(function() {

  // declare variable
  var topPos = $(this).scrollTop();

  // if user scrolls down - show scroll to top button
  if (topPos > 100) {
    $('.au-scroll-to-top__btn').css('opacity', '1');

  } else {
    $('.au-scroll-to-top__btn').css('opacity', '0');
  }

}); 
// scroll END

// end of Scroll-to-top

jQuery(window).on('load',function(){
    // Website Animation 
      AOS.init({
        once: true, // whether animation should happen only once - while scrolling down
      });
  });
