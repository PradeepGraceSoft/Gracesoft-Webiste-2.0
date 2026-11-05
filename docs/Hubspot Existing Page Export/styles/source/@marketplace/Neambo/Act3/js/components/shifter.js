const shifter_trigger_el = document.querySelectorAll('[shifter]');
for (var i = 0; i < shifter_trigger_el.length; i++) {
    shifter_trigger_el[i].addEventListener('click', function(){
        shifter(this.getAttribute('shifter'), this.getAttribute('shifter-item'));
    });
}

function shifter(id, item) {
  const shifter = document.getElementById(id);
  const btn_nav = shifter.querySelector('.shifter__nav--buttons');
  const nav_items = shifter.querySelectorAll('.shifter__nav__item');
  const content_items = shifter.querySelectorAll('.shifter__content__item');
  
  if (!!shifter && !!nav_items[item] && !!content_items[item]) {
    
    // Component has been interacted with
    shifter.classList.add('shifter--active');

    // Remove active classes from all items
    for (i = 0; i < nav_items.length; i++) {
      nav_items[i].classList.remove('shifter__nav__item--active');
      if (!!btn_nav) nav_items[i].setAttribute('class', btn_nav.dataset.btnDefaultClass + ' shifter__nav__item');
    }
    for (i = 0; i < content_items.length; i++) content_items[i].classList.remove('shifter__content__item--active');
    
    // Add classes to active items
    if (btn_nav) nav_items[item].setAttribute('class', btn_nav.dataset.btnActiveClass + ' shifter__nav__item');
    nav_items[item].classList.add('shifter__nav__item--active');
    content_items[item].classList.add('shifter__content__item--active');    
    
    // Scroll to content
    if ((shifter.classList.contains('shifter--scroll-mixed') && window.innerWidth < act.md) || shifter.classList.contains('shifter--scroll-always')) {
      const shifter_scroll = act.getOffsetTop(content_items[item]) - act.scroll_offset.get();
      window.scroll({
        top: shifter_scroll,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}