// Init act obj

if(act == null) {var act = {};}

act.v = 40;
act.t = "{{ get_asset_url('../theme.json') }}";

// Safari class

if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
  document.body.classList.add('is-safari');
}

// Tooltip

{% include './_popper.min.js' %}

const tooltip = document.querySelectorAll('.ttip');
for (i = 0; i < tooltip.length; i++) {
  const tooltip_holder = tooltip[i].closest('.ttip-holder');
  const placement = tooltip[i].getAttribute('data-popper-placement');  
  let fallback = [];
  if (tooltip[i].hasAttribute('data-popper-fallback')) {
    fallback = tooltip[i].getAttribute('data-popper-fallback').split(',');
  }
  Popper.createPopper(tooltip_holder, tooltip[i], {
    placement: placement,
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: fallback,
          rootBoundary: 'document'
        }
      },
      {
        name: 'preventOverflow',
        options: {
          mainAxis: false,
          altAxis: false
        }
      }
    ]
  });
}

(function() {  
  const listeners = [];
  let observer = null;
  function check() {
    for (let i = 0; i < listeners.length; i++) {
      let listener = listeners[i];
      let elements = document.querySelectorAll(listener.selector);
      for (let j = 0; j < elements.length; j++) {
        let element = elements[j];
        if (!element.ready) {
          element.ready = true;
          listener.fn.call(element, element);
        }
      }
    }
  }
  act.initialize = function (selector, fn) {
    listeners.push({
      selector: selector,
      fn: fn
    });
    if (!observer) {
      observer = new MutationObserver(check);
      observer.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
    check();
  }
})();

act.debounce = function(fn, delay) {
  var timer = null;
  return function() {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn.apply(context, args);
    }, delay);
  };
};

act.throttle = function(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(function() {inThrottle = false}, limit);
    }
  }
}

act.ishover = function(e) {
  return (e.parentElement.querySelector(':hover') === e);
}

act.isfocus = function(e) {
  return (e.parentElement.querySelector(':focus') === e);
}

act.isfocuswithin = function(e) {
  return (e.parentElement.querySelector(':focus-within') === e);
}

// Siblings

act.getsiblings = function(e) {
  let siblings = []; 
  if(!e.parentNode) {
    return siblings;
  }
  let sibling  = e.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== e) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

act.getOffsetTop = function(e) {
  let offsetTop = 0;
  while(e) {
    offsetTop += e.offsetTop;
    e = e.offsetParent;
  }
  return offsetTop;
}

// Swipe
// http://www.javascriptkit.com/javatutors/touchevents2.shtml

act.swipedetect = function(el, callback) {
  let touchsurface = el,
      swipedir,
      startX,
      startY,
      distX,
      distY,
      threshold = 50, //required min distance traveled to be considered swipe (150)
      restraint = 100, // maximum distance allowed at the same time in perpendicular direction (100)
      allowedTime = 300, // maximum time allowed to travel that distance (300)
      elapsedTime,
      startTime,
      handleswipe = callback || function(swipedir){}

  touchsurface.addEventListener('touchstart', function(e) {
      var touchobj = e.changedTouches[0]
      swipedir = 'none'
      dist = 0
      startX = touchobj.pageX
      startY = touchobj.pageY
      startTime = new Date().getTime() // record time when finger first makes contact with surface
      // e.preventDefault()
      e.stopImmediatePropagation();
  }, false)

  touchsurface.addEventListener('touchmove', function(e){
      // e.preventDefault() // prevent scrolling when inside DIV
      e.stopImmediatePropagation();
  }, false)

  touchsurface.addEventListener('touchend', function(e){
      var touchobj = e.changedTouches[0]
      distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime // get time elapsed
      if (elapsedTime <= allowedTime){ // first condition for awipe met
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
              swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
          }
          else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
              swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
          }
      }
      handleswipe(swipedir)
      // e.preventDefault()
      e.stopImmediatePropagation();
  }, false)
}

//USAGE:
/*
var el = document.getElementById('someel')
act.swipedetect(el, function(swipedir){
  swipedir contains either "none", "left", "right", "top", or "down"
  if (swipedir =='left') {
    // Swiped left! 
  }
})
*/

// Sticky header

