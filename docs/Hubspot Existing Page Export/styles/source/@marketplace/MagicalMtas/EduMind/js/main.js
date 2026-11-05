(function (window, document, $, undefined) {
    'use strict';
  

/* Common Variables */
const backdrop = document.querySelector('.backdrop');

/* Get Siblings Function */
const getSiblings = function (e) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    if(!e.parentNode) { return siblings; }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};
  

/* Slide Up Function */
const slideUp = (target, duration=500) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    window.setTimeout( () => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}
/* Slide Down Function */
const slideDown = (target, duration=500) => {
    target.style.removeProperty('display');
    let display = window.getComputedStyle(target).display;
    if (display === 'none') display = 'block';
    target.style.display = display;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    window.setTimeout( () => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}
/* Slide Toggle Function */
const slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === 'none') {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
}

  
/* Header Sticky */
const stickyHeader = document.querySelector('.header-sticky');
function headerStickyFunction() {
    if (window.scrollY > 550) {
        stickyHeader.classList.add('is-sticky');
    } else {
        stickyHeader.classList.remove('is-sticky');
    }
}

  
/* Offcanvas Submenu Open Close */
const offcanvasSubMenuToggle = document.querySelectorAll('.offcanvas-sub-menu-toggle');
offcanvasSubMenuToggle.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        const siblingsSubmenu = this.nextElementSibling;
        if(this.classList.contains('active')) {
            this.classList.remove('active');
            slideUp(siblingsSubmenu);
            siblingsSubmenu.querySelectorAll('.offcanvas-sub-menu').forEach(function(subMenu) {
                slideUp(subMenu);
                subMenu.previousElementSibling.classList.remove('active');
            });
        } else {
            this.classList.add('active');
            slideDown(siblingsSubmenu);
            getSiblings(this.closest('li')).forEach(function(li) {
                li.querySelectorAll('.offcanvas-sub-menu').forEach(function(subMenu) {
                    slideUp(subMenu);
                    subMenu.previousElementSibling.classList.remove('active');
                });
            });
        }
    });
});

/* Header Offcanvas */
const headerOffCanvas = document.querySelector('.header-offcanvas'),
    headerOffCanvasOpen = document.querySelector('.header-offcanvas-open'),
    headerOffCanvasClose = document.querySelector('.header-offcanvas-close');
if(headerOffCanvasOpen) {
headerOffCanvasOpen.addEventListener('click', function(e) {
    headerOffCanvas.classList.add('active');
    backdrop.classList.add('active');
});
}
if(headerOffCanvasClose) {
headerOffCanvasClose.addEventListener('click', function() {
    headerOffCanvas.classList.remove('active');
    backdrop.classList.remove('active');
});
}


/*--------- svg img inject -----------*/
var mySVGsToInject = document.querySelectorAll('img.inject-me');
SVGInjector(mySVGsToInject); 


 /*--------- moving_parallax -----------*/
 var sceneElements = document.querySelectorAll('.moving_parallax');
 var parallaxScenes = [];
 for (var i = 0; i < sceneElements.length; i++) {
     parallaxScenes.push(new Parallax(sceneElements[i]));
 }
  
  
/* ----------------------------
		Odometer Activation 
    -------------------------------*/
	if( $('.odometer').length ){
		var elemOffset = $('.odometer').offset().top;
		var winHeight = $(window).height();
		if(elemOffset < winHeight){
			$('.odometer').each(function(){
				$(this).html($(this).data('count-to'));
			});
		}
		$(window).on('scroll', function(){
			var elemOffset = $('.odometer').offset().top;
			function winScrollPosition() {
				var scrollPos = $(window).scrollTop(),
					winHeight = $(window).height();
				var scrollPosition = Math.round(scrollPos + (winHeight / 1.2));
				return scrollPosition;
			}
			if ( elemOffset < winScrollPosition()) {
				$('.odometer').each(function(){
					$(this).html($(this).data('count-to'));
				});
			}	
		});
	};
  
  
/* ----------------------------
		Testimonial Activation 
-------------------------------*/
  const swiperTestimonial2 = new Swiper('.swiper-testimonial-slider-wrapper', {
    loop: true,
    speed: 500,
    slidesPerView: 1,
    centeredSlides: true,
    effect: 'coverflow',
    grabCursor: true,
    autoplay: false,
    autoplay: {
      delay: 35000000
    },
    breakpoints: {
      575: {
        slidesPerView: 2
      }
    },
    coverflowEffect: {
      rotate: 0,
      slideShadows: false,
      depth: 180,
      stretch: 110
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });
  
  /* Video Popup */
new VenoBox({
    selector: '.video-popup, .gallery-popup',
    autoplay: true,
    maxWidth: '1000px'
});

  
/* Scroll Event */
window.addEventListener('scroll', function () {
    headerStickyFunction()
});

/* Resize Event */
window.addEventListener('resize', function() {
});
    
})(window, document, jQuery);