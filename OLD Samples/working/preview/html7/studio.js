'use strict';
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const menu = document.querySelector('[data-mobile-menu]');
const menuButton = document.querySelector('[data-menu-button]');
const products = menu.querySelector('details');
function closeMenu() {
  products.open = false;
  menu.dataset.open = 'false';
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const open = menu.dataset.open !== 'true';
  menu.dataset.open = String(open);
  menuButton.setAttribute('aria-expanded', String(open));
});
document.addEventListener('click', event => {
  if (event.target.closest('.atelier-navigation a') || !event.target.closest('.gs-header')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (products.open) {
    products.open = false;
    products.querySelector('summary').focus();
  } else if (menu.dataset.open === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
const desktop = matchMedia('(min-width:1091px) and (hover:hover)');
products.addEventListener('pointerenter', event => {
  if (desktop.matches && event.pointerType === 'mouse') products.open = true;
});
products.addEventListener('pointerleave', () => {
  if (desktop.matches && !products.contains(document.activeElement)) products.open = false;
});
menu.addEventListener('focusout', event => {
  if (!products.contains(event.relatedTarget)) products.open = false;
});
desktop.addEventListener('change',closeMenu);

// Keep the feature description, destination and product view together at every size.
function createWalkthrough(widget,group) {
  const list = widget.querySelector('[data-tour-tabs]');
  const tabs = [...list.children];
  const panels = [...widget.querySelectorAll('[data-tour-panel]')];
  const pause = document.createElement('button');
  pause.className = 'pause-tour';
  pause.type = 'button';
  widget.append(pause);
  let active = 0, visible = false, paused = motionPreference.matches, timer;
  function schedule() {
    clearTimeout(timer);
    pause.textContent = paused ? 'Play walkthrough' : 'Pause walkthrough';
    if (visible && !paused && !document.hidden && !widget.matches(':hover, :focus-within')) {
      timer = setTimeout(() => select((active + 1) % tabs.length),10000);
    }
  }
  function select(index) {
    active = index;
    tabs.forEach((tab,i) => {
      tab.tabIndex = index === i ? 0 : -1;
      tab.setAttribute('aria-selected',String(index === i));
      panels[i].hidden = index !== i;
      panels[i].classList.toggle('changed', index === i);
    });
    schedule();
  }
  list.setAttribute('role','tablist');
  list.setAttribute('aria-label',widget.querySelector('h3').textContent);
  tabs.forEach((tab,i) => {
    tab.id = 'feature-' + group + '-' + i;
    const panel = panels[i];
    panel.id = tab.id + '-panel';
    tab.setAttribute('role','tab');
    tab.setAttribute('aria-controls',panel.id);
    panel.setAttribute('role','tabpanel');
    panel.setAttribute('aria-labelledby',tab.id);
    tab.addEventListener('click',() => select(i));
    tab.addEventListener('keydown',event => {
      const next = {ArrowRight:(i+1)%tabs.length,ArrowLeft:(i+tabs.length-1)%tabs.length,Home:0,End:tabs.length-1}[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next);
      tabs[next].focus();
    });
  });
  pause.addEventListener('click',() => { paused = !paused; schedule(); });
  motionPreference.addEventListener('change',() => { paused = motionPreference.matches; schedule(); });
  for (const event of ['pointerenter','pointerleave','focusin','focusout']) widget.addEventListener(event,() => queueMicrotask(schedule));
  document.addEventListener('visibilitychange',schedule);
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); },{threshold:.2}).observe(widget);
  }
  list.hidden = false;
  select(0);
}
document.querySelectorAll('[data-tour]').forEach(createWalkthrough);

const compact = matchMedia('(max-width:780px)');
function syncDirectory() {
  document.querySelectorAll('.footer-groups details').forEach(group => { group.open = !compact.matches; });
}
compact.addEventListener('change',syncDirectory);
syncDirectory();
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const reveal = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('arrives');
      reveal.unobserve(entry.target);
    }
  },{rootMargin:'0px 0px -5% 0px'});
  document.querySelectorAll('.tour-head,.voice-card,.property-arches li,.reading-grid article,.gs-awards-inner').forEach(element => reveal.observe(element));
}
const finder = document.querySelector('#finder');
const input = document.querySelector('#need');
const answer = document.querySelector('.answer');
const aliases = {
  'Reservations':'room availability manage bookings reservation',
  'Housekeeping':'prepare rooms clean cleaning room status',
  'Booking engine':'take direct bookings book online commission',
  'Guest inbox':'email messages reply inbox',
  'AI chat assistant':'answer guest questions chatbot',
  'Billing and payments':'charge invoice card payment bill',
  'AI voice assistant':'phone call calls telephone',
  'Channel manager':'ota distribution rates channels'
};
const words = text => text.toLowerCase().match(/[a-z0-9]+/g) || [];
const ignored = new Set(words('a an the my our with for to and i we how can do need want help me of'));
const features = [...document.querySelectorAll('[data-tour-panel] article')].map(article => {
  const name = article.querySelector('h3').textContent.trim();
  const description = article.querySelector('p').textContent;
  return {name,description,link:article.querySelector('a'),terms:new Set(words(name+' '+(aliases[name] || ''))),body:new Set(words(description))};
});
function discover() {
  const tokens = words(input.value).filter(word => !ignored.has(word));
  const ranked = features.map(feature => ({feature,score:tokens.reduce((n,word) =>
    n+(feature.terms.has(word)?4:feature.body.has(word)?1:0),0)})).sort((a,b)=>b.score-a.score);
  const match = ranked[0].score ? ranked[0].feature : null;
  answer.querySelector('small').textContent = match ? 'Matching product' : 'Explore by chapter';
  answer.querySelector('h2').textContent = match?.name || 'Choose a starting point';
  answer.querySelector('p').textContent = match?.description || 'Try reservations, housekeeping, payments or guest communication.';
  const link = answer.querySelector('a');
  link.href = match?.link.href || '#manage-operations';
  link.textContent = match?.link.textContent || 'Explore operations →';
  if(!motionPreference.matches) answer.animate([{opacity:.5,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:300});
}
finder.addEventListener('submit',event=>{event.preventDefault();discover()});
document.querySelectorAll('.examples button').forEach(button=>button.addEventListener('click',()=>{input.value=button.textContent;discover()}));
