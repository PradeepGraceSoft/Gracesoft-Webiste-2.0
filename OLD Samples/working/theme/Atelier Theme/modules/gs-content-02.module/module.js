(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches || !('IntersectionObserver' in window)) return;
 const active=new Set();
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(!entry.isIntersecting) return;
  observer.unobserve(entry.target);
  if(reduced.matches) return;
  const card=entry.target, value=card.querySelector('[data-outcome-value]'), final=value.textContent;
  const motion=card.animate?.([{transform:'translateY(24px)',opacity:.4},{transform:'translateY(0)',opacity:1}],{duration:650,easing:'cubic-bezier(.2,.7,.2,1)'});
  let frame,started,last=-120;
  const finish=()=>{cancelAnimationFrame(frame);value.textContent=final;motion?.cancel();active.delete(finish)};
  active.add(finish);
  const tick=now=>{started??=now;const elapsed=now-started;if(elapsed>=1100||reduced.matches||document.hidden)return finish();if(elapsed-last>=120){value.textContent=final.replace(/[0-9]/g,()=>String(Math.floor(Math.random()*10)));last=elapsed}frame=requestAnimationFrame(tick)};
  frame=requestAnimationFrame(tick);
 }),{threshold:.25});
 document.querySelectorAll('.outcome-card').forEach(card=>observer.observe(card));
 reduced.addEventListener('change',()=>{if(reduced.matches)active.forEach(f=>f())});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)active.forEach(f=>f())});
})();