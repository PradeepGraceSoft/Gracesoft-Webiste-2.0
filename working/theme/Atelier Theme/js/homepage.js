document.addEventListener('DOMContentLoaded',function(){
  var button=document.querySelector('[data-menu-button]');
  var menu=document.querySelector('[data-mobile-menu]');
  if(button&&menu){
    const products = menu.querySelector('.atelier-products');
    const desktopHover = window.matchMedia('(min-width: 1001px) and (any-hover: hover)');
    let closeTimer;
    products.addEventListener('pointerenter', function(event) {
      if (event.pointerType !== 'mouse' || !desktopHover.matches) return;
      clearTimeout(closeTimer);
      products.open = true;
    });
    products.addEventListener('pointerleave', function(event) {
      if (event.pointerType !== 'mouse' || !desktopHover.matches) return;
      closeTimer = setTimeout(function() {
        if (!products.contains(document.activeElement)) products.open = false;
      }, 250);
    });
    function dismissProduct(event) {
      if (products.open && !products.contains(event.target)) products.open = false;
    }
    document.addEventListener('click', dismissProduct);
    document.addEventListener('focusin', dismissProduct);
    products.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && products.open) {
        event.stopPropagation();
        products.open = false;
        products.querySelector('summary').focus();
      }
    });
    function close(){products.open=false;button.setAttribute('aria-expanded','false');menu.dataset.open='false';}
    button.addEventListener('click',function(){var open=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!open));menu.dataset.open=String(!open);});
    menu.addEventListener('click',function(e){if(e.target.closest('a'))close();});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&button.getAttribute('aria-expanded')==='true'){close();button.focus();}});
    window.addEventListener('resize',function(){if(window.innerWidth>1000)close();});
  }

  // Reveal individual elements, never whole tall sections or the initial hero.
  var motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || motion.matches) return;
  var targets = document.querySelectorAll('.gs-section .gs-kicker, .gs-section .gs-title, .gs-section .gs-lead, .gs-section .gs-card, .gs-product-illustration, .gs-conversation, .gs-products-inline a, .gs-faq details, .gs-section .gs-actions, .gs-section .gs-container > .gs-button');
  var observer;
  function show(element, immediate) {
    if (immediate) element.style.transition = 'none';
    element.classList.remove('gs-motion-pending');
    element.classList.add('gs-motion-shown');
    if (observer) observer.unobserve(element);
  }
  try {
    observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) { if (entry.isIntersecting) show(entry.target, false); });
    }, {rootMargin:'0px 0px -45px 0px', threshold:0.08});
    targets.forEach(function(element) {
      if (element.getBoundingClientRect().top < window.innerHeight - 45) return;
      // Small sibling delays make card rows feel composed without slowing mobile reading.
      var siblings = Array.from(element.parentElement.children);
      var stagger = element.matches('.gs-card, .gs-products-inline a') ? siblings.indexOf(element) % 3 : 0;
      element.style.setProperty('--gs-reveal-delay', (stagger * 90) + 'ms');
      element.classList.add('gs-motion-item', 'gs-motion-pending');
      observer.observe(element);
    });
  } catch (error) {
    targets.forEach(function(element) { show(element, true); });
  }
  // Keyboard navigation must never land inside visually hidden content.
  document.addEventListener('focusin', function(event) {
    var target = event.target.closest('.gs-motion-pending');
    if (target) show(target, true);
  });
  motion.addEventListener('change', function(event) {
    if (event.matches) { targets.forEach(function(element) { show(element, true); }); observer.disconnect(); }
  });
  window.addEventListener('beforeprint', function() { targets.forEach(function(element) { show(element, true); }); });
});
