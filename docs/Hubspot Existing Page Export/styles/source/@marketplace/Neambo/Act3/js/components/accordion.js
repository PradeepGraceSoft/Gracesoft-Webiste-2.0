(function() {
  let acc_header = document.querySelectorAll('.accordion__header');
  for (i = 0; i < acc_header.length; i++) {
    let el = acc_header[i];
    el.addEventListener('click', function(){
      var group = el.closest('.accordion');
      var item = el.closest('.accordion__item');
      var siblings = act.getsiblings(item);
      if (group.classList.contains('accordion--toggle')) {
        for (j = 0; j < siblings.length; j++) {
          siblings[j].classList.remove('accordion__item--expanded');
        }
      }
      item.classList.toggle('accordion__item--expanded');
    });
  }
})();