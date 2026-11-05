(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function updateHeader() {
    document.body.classList.toggle('scrolled', window.scrollY > 12);
  }
  updateHeader();
  addEventListener('scroll', updateHeader, {passive:true});
  if (reduced.matches || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('in-frame');
      observer.unobserve(entry.target);
    }
  }, {rootMargin:'0px 0px -7% 0px'});
  const groups = '.outcome-grid, .property-arches, .voice-grid, .reading-grid';
  document.querySelectorAll(groups).forEach(group => {
    Array.from(group.children).forEach((item,index) => {
      item.style.setProperty('--delay', (index % 3) * 65 + 'ms');
      observer.observe(item);
    });
  });
  document.querySelectorAll('.tour-head, .tour-widget, .gs-awards-inner, .gs-faq, #final-demo .gs-container').forEach(item => observer.observe(item));
})();
