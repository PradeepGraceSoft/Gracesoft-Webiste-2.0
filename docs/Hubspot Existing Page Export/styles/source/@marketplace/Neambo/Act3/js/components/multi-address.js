function multi_address(id, item) {
  const container = document.getElementById(id);
  const office = container.querySelectorAll('.multi-address__office');
  const map = container.querySelectorAll('.multi-address__map');
  if (!!container && !!office[item] && !!map[item]) {
  
    let maps = container.querySelectorAll('.multi-address__maps');
    
    // Component has been interacted with
    container.classList.add('multi-address--active');

    // Remove active classes from all items
    for (i = 0; i < office.length; i++) {
      office[i].classList.remove('multi-address__office--active');
      office[i].classList.remove('txt--dark');
    }
    for (i = 0; i < map.length; i++) {
      map[i].classList.remove('multi-address__map--active');
    }
    
    // Add classes to active items
    office[item].classList.add('multi-address__office--active');
    office[item].classList.add('txt--dark');
    map[item].classList.add('multi-address__map--active');
    
    // Scroll to content
    if (window.innerWidth < act.md) {
      const scroll_where = act.getOffsetTop(map[item]) - act.scroll_offset.get();
      window.scroll({
        top: scroll_where,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

document.addEventListener('click', function(event){
  const office = event.target.closest('.multi-address__office');
  if (office) office.addEventListener("click", multi_address(office.getAttribute("multi-address-id"), office.getAttribute("item-index")));
});