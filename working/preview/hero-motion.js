/* Progressive enhancement: the heading and original media remain usable without JS. */
(() => {
  const hero = document.querySelector('.gs-hero');
  if (!hero) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = matchMedia('(min-width:768px) and (hover:hover) and (pointer:fine)');
  const panel = hero.querySelector('.gs-product-art');
  const original = hero.querySelector('.hero-original');
  const roll = hero.querySelector('.hero-roll');
  const atmosphere = document.createElement('div');
  atmosphere.className = 'hero-atmosphere';
  atmosphere.setAttribute('aria-hidden', 'true');
  atmosphere.innerHTML = '<i class="hero-blob"></i><i class="hero-blob"></i><i class="hero-blob"></i><i class="hero-spotlight"></i>';
  hero.prepend(atmosphere);
  const spot = atmosphere.lastElementChild;
  const shadow = document.createElement('span');
  shadow.className = 'hero-shadow';
  shadow.setAttribute('aria-hidden', 'true');
  panel.append(shadow);
  const shine = document.createElement('span');
  shine.className = 'hero-shine'; shine.setAttribute('aria-hidden', 'true');
  hero.querySelector('.gs-button--primary').append(shine);
  let timer, frame, index = 0, animations = [];
  // Singular labels match the property-type cards and the phrase 'The whole'.
  const words = ['property', 'hotel', 'motel', 'B&B', 'resort', 'inn', 'vacation rental', 'campground', 'rv parks', 'dude ranch', 'condo', 'multi property'];
  function fitWord() {
    // Measure the actual glyph box, including font and letter spacing.
    const scale = Math.min(1, original.parentElement.clientWidth / Math.max(1, roll.offsetWidth + 1));
    roll.style.transform = `scaleX(${scale})`;
    return scale;
  }
  new ResizeObserver(fitWord).observe(original.parentElement);
  document.fonts.ready.then(fitWord);
  function rotate() {
    if (reduced.matches || document.hidden) return;
    index = (index + 1) % words.length;
    const outgoing = roll.classList.contains('is-active') ? roll.cloneNode(true) : original.cloneNode(true);
    outgoing.className = 'hero-roll is-active';
    outgoing.setAttribute('aria-hidden', 'true');
    outgoing.style.transform = roll.style.transform || 'none';
    original.parentElement.append(outgoing);
    roll.textContent = words[index] + '.';
    const scale = fitWord();
    original.classList.add('is-covered'); roll.classList.add('is-active');
    const previousTransform = outgoing.style.transform === 'none' ? '' : outgoing.style.transform;
    const exit = outgoing.animate([{transform: `translateY(0) ${previousTransform}`, opacity: 1}, {transform: `translateY(-100%) ${previousTransform}`, opacity: 0}], {duration: 550, easing: 'cubic-bezier(.16,1,.3,1)'});
    exit.finished.then(() => outgoing.remove(), () => outgoing.remove());
    animations = [exit, roll.animate([
      { transform: `translateY(105%) scaleX(${scale})`, opacity: 0 },
      { transform: `translateY(0) scaleX(${scale})`, opacity: 1 }
    ], { duration: 550, easing: 'cubic-bezier(.16,1,.3,1)' })];
  }
  function resetPointer() {
    cancelAnimationFrame(frame); panel.style.transform = ''; shadow.style.transform = ''; spot.style.opacity = '0';
  }
  function sync() {
    clearInterval(timer); animations.forEach(animation => animation.cancel()); resetPointer();
    if (reduced.matches) { original.classList.remove('is-covered'); roll.classList.remove('is-active'); }
    else if (!document.hidden) timer = setInterval(rotate, 2500);
  }
  hero.addEventListener('pointermove', event => {
    if (!desktop.matches || reduced.matches || event.pointerType === 'touch') return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const box = hero.getBoundingClientRect();
      spot.style.transform = `translate(${event.clientX - box.left}px,${event.clientY - box.top}px)`;
      spot.style.opacity = '1';
      const rect = panel.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      panel.style.transform = `perspective(1100px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      shadow.style.transform = `translate(${-x * 10}px,${-y * 8}px)`;
    });
  }, { passive: true });
  hero.addEventListener('pointerleave', resetPointer);
  reduced.addEventListener('change', sync); desktop.addEventListener('change', resetPointer);
  document.addEventListener('visibilitychange', sync); sync();
})();