{% if theme.components.header.sticky_header %}
const header_sticky_element = document.querySelector('.header__sticky-element');
if (header_sticky_element) {
  const header_sticky = document.querySelector('.header--sticky');
  const header_sticky_prop = header_sticky.getBoundingClientRect();
  ['resize', 'scroll', 'load'].forEach(function(event_type) {
    window.addEventListener(event_type, function() {
      if (window.pageYOffset > header_sticky_prop.height) {
        header_sticky.style.height = header_sticky_prop.height + 'px';
        header_sticky.classList.add('header--sticky-active');
        header_sticky.classList.remove('header--sticky-inactive');
      }
      else {
        if (header_sticky.classList.contains('header--sticky-active')) {
          header_sticky.classList.add('header--sticky-inactive');
        }
        header_sticky.style.height = '';
        header_sticky.classList.remove('header--sticky-active');
      }
    });
  });
}
{% endif %}

// Smooth scrolling

act.scroll_to = function(el, offset) {
  if(!el) return;
	if(!offset) offset = 0;
  offset = el.dataset.offset ? el.dataset.offset : offset;
  var body_rect = document.body.getBoundingClientRect(),
      el_rect = el.getBoundingClientRect(),
      el_top = el_rect.top - body_rect.top - offset + 1;
  window.scrollTo({
    top: el_top,
    left: 0,
    behavior: 'smooth'
  });
};

(function() {
	let link = document.querySelectorAll('a[href*="#"]');
	for (i = 0; i < link.length; i++) {
		if(!link[i].classList.contains('no-scroll') && link[i].href !='#' && location.pathname.replace(/^\//, '') == link[i].pathname.replace(/^\//, '') && location.hostname == link[i].hostname) {
			link[i].addEventListener('click', function(e) {
				let el = document.getElementById(this.hash.substr(1));
        if (!!el) {
          e.preventDefault();
          act.scroll_to(el, act.scroll_offset.get());
        }
			});
		}
	}
	if(window.location.hash) {
    setTimeout( function() {
      window.scrollTo(0, 0);
      let el = document.getElementById(window.location.hash.substr(1));
      act.scroll_to(el, act.scroll_offset.get());
    }, 10);
	}
})();

// Trigger event 'act'

let event = document.createEvent('Event');
event.initEvent('act', true, true);
document.dispatchEvent(event);

// Run only in the Editor view

if(window.hsInEditor) {
  act.initialize('.module--section-bg', function(el){
    el.closest('.dnd-module').classList.add('section-bg-span');
  });
}

// Get actual 1vw, no scrollbar

act.actual_vw = function() {
  let vw = document.documentElement.clientWidth / 100;
  document.documentElement.style.setProperty('--vw', `${vw}px`);
}
act.actual_vw();
window.addEventListener('resize', act.debounce(act.actual_vw, 100));

// Video lazy loading

document.addEventListener('DOMContentLoaded', function() {
  var lazyVideos = [].slice.call(document.querySelectorAll('video.lazy'));
  if (!lazyVideos.length) return;
  if ('IntersectionObserver' in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          video.target.src = video.target.dataset.src;
          video.target.load();
          video.target.classList.remove('lazy');
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });
    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});

// Reveal

const revealFunction = function(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const classList = Array.from(entry.target.classList);

      const matchingDurationClass = classList.find(className => /^reveal--duration-\d+$/.test(className));
      const matchingDelayClass = classList.find(className => /^reveal--delay-\d+$/.test(className));
      const matchingTimingClass = classList.find(className => /^reveal--timing-.+$/.test(className));
      const matchingOffsetClass = classList.find(className => /^reveal--offset-\d+$/.test(className));

      if (matchingDurationClass) {
        const duration = matchingDurationClass.replace('reveal--duration-', '') + 'ms';
        entry.target.style.animationDuration = duration;
      }

      if (matchingDelayClass) {
        const delay = matchingDelayClass.replace('reveal--delay-', '') + 'ms';
        entry.target.style.animationDelay = delay;
      }

      if (matchingTimingClass) {
        const timing = matchingTimingClass.replace('reveal--timing-', '');
        entry.target.style.animationTimingFunction = timing;
      }

      entry.target.classList.add('reveal--done');

      if (!entry.target.classList.contains('reveal--rerun')) observer.unobserve(entry.target);
    } else {
      entry.target.classList.remove('reveal--done');
    }
  });
};

const createObserver = (element) => {
  const matchingOffsetClass = Array.from(element.classList).find(className => /^reveal--offset-\d+$/.test(className));
  let offsetValue = '0px';
  
  if (matchingOffsetClass) {
    const offset = matchingOffsetClass.replace('reveal--offset-', '');
    offsetValue = `0px 0px -${offset}px 0px`;
  }

  const revealObserver = new IntersectionObserver(revealFunction, {
    rootMargin: offsetValue
  });

  revealObserver.observe(element);
};

const revealElements = document.querySelectorAll('.reveal');

revealElements.forEach(element => {
  createObserver(element);
});