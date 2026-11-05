(() => {
  'use strict';
  document.body.classList.add('js-ready');
  const toggle = document.querySelector('[data-menu-button]');
  const navigation = document.getElementById('site-navigation');
  const mobile = window.matchMedia('(max-width: 767px)');
  const productMenu = document.querySelector('.nav-products');
  function closeMenu(returnFocus = false) {
    navigation?.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (returnFocus) toggle?.focus();
  }
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
    if (open) navigation.querySelector('summary, a')?.focus();
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (productMenu?.open) {
      productMenu.open = false;
      productMenu.querySelector('summary').focus();
    } else if (toggle?.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (productMenu?.open && !productMenu.contains(event.target)) productMenu.open = false;
    if (mobile.matches && navigation?.contains(event.target) && event.target.closest('a')) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu());

  document.querySelectorAll('[data-tabs]').forEach((root, rootIndex) => {
    const buttons = [...root.querySelectorAll('[data-tab]')];
    const panels = [...root.querySelectorAll('[data-panel]')];
    const tablist = buttons[0]?.parentElement;
    if (!tablist || buttons.length !== panels.length) return;
    tablist.setAttribute('role', 'tablist');
    const vertical = tablist.classList.contains('product-tabs') && !mobile.matches;
    tablist.setAttribute('aria-orientation', vertical ? 'vertical' : 'horizontal');
    function activate(index, focus = false) {
      buttons.forEach((button, i) => {
        button.setAttribute('aria-selected', String(i === index));
        button.tabIndex = i === index ? 0 : -1;
        panels[i].hidden = i !== index;
      });
      if (focus) buttons[index].focus();
    }
    buttons.forEach((button, i) => {
      const id = `gs3d-tabs-${rootIndex}-${i}`;
      button.id = id;
      button.setAttribute('role', 'tab');
      button.setAttribute('aria-controls', panels[i].id);
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].setAttribute('aria-labelledby', id);
      panels[i].tabIndex = 0;
      button.addEventListener('click', () => activate(i));
      button.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight' || (tablist.getAttribute('aria-orientation') === 'vertical' && event.key === 'ArrowDown')) next = (i + 1) % buttons.length;
        if (event.key === 'ArrowLeft' || (tablist.getAttribute('aria-orientation') === 'vertical' && event.key === 'ArrowUp')) next = (i - 1 + buttons.length) % buttons.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = buttons.length - 1;
        if (next !== undefined) { event.preventDefault(); activate(next, true); }
      });
    });
    mobile.addEventListener('change', () => tablist.setAttribute('aria-orientation', tablist.classList.contains('product-tabs') && !mobile.matches ? 'vertical' : 'horizontal'));
    activate(0);
  });

  const dialog = document.querySelector('[data-image-dialog]');
  let zoomTrigger;
  document.querySelectorAll('[data-zoom]').forEach(button => button.addEventListener('click', () => {
    if (!dialog?.showModal) return;
    const source = button.closest('figure').querySelector('img');
    dialog.querySelector('img').src = source.currentSrc || source.src;
    dialog.querySelector('img').alt = source.alt;
    zoomTrigger = button;
    dialog.showModal();
  }));
  dialog?.querySelector('[data-close-dialog]')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => zoomTrigger?.focus());

  // The scene is an enhancement: text, navigation and conversion links render first.
  const scenes = [...document.querySelectorAll('[data-hotel-scene]')];
  let requested = false;
  function loadScene() {
    if (requested || !scenes.length) return;
    requested = true;
    const script = document.createElement('script');
    script.src = scenes[0].dataset.bundle;
    script.async = true;
    script.onerror = () => scenes.forEach(scene => { scene.dataset.state = 'fallback'; });
    document.head.append(script);
  }
  if (scenes.length) {
    const schedule = () => 'requestIdleCallback' in window ? requestIdleCallback(loadScene, { timeout: 1800 }) : setTimeout(loadScene, 150);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) { observer.disconnect(); schedule(); }
      }, { rootMargin: '100px' });
      scenes.forEach(scene => observer.observe(scene));
    } else schedule();
  }
})();
