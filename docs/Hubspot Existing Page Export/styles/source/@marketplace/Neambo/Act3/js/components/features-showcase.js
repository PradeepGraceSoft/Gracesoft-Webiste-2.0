const featshow_trigger_el = document.querySelectorAll('[featshow]');
for (var i = 0; i < featshow_trigger_el.length; i++) {
    featshow_trigger_el[i].addEventListener('click', function(){
        featshow(this.getAttribute('featshow'), this.getAttribute('featshow-item'));
    });
}

function featshow(id, item) {

  const component = document.getElementById(id);
  const items_nr = component.querySelectorAll('.featshow__item').length;
  const arrow_prev = component.querySelector('.featshow__arrow--prev');
  const arrow_next = component.querySelector('.featshow__arrow--next');
  let current_item = parseInt(component.getAttribute('current-item'));
  
  if (item == 'next') {
    if (current_item == items_nr - 1) return;
    item = current_item + 1;
  } else if (item == 'prev') {
    if (current_item == 0) return;
    item = current_item - 1;
  }

  const nav_active = component.querySelector('.featshow__btn--active');
  const dot_active = component.querySelector('.featshow__dot--active');
  const item_active = component.querySelector('.featshow__item--active');
  
  const nav_target = component.querySelectorAll('.featshow__btn')[item];
  const dot_target = component.querySelectorAll('.featshow__dot')[item];
  const item_target = component.querySelectorAll('.featshow__item')[item];  
  
  // Do
  
  // Active arrows
  if (item == 0) {
    arrow_prev.classList.remove('featshow__arrow--active');
    arrow_next.classList.add('featshow__arrow--active');
  } else if (item == items_nr - 1) {
    arrow_prev.classList.add('featshow__arrow--active');
    arrow_next.classList.remove('featshow__arrow--active');
  } else {
    arrow_prev.classList.add('featshow__arrow--active');
    arrow_next.classList.add('featshow__arrow--active');
  }
  
  // Old active
  nav_active.classList.remove('featshow__btn--active');
  dot_active.classList.remove('featshow__dot--active');
  item_active.classList.remove('featshow__item--active');
  
  // New active
  nav_target.classList.add('featshow__btn--active');
  dot_target.classList.add('featshow__dot--active');
  item_target.classList.add('featshow__item--active');
  
  // Current item
  component.setAttribute("current-item", item);
  
  //Enable animation once the component has been interacted with
  component.classList.add('featshow--active');
  
  // Auto scroll on mobile
  if (window.innerWidth < act.sm) {
    const featshow_scroll = act.getOffsetTop(item_target) - act.scroll_offset.get();
    window.scroll({
      top: featshow_scroll,
      left: 0,
      behavior: 'smooth'
    });
  }
}