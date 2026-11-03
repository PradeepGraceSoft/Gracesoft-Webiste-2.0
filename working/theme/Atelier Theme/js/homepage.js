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

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('[data-tour]').forEach(function (widget, group) {
    const list = widget.querySelector('[data-tour-tabs]');
    const tabs = Array.from(list.querySelectorAll('button'));
    const panels = Array.from(widget.querySelectorAll('[data-tour-panel]'));
    if (!tabs.length || tabs.length !== panels.length) return;

    function select(index) {
      tabs.forEach(function (tab, i) {
        tab.tabIndex = i === index ? 0 : -1;
        tab.setAttribute('aria-selected', String(i === index));
        panels[i].hidden = i !== index;
      });
    }

    list.setAttribute('role', 'tablist');
    list.setAttribute('aria-label', widget.querySelector('h3').textContent);
    tabs.forEach(function (tab, i) {
      const id = 'gs-tour-' + group + '-' + i;
      tab.id = id;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-controls', id + '-panel');
      panels[i].id = id + '-panel';
      panels[i].tabIndex = 0;
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', id);
      tab.addEventListener('click', function () { select(i); });
      tab.addEventListener('keydown', function (event) {
        const next = {ArrowRight:(i+1)%tabs.length, ArrowDown:(i+1)%tabs.length,
          ArrowLeft:(i+tabs.length-1)%tabs.length, ArrowUp:(i+tabs.length-1)%tabs.length,
          Home:0, End:tabs.length-1}[event.key];
        if (next === undefined) return;
        event.preventDefault();
        select(next);
        tabs[next].focus();
      });
    });
    select(0);
    list.hidden = false;
    widget.dataset.ready = '';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('chapter-enter');
      observer.unobserve(entry.target);
    });
  }, {threshold: 0.12});
  document.querySelectorAll('.tour-head, .chapter-body .tour-cards article, .voice-card').forEach(function (element) {
    observer.observe(element);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  if (!('IntersectionObserver' in window)) return;
  document.querySelectorAll('.gs-awards').forEach(function (section) {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    section.querySelectorAll('li').forEach(function (badge, index) {
      badge.style.setProperty('--award-position', index);
    });
    function reveal() {
      if (reducedMotion.matches) return;
      section.classList.add('awards-revealing');
    }
    const observer = new IntersectionObserver(function (entries) {
      if (!entries.some(entry => entry.isIntersecting)) return;
      reveal();
      observer.disconnect();
    }, {threshold:0.2});
    observer.observe(section);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const compact = matchMedia('(max-width:720px)');
  function sizeFooter() {
    document.querySelectorAll('.footer-groups details').forEach(group => { group.open = !compact.matches; });
  }
  sizeFooter();
  compact.addEventListener('change', sizeFooter);
});
