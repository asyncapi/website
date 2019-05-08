(function($){
  "use strict";

  var $window = $(window);

  $window.on('load', function() {
    // Preloader
    $('.loader').fadeOut();
    $('.loader-mask').delay(350).fadeOut('slow');
    initOwlCarousel();

    $window.trigger("resize");
  });


  $window.resize(function(){
    stickyNavRemove();
  });


  /* Detect Browser Size
  -------------------------------------------------------*/
  var minWidth;
  if (Modernizr.mq('(min-width: 0px)')) {
    // Browsers that support media queries
    minWidth = function (width) {
      return Modernizr.mq('(min-width: ' + width + 'px)');
    };
  }
  else {
    // Fallback for browsers that does not support media queries
    minWidth = function (width) {
      return $window.width() >= width;
    };
  }

  /* Mobile Detect
  -------------------------------------------------------*/
  if (/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera)) {
    $("html").addClass("mobile");
  }
  else {
    $("html").removeClass("mobile");
  }

  /* IE Detect
  -------------------------------------------------------*/
  if(Function('/*@cc_on return document.documentMode===10@*/')()){ $("html").addClass("ie"); }



  /* Sticky Navigation
  -------------------------------------------------------*/
  $window.scroll(function(){

    scrollToTop();
    var $navHolder = $('.nav__holder');

    if ($window.scrollTop() > 10 & minWidth(992)) {
      $navHolder.addClass('nav__holder--sticky');
    } else {
      $navHolder.removeClass('nav__holder--sticky');
    }
    
  });


  function stickyNavRemove() {
    var $navHolder = $('.nav__holder');
    if (!minWidth(992)) {
      $navHolder.removeClass('nav--sticky');
    } else {
      $navHolder.addClass('nav--sticky');
    }
  }
  

  /* Mobile Navigation
  -------------------------------------------------------*/
  $('.nav__dropdown-trigger').on('click', function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
    }
    else {
      $(this).addClass("active");
    }
  });  

  if ( $('html').hasClass('mobile') ) {
    $('body').on('click',function() {
      $('.nav__dropdown-menu').addClass('hide-dropdown');
    });

    $('.nav__dropdown').on('click', '> a', function(e) {
      e.preventDefault();
    });

    $('.nav__dropdown').on('click',function(e) {
      e.stopPropagation();
      $('.nav__dropdown-menu').removeClass('hide-dropdown');
    });
  }


  /* Material Inputs
  -------------------------------------------------------*/
  (function() {
    var $optinInput = $('.optin__input');
    $optinInput.on('blur', function() {
      if ( $(this).val() ) {
        $(this).parent('.optin__form-group').addClass('optin__form-group--active');
      } else {
        $(this).parent('.optin__form-group').removeClass('optin__form-group--active');
      }
    });
  })();

  /* Owl Carousel
  -------------------------------------------------------*/
  function initOwlCarousel(){

    /* Testimonials
    -------------------------------------------------------*/
    $("#owl-testimonials").owlCarousel({      
      center: false,
      items: 1,
      loop: true,
      nav: true,
      dots: false,
      margin: 40,
      lazyLoad: true,
      navSpeed: 500,
      navText: ['<i class="ui-arrow-left">','<i class="ui-arrow-right">'],
      responsive:{
        1200: {
          items:2
        },
        768:{
          items:2
        },
        540:{
          items:1
        }
      }
    })
  }


  /* Accordion
  -------------------------------------------------------*/
  var $accordion = $('.accordion');
  function toggleChevron(e) {
    $(e.target)
      .prev('.accordion__heading')
      .find("a")
      .toggleClass('accordion--is-open accordion--is-closed');
  }
  $accordion.on('hide.bs.collapse', toggleChevron);
  $accordion.on('show.bs.collapse', toggleChevron);


  /* Tabs
  -------------------------------------------------------*/
  $('.tabs__trigger').on('click', function(e) {
    var currentAttrValue = $(this).attr('href');
    $('.tabs__content-trigger ' + currentAttrValue).stop().fadeIn(1000).siblings().hide();
    $(this).parent('li').addClass('tabs__item--active').siblings().removeClass('tabs__item--active');
    e.preventDefault();
  });


  /* Sticky Socials
  -------------------------------------------------------*/
  (function() {
    var $stickyCol = $('.sticky-col');
    if($stickyCol) {
      $stickyCol.stick_in_parent({
        offset_top: 100
      });
    }
  })();


  /* Scroll to Top
  -------------------------------------------------------*/
  function scrollToTop() {
    var scroll = $window.scrollTop();
    var $backToTop = $("#back-to-top");
    if (scroll >= 50) {
      $backToTop.addClass("show");
    } else {
      $backToTop.removeClass("show");
    }
  }

  $('a[href="#top"]').on('click',function(){
    $('html, body').animate({scrollTop: 0}, 1350, "easeInOutQuint");
    return false;
  });

})(jQuery);