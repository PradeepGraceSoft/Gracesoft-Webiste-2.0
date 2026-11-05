const dd = document.querySelectorAll('.drop-down');

for (i = 0; i < dd.length; i++) {
  const btn = dd[i].querySelector('.drop-down__btn');
  const list = dd[i].querySelector('.drop-down__list');
  const option = list.querySelectorAll('.drop-down__option');
  
  btn.addEventListener('click', function(event) {
    for (x = 0; x < dd.length; x++) {
      dd[x].querySelector('.drop-down__list').classList.remove('drop-down__list--active');
    }
    list.classList.toggle('drop-down__list--active');
  });
  
  for (j = 0; j < option.length; j++) {
    option[j].addEventListener('click', function(event) {
      const active_option = list.querySelector('.drop-down__option--active');
      if (active_option) list.querySelector('.drop-down__option--active').classList.remove('drop-down__option--active');
      event.target.classList.add('drop-down__option--active');
      btn.querySelector('.drop-down__btn-text').innerHTML = event.target.innerHTML;
      list.classList.remove('drop-down__list--active');
    });
  }
  
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.drop-down')) list.classList.remove('drop-down__list--active')
  });
}