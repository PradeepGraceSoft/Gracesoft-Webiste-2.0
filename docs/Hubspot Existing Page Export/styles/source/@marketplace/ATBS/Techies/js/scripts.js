var ATBSTEAM = ATBSTEAM || {};

(function($){

    // USE STRICT
    "use strict";

    var $window = $(window);
    var $document = $(document);
    var $goToTopEl = $('.js-go-top-el');
    
    ATBSTEAM.header = {

        init: function(){
            ATBSTEAM.header.smartAffix.init({
                fixedHeader: '.js-sticky-header',
                headerPlaceHolder: '.js-sticky-header-holder',
            });
            ATBSTEAM.header.priorityNavInit();
        },

        /* ============================================================================
         * Prority+ menu init
         * ==========================================================================*/
        priorityNavInit: function() {
            var $menus = $('.js-priority-nav');
            $menus.each(function() {
                ATBSTEAM.priorityNav($(this));
            })
        },

        /* ============================================================================
         * Smart sticky header
         * ==========================================================================*/
        smartAffix: {
            //settings
            $headerPlaceHolder: null, //the affix menu (this element will get the mdAffixed)
            $fixedHeader: null, //the menu wrapper / placeholder
            isDestroyed: false,
            isDisabled: false,
            isFixed: false, //the current state of the menu, true if the menu is affix
            isShown: false,
            windowScrollTop: 0, 
            lastWindowScrollTop: 0, //last scrollTop position, used to calculate the scroll direction
            offCheckpoint: 0, // distance from top where fixed header will be hidden
            onCheckpoint: 0, // distance from top where fixed header can show up
            breakpoint: 0, // media breakpoint in px that it will be disabled

            init : function init (options) {

                //read the settings
                this.$fixedHeader = $(options.fixedHeader);
                this.$headerPlaceHolder = $(options.headerPlaceHolder);

                // Check if selectors exist.
                if ( !this.$fixedHeader.length || !this.$headerPlaceHolder.length ) {
                    this.isDestroyed = true;
                } else if ( !this.$fixedHeader.length || !this.$headerPlaceHolder.length || ( ATBSTEAM.documentOnResize.windowWidth <= ATBSTEAM.header.smartAffix.breakpoint ) ) { // Check if device width is smaller than breakpoint.
                    this.isDisabled = true;
                }

            },// end init

            compute: function compute(){
                if (ATBSTEAM.header.smartAffix.isDestroyed || ATBSTEAM.header.smartAffix.isDisabled) {
                    return;
                }

                // Set where from top fixed header starts showing up
                if( !this.$headerPlaceHolder.length ) {
                    this.offCheckpoint = 400;
                } else {
                    this.offCheckpoint = $(this.$headerPlaceHolder).offset().top + 400;
                }
                
                this.onCheckpoint = this.offCheckpoint + 500;

                // Set menu top offset
                this.windowScrollTop = ATBSTEAM.documentOnScroll.windowScrollTop;
                if (this.offCheckpoint < this.windowScrollTop) {
                    this.isFixed = true;
                }
            },

             updateState: function updateState() {

                //update affixed state
                if (this.isFixed) {
                    if(this.$fixedHeader.length) {
                        this.$fixedHeader.addClass('is-fixed');
                    }
                } else {
                    if(this.$fixedHeader.length) {
                        this.$fixedHeader.removeClass('is-fixed');
                    }
                    $window.trigger('stickyHeaderHidden');
                }

                if (this.isShown) {
                    if(this.$fixedHeader.length) {
                        this.$fixedHeader.addClass('is-shown');
                    }
                } else {
                    if(this.$fixedHeader.length) {
                        this.$fixedHeader.removeClass('is-shown');
                    }
                }

            },

            /**
             * called by events on scroll
             */
            eventScroll: function eventScroll(scrollTop) {

                var scrollDirection = '';
                var scrollDelta = 0;

                // check the direction
                if (scrollTop != this.lastWindowScrollTop) { //compute direction only if we have different last scroll top

                    // compute the direction of the scroll
                    if (scrollTop > this.lastWindowScrollTop) {
                        scrollDirection = 'down';
                    } else {
                        scrollDirection = 'up';
                    }

                    //calculate the scroll delta
                    scrollDelta = Math.abs(scrollTop - this.lastWindowScrollTop);
                    this.lastWindowScrollTop = scrollTop;

                    // update affix state
                    if (this.offCheckpoint < scrollTop) {
                        this.isFixed = true;
                    } else {
                        this.isFixed = false;
                    }
                    
                    // check affix state
                    if (this.isFixed) {
                        // We're in affixed state, let's do some check
                        if ((scrollDirection === 'down') && (scrollDelta > 14)) {
                            if (this.isShown) {
                                this.isShown = false; // hide menu
                            }
                        } else {
                            if ((!this.isShown) && (scrollDelta > 14) && (this.onCheckpoint < scrollTop)) {
                                this.isShown = true; // show menu
                            }
                        }
                    } else {
                        this.isShown = false;
                    }

                    this.updateState(); // update state
                }
            }, // end eventScroll function

            /**
            * called by events on resize
            */
            eventResize: function eventResize(windowWidth) {
                // Check if device width is smaller than breakpoint.
                if ( ATBSTEAM.documentOnResize.windowWidth < ATBSTEAM.header.smartAffix.breakpoint ) {
                    this.isDisabled = true;
                } else {
                    this.isDisabled = false;
                    ATBSTEAM.header.smartAffix.compute();
                }
            }
        },

    };

    ATBSTEAM.documentOnScroll = {
        ticking: false,
        windowScrollTop: 0, //used to store the scrollTop

        init: function() {
            window.addEventListener('scroll', function(e) {
                if (!ATBSTEAM.documentOnScroll.ticking) {
                    window.requestAnimationFrame(function() {
                        ATBSTEAM.documentOnScroll.windowScrollTop = $window.scrollTop();

                        // Functions to call here
                        if (!ATBSTEAM.header.smartAffix.isDisabled && !ATBSTEAM.header.smartAffix.isDestroyed) {
                            ATBSTEAM.header.smartAffix.eventScroll(ATBSTEAM.documentOnScroll.windowScrollTop);
                        }

                        ATBSTEAM.documentOnScroll.goToTopScroll(ATBSTEAM.documentOnScroll.windowScrollTop);

                        ATBSTEAM.documentOnScroll.ticking = false;
                    });
                }
                ATBSTEAM.documentOnScroll.ticking = true;
            });
        },

        /* ============================================================================
         * Go to top scroll event
         * ==========================================================================*/
        goToTopScroll: function(windowScrollTop){
            if ($goToTopEl.length) {
                if(windowScrollTop > 800) {
                    if (!$goToTopEl.hasClass('is-active')) $goToTopEl.addClass('is-active');
                } else {
                    $goToTopEl.removeClass('is-active');
                }
            }
        },
    };

    ATBSTEAM.documentOnResize = {
        ticking: false,
        windowWidth: $window.width(),

        init: function() {
            window.addEventListener('resize', function(e) {
                if (!ATBSTEAM.documentOnResize.ticking) {
                    window.requestAnimationFrame(function() {
                        ATBSTEAM.documentOnResize.windowWidth = $window.width();

                        // Functions to call here
                        if (!ATBSTEAM.header.smartAffix.isDestroyed) {
                            ATBSTEAM.header.smartAffix.eventResize(ATBSTEAM.documentOnResize.windowWidth);
                        }

                        ATBSTEAM.documentOnResize.ticking = false;
                    });
                }
                ATBSTEAM.documentOnResize.ticking = true;
            });
        },
    };

    ATBSTEAM.documentOnReady = {

        init: function(){
            ATBSTEAM.header.init();
            ATBSTEAM.header.smartAffix.compute();
            ATBSTEAM.documentOnScroll.init();
            ATBSTEAM.documentOnReady.searchToggle();
            ATBSTEAM.documentOnReady.load_more_post();
            ATBSTEAM.documentOnReady.go_to_top();
            ATBSTEAM.documentOnReady.atbs_scrolltop_default();
            ATBSTEAM.documentOnReady.mouseMove();
            ATBSTEAM.documentOnReady.atbs_accordionButton();
            ATBSTEAM.documentOnReady.lazyLoadBackground();
            ATBSTEAM.documentOnReady.quickTabContent();
            ATBSTEAM.documentOnReady.ATBSNavDetectEdgeBrowser();
            ATBSTEAM.documentOnReady.counterNumberScroll();
            ATBSTEAM.documentOnReady.languageOffcanvas();
            ATBSTEAM.documentOnReady.detectElementHidden();
            ATBSTEAM.documentOnReady.sticky_header_standard();
            ATBSTEAM.documentOnReady.offCanvasMenu();
            ATBSTEAM.documentOnReady.atbs_theme_switch();
            ATBSTEAM.documentOnReady.atbs_more_theme();
        },
        atbs_more_theme: function () {
            var btn_direction = $('.btn-fixed-more');
            btn_direction.each(function () {
                var btnClose = $(this).find('.btn-remove-direction');
                btnClose.on('click',function (e) {
                    e.preventDefault();
                    $(this).parents('.btn-fixed-more').remove();
                })
            })
        },
        
        atbs_theme_switch: function () {
            var theme_penal_localStorage = [];
            var btn_popup = $('.atbs-theme-btn-show');
            var theme_mode = $('.atbs-theme-switch');
            var theme_penal = $('.site-wrapper');

            $(btn_popup).each(function () {
                $(this).on('click',function () {
                    $(this).parent().toggleClass("active");
                });
            });


            $(function () {
                /*Setup Default Dark Mode*/
                if($(theme_penal).hasClass('enable-dark-mode')) {
                    var theme_mode_status = {};
                    theme_mode_status.status = 'on';
                    addModeStatus(theme_mode_status);
                }

                if (localStorage.theme_penal_localStorage) {
                    theme_penal_localStorage = JSON.parse(localStorage.theme_penal_localStorage);
                    load_data();
                }
            });
            theme_mode.each(function () {
                $(this).on('click',function () {
                    $(this).toggleClass("is-active");
                    var theme_mode_status = {};
                    theme_mode_status.status = 'on';
                    addModeStatus(theme_mode_status);
                });

            });
            function load_data() {
                var status = theme_penal_localStorage[0];
                if (status["Status"] == 'on') {
                    $(theme_penal).addClass('atbs-dark-mode');
                    $(theme_mode).addClass("is-active");
                }
            }
            function addModeStatus(theme_mode_status) {
                var status = theme_mode_status.status;
                var item = {Status : status};
                theme_penal_localStorage.push(item);
                saveStatus();
                if(theme_penal_localStorage.length >= 2) {
                    localStorage.removeItem("theme_penal_localStorage");
                    theme_penal_localStorage = [];
                }
            }
            function saveStatus() {
                if (window.localStorage) {
                    localStorage.theme_penal_localStorage = JSON.stringify(theme_penal_localStorage);
                    $(theme_penal).toggleClass('atbs-dark-mode');
                }
            }
        },

        /* ============================================================================
         * Offcanvas Menu
         * ==========================================================================*/
        offCanvasMenu: function() {
            var $backdrop = $('<div class="atbs-offcanvas-backdrop"></div>');
            var $offCanvas = $('.js-atbs-offcanvas');
            var $offCanvasToggle = $('.js-atbs-offcanvas-toggle');
            var $offCanvasClose = $('.js-atbs-offcanvas-close');
            var $offCanvasMenuHasChildren = $('.navigation--offcanvas').find('li.hs-item-has-children > a');
            var menuExpander = ('<div class="submenu-toggle"><svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 0L0 0.999997L4.99999 6L10 1.00002L9 2.05676e-05L5.00001 3.99999L1 0Z" fill="white"/></svg></div>');

            $($offCanvasMenuHasChildren).removeAttr('aria-haspopup aria-expanded href');


            $backdrop.on('click', function(){
                $offCanvas.removeClass('is-active');
                $(this).fadeOut(200, function(){
                    $(this).detach();
                });
            });

            $offCanvasToggle.on('click', function(e){
                e.preventDefault();
                var targetID = $(this).attr('href');
                var $target = $(targetID);
                $target.toggleClass('is-active');
                $backdrop.hide().appendTo('.site-wrapper').fadeIn(200);
            });

            $offCanvasClose.on('click', function(e){
                e.preventDefault();
                var targetID = $(this).attr('href');
                var $target = $(targetID);
                $target.removeClass('is-active');
                $backdrop.fadeOut(200, function(){
                    $(this).detach();
                });
            });

            $offCanvasMenuHasChildren.append(function() {
                return $(menuExpander).on('click', function(e){
                    e.preventDefault();
                    var $subMenu = $(this).parent().siblings('.hs-menu-children-wrapper');

                    $subMenu.slideToggle(200);
                });
            });

            $(window).on('resize',function (e) {
                var checkExist = setInterval(function() {
                    var elementPC = $('#atbs-offcanvas-primary');
                    var elementMB = $('#atbs-offcanvas-mobile');
                    if(elementPC.hasClass('is-active') ){
                        var checkDisplay = elementPC.css('display');
                        if(checkDisplay == 'none' ){
                            $backdrop.css('display','none');
                            clearInterval(checkExist);
                        }
                    }
                    if(elementMB.hasClass('is-active')) {
                        var checkDisplay = elementMB.css('display');
                        if( checkDisplay == 'none'){
                            $backdrop.css('display','none');
                            clearInterval(checkExist);
                        }
                    }
                    if(elementPC.hasClass('is-active')  && elementPC.css('display') != 'none' || elementMB.hasClass('is-active')  && elementMB.css('display') != 'none'){
                        $backdrop.css('display','block');
                        clearInterval(checkExist);
                    }
                    clearInterval(checkExist);
                }, 100); // check every 100ms
            });
        },
        sticky_header_standard: function(){
            window.addEventListener('scroll', function(e) {
                var headerSticky = $('.atbs-js-sticky-header-standard');
                var header = $('.site-header');
                var headerHeiht = $(header).outerHeight();
                if( $(window).scrollTop() > headerHeiht ){
                    headerSticky.each( function() { 
                        headerSticky.addClass('is-show');
                    });
                }
                else {
                    headerSticky.each( function() { 
                        headerSticky.removeClass('is-show');
                    });
                }
            });
        },
        detectElementHidden: function () {
          var element  = $('.init-display-none');
          var elementw  = $('.init-opacity');
          element.each(function (){
             element.removeClass('init-display-none');
          });
          elementw.each(function (){
             elementw.removeClass('init-opacity');
          });
        },
        counterNumberScroll: function () {
            var counterElement = document.querySelectorAll(".counter-element");
            const speed = 200;
            var lazyloadThrottleTimeout;
            lazyload();
            function lazyload () {
                if(lazyloadThrottleTimeout) {
                    clearTimeout(lazyloadThrottleTimeout);
                }

                lazyloadThrottleTimeout = setTimeout(function() {
                    var scrollTop = window.scrollY;

                    counterElement.forEach( counter => {
                        if(counter.getBoundingClientRect().top + window.scrollY < (window.innerHeight + scrollTop)) {
                            const animate = () => {
                                const value = +counter.getAttribute('counterNumber');
                                const data = +counter.innerText;

                                const time = value / speed;
                                if(data < value) {
                                    counter.innerText = Math.ceil(data + time);
                                    setTimeout(animate, 15);
                                }else{
                                    counter.innerText = value;
                                }
                            }

                            animate();
                        }
                    });
                    if(counterElement.length == 0) {
                        document.removeEventListener("scroll", lazyload);
                        window.removeEventListener("resize", lazyload);
                        window.removeEventListener("orientationChange", lazyload);
                    }
                }, 20);
            }

            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        },
        languageOffcanvas: function () {
            var languageWrapper = $('.globe_class');
            languageWrapper.each(function () {
                var el = $(this);
                $(this).prepend('<span class="toggle-languages">Language</span>');
                var languageButton = $(this).find('.toggle-languages');

                var checkExist = setInterval(function () {
                    languageButton = el.find('.toggle-languages');

                    clearInterval(checkExist);

                });
                $(languageButton).on('click',function () {
                    var languagePanel = $(this).parents('.dropdown-language__wrapper').find('.lang_list_class');
                    languagePanel.slideToggle(200);
                });



            });
        },
        ATBSNavDetectEdgeBrowser: function(){
            $(".atbs-menu-header ul li").on('mouseenter mouseleave', function (e) {
                if ($('ul', this).length) {
                    var elm = $('ul:first', this);
                    var off = elm.offset();
                    var l = off.left;
                    var w = elm.width();
                    var docW = $(".site-wrapper").width();
                    var isEntirelyVisible = (l + w <= docW);

                    if (!isEntirelyVisible) {
                        $(this).addClass('atbs-submenu-to-left');
                    } else {
                    }

                    if(l<0) {
                        $(this).addClass('atbs-submenu-to-right');
                    } else {
                    }
                }
            });
        },
        atbs_accordionButton :function() {
            var accordion = $('.atbs-accordion');
            $(accordion).each(function () {
                var item_current = $(this);
                $(this).find('.atbs-accordion-btn').on('click',function () {
                    $('.atbs-accordion-btn').removeClass("active");
                    $('.atbs-accordion-panel').removeClass("active");
                    $('.atbs-accordion-panel').css('max-height', 0);
                    var accordion_btn =  $(this).toggleClass('active');
                    var accordion_panel = accordion_btn.parents('.atbs-accordion').find('.atbs-accordion-panel');
                    accordion_panel.toggleClass("active");
                    if (parseInt(accordion_panel.css('max-height')) ) {
                        accordion_panel.css('max-height', 0);
                        accordion_panel.removeClass("active");
                        accordion_btn.removeClass("active");
                    } else {
                        accordion_panel.css('max-height', $(accordion_panel).get(0).scrollHeight + 'px');
                    }
                });
                $(window).on('resize', $.debounce(250, function (e) {
                    var accordion_panel = item_current.find('.atbs-accordion-panel');
                    if ($(accordion_panel).hasClass('active')) {
                        accordion_panel.css('max-height', $(accordion_panel).get(0).scrollHeight + 'px');
                    }

                }));
            });
        },
        lazyLoadBackground: function () {
            var lazyloadThrottleTimeout;
            var disableLazy = $('.atbs-disable-lazy-load');
            lazyload();
            function lazyload () {
                if(lazyloadThrottleTimeout) {
                    clearTimeout(lazyloadThrottleTimeout);
                }

                lazyloadThrottleTimeout = setTimeout(function() {
                    var lazyloadImages = document.querySelectorAll(".atbs-img-lazy");
                    var scrollTop = window.scrollY;
                    lazyloadImages.forEach(function(img) {
                        if( ( (disableLazy.length == 0) && (img.getBoundingClientRect().top + window.scrollY < (window.innerHeight + scrollTop)) ) || disableLazy.length > 0 ) {
                            img.setAttribute("style","background-image: url('"+ img.dataset.src +"'); opacity: 1");
                            img.classList.remove('atbs-img-lazy');
                        }
                    });
                    if(lazyloadImages.length == 0) {
                        document.removeEventListener("scroll", lazyload);
                        window.removeEventListener("resize", lazyload);
                        window.removeEventListener("orientationChange", lazyload);
                    }
                }, 20);
            }

            document.addEventListener("scroll", lazyload);
            window.addEventListener("resize", lazyload);
            window.addEventListener("orientationChange", lazyload);
        },
        quickTabContent: function () {
          var tabButton = $('.tab-heading');
          var tabPanel = $('.tab-content');
          tabButton.each(function () {
              $(this).on('click',function () {
                  tabPanel.removeClass("active");
                  tabButton.removeClass("active");

                  $(this).addClass('active');
                  $('.tab-content[data-tab-id="'+  $(this).data('toggle-tab') +'"]').addClass("active");
              });
          });
        },
        atbs_scrolltop_default: function () {
            var el = $(".scroll-default");
            el.each(function () {
                var data_scroll = $(this).data('scroll');
                $(this).scrollTop(data_scroll);
            });
        },
        mouseMove:function() {
            setTimeout(function(){
                var parent_element = $(".js-mouse-move");
                parent_element.each(function() {
                    var $this = this;
                    $(this).mousemove(function (e) {
                        var element = $(this).find(".element-move");
                        var parent = $this.getBoundingClientRect();
                        var x = e.clientX - parent.left;
                        var y = e.clientY - parent.top;
                        $(element).css({
                            "left":x,
                            "top":y
                        });
                    });
                    $(this).on("mouseleave",function(e){
                        var remove = $(this).find(".element-move");
                        $(remove).removeAttr("style");
                    });
                })
            },50);
        },
        go_to_top: function() {
            var $gototop = $(".js-go-top-el");
            $gototop.each(function(){
                $(this).click(function() {
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                    return false;
                })
            })
        },
        load_more_post: function() {
            $(".js-ajax-load-post-trigger").on('click', function (e) {
                var moduleID = $(this).closest('.atbs-block');
                var number = $(moduleID).find(".posts-list").attr('data-number');

                e.preventDefault();
                var listItem = $(moduleID).find('.item-hidden:hidden');
                $(listItem).slice(0, number).fadeIn(1500);
                if ($(".item-hidden:hidden").length == 0) {
                  $(".js-ajax-load-post-trigger").fadeOut('slow');
                  $('.men_magazine-no-more-button').removeClass('hidden');
                }
            });
        },
        /* ============================================================================
        * js search
        * ==========================================================================*/
        searchToggle: function() {
            var $headerSearchDropdown = $('#header-search-dropdown');
            var $searchDropdownToggle = $('.js-search-dropdown-toggle');
            var $mobileHeader = $('#atbs-mobile-header');
            var $stickyHeaderNav = $('#atbs-sticky-header').find('.navigation-bar__inner');
            var $staticHeaderNav = $('.site-header').find('.navigation-bar__inner');
            var $headerSearchDropdownInput = $headerSearchDropdown.find('.search-form__input');

            $headerSearchDropdown.on('click', function(e) {
                e.stopPropagation();
            });

            $searchDropdownToggle.on('click', function(e) {
                e.stopPropagation();
                var $toggleBtn = $(this);
                var position = '';


                if ($toggleBtn.hasClass('mobile-header-btn')) {
                    position = 'mobile';
                } else if ($toggleBtn.parents('.sticky-header').length) {
                    position = 'sticky';
                } else {
                    position = 'navbar';
                }

                if ($headerSearchDropdown.hasClass('is-in-' + position) || !$headerSearchDropdown.hasClass('is-active')) {
                    $headerSearchDropdown.toggleClass('is-active');
                }

                switch(position) {
                    case 'mobile':
                        if (!$headerSearchDropdown.hasClass('is-in-mobile')) {
                            $headerSearchDropdown.addClass('is-in-mobile');
                            $headerSearchDropdown.removeClass('is-in-sticky');
                            $headerSearchDropdown.removeClass('is-in-navbar');
                            $headerSearchDropdown.appendTo($mobileHeader);
                        }
                        break;

                    case 'sticky':
                        if (!$headerSearchDropdown.hasClass('is-in-sticky')) {
                            $headerSearchDropdown.addClass('is-in-sticky');
                            $headerSearchDropdown.removeClass('is-in-mobile');
                            $headerSearchDropdown.removeClass('is-in-navbar');
                            $headerSearchDropdown.insertAfter($stickyHeaderNav);
                        }
                        break;

                    default:
                        if (!$headerSearchDropdown.hasClass('is-in-navbar')) {
                            $headerSearchDropdown.addClass('is-in-navbar');
                            $headerSearchDropdown.removeClass('is-in-sticky');
                            $headerSearchDropdown.removeClass('is-in-mobile');
                            $headerSearchDropdown.insertAfter($staticHeaderNav);
                        }
                }

                if ($headerSearchDropdown.hasClass('is-active')) {
                    setTimeout(function () {
                        $headerSearchDropdownInput.focus();
                    }, 200);
                }
            });

            $document.on('click', function(event) {
                switch (event.which) {
                    case 1:
                        $headerSearchDropdown.removeClass('is-active');
                        break;
                    default:
                        break;
                }
            });

            $window.on('stickyHeaderHidden', function(){
                if ($headerSearchDropdown.hasClass('is-in-sticky')) {
                    $headerSearchDropdown.removeClass('is-active');
                }
            });
        },

        /* ============================================================================
         * Sticky sidebar
         * ==========================================================================*/
        stickySidebar: function() {
            setTimeout(function() {
                var $stickySidebar = $('.js-sticky-sidebar');
                var $stickyHeader = $('.js-sticky-header');

                var marginTop = ($stickyHeader.length) ? ($stickyHeader.outerHeight() + 20) : 0; // check if there's sticky header
                if ( $.isFunction($.fn.theiaStickySidebar) ) {
                    $stickySidebar.theiaStickySidebar({
                        additionalMarginTop: marginTop,
                        additionalMarginBottom: 20,
                    });
                }
            }, 250); // wait a bit for precise height;
        },

        /* ============================================================================
         * Sticky Sidebar HubSpot Initial
         * ==========================================================================*/
        stickySidebar_init: function() {
            var theWidget = '';
            var checkExist = setInterval(function() {
                theWidget = $( '.atbs-widget-wrap-level-1' );
                if ($(theWidget).length) {
                    if (theWidget[0].closest('.js-sticky-sidebar')) {
                      return;
                    }
                    var theSidebarCol = theWidget[0].closest('.dnd-column');
                    $(theSidebarCol).addClass('js-sticky-sidebar');
                    if ( $.isFunction($.fn.theiaStickySidebar) ) {
                        $(theSidebarCol).theiaStickySidebar({
                            additionalMarginTop: 20,
                            additionalMarginBottom: 20,
                        });
                    }
                    clearInterval(checkExist);
                }
            }, 200); // check every 200ms
        },
    };

    ATBSTEAM.documentOnLoad = {

        init: function() {
            ATBSTEAM.header.smartAffix.compute(); //recompute when all the page + logos are loaded
            ATBSTEAM.header.smartAffix.updateState(); // update state
            ATBSTEAM.documentOnReady.stickySidebar();
            ATBSTEAM.documentOnReady.stickySidebar_init();
        }

    };

    /* ============================================================================
     * Priority+ menu
     * ==========================================================================*/
    ATBSTEAM.priorityNav = function($menu) {
        var $btn = $menu.find('button');
        var $menuWrap = $menu.find('.hs-menu-wrapper > ul');
        var $menuItem = $menuWrap.children('li');
        var hasMore = false;

        if(!$menuWrap.length) {
            return;
        }

        function calcWidth() {
            $($menu).parent().removeClass('atbs-toshow');
            $($menu).removeClass('atbs-toshow');
            if ($menuWrap[0].getBoundingClientRect().width === 0)
                return;

            var navWidth = 0;

            $menuItem = $menuWrap.children('li');
            $menuItem.each(function() {
                navWidth += $(this)[0].getBoundingClientRect().width;
            });

            if (hasMore) {
                var $more = $menu.find('.priority-nav__more');
                var moreWidth = $more[0].getBoundingClientRect().width;
                var availableSpace = $menu[0].getBoundingClientRect().width;

                //Remove the padding width (assumming padding are px values)
                availableSpace -= (parseInt($menu.css("padding-left"), 10) + parseInt($menu.css("padding-right"), 10));
                //Remove the border width
                availableSpace -= ($menu.outerWidth(false) - $menu.innerWidth());

                if (navWidth > availableSpace) {
                    var $menuItems = $menuWrap.children('li:not(.priority-nav__more)');
                    var itemsToHideCount = 1;

                    $($menuItems.get().reverse()).each(function(index){
                        navWidth -= $(this)[0].getBoundingClientRect().width;
                        if (navWidth > availableSpace) {
                            itemsToHideCount++;
                        } else {
                            return false;
                        }
                    });

                    var $itemsToHide = $menuWrap.children('li:not(.priority-nav__more)').slice(-itemsToHideCount);

                    $itemsToHide.each(function(index){
                        $(this).attr('data-width', $(this)[0].getBoundingClientRect().width);
                    });

                    $itemsToHide.prependTo($more.children('ul'));
                } else {
                    var $moreItems = $more.children('ul').children('li');
                    var itemsToShowCount = 0;

                    if ($moreItems.length === 1) { // if there's only 1 item in "More" dropdown
                        if (availableSpace >= (navWidth - moreWidth + $moreItems.first().data('width'))) {
                            itemsToShowCount = 1;
                        }
                    } else {
                        $moreItems.each(function(index){
                            navWidth += $(this).data('width');
                            if (navWidth <= availableSpace) {
                                itemsToShowCount++;
                            } else {
                                return false;
                            }
                        });
                    }

                    if (itemsToShowCount > 0) {
                        var $itemsToShow = $moreItems.slice(0, itemsToShowCount);

                        $itemsToShow.insertBefore($menuWrap.children('.priority-nav__more'));
                        $moreItems = $more.children('ul').children('li');

                        if ($moreItems.length <= 0) {
                            $more.remove();
                            hasMore = false;
                        }
                    }
                }
            } else {
                var $more = $('<li class="priority-nav__more"><a href="#"><span>More <svg width="4" height="16" viewBox="0 0 4 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2Z" fill="#222222"/><path d="M4 8C4 9.10457 3.10457 10 2 10C0.89543 10 0 9.10457 0 8C0 6.89543 0.89543 6 2 6C3.10457 6 4 6.89543 4 8Z" fill="#222222"/><path d="M4 14C4 15.1046 3.10457 16 2 16C0.89543 16 0 15.1046 0 14C0 12.8954 0.89543 12 2 12C3.10457 12 4 12.8954 4 14Z" fill="#222222"/></svg></span></a><ul class="hs-menu-children-wrapper"></ul></li>');
                var availableSpace = $menu[0].getBoundingClientRect().width;


                //Remove the padding width (assumming padding are px values)
                //Remove the border width
                availableSpace -= ($menu.outerWidth(false) - $menu.innerWidth());

                if (navWidth > availableSpace) {
                    var $menuItems = $menuWrap.children('li');
                    var itemsToHideCount = 2;

                    $($menuItems.get().reverse()).each(function(index){
                        navWidth -= $(this)[0].getBoundingClientRect().width;
                        if (navWidth > availableSpace) {
                            itemsToHideCount++;
                        } else {
                            return false;
                        }
                    });

                    var $itemsToHide = $menuWrap.children('li:not(.priority-nav__more)').slice(-itemsToHideCount);

                    $itemsToHide.each(function(index){
                        $(this).attr('data-width', $(this)[0].getBoundingClientRect().width);
                    });

                    $itemsToHide.prependTo($more.children('ul'));
                    $more.appendTo($menuWrap);
                    hasMore = true;
                }
            }
            $($menu).parent().addClass('atbs-toshow');
            $($menu).addClass('atbs-toshow');
        }

        $window.on('load webfontLoaded', calcWidth );
        $window.on('resize', $.throttle( 50, calcWidth ));
    }

    $document.ready( ATBSTEAM.documentOnReady.init );
    $window.on('load', ATBSTEAM.documentOnLoad.init );
    $window.on( 'resize', ATBSTEAM.documentOnResize.init );

})(jQuery);