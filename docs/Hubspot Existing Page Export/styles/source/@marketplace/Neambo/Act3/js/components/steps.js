(function() {
  let current_icons = document.querySelectorAll('.steps__icon');
  for (i = 0; i < current_icons.length; i++) {
    let current_icon = current_icons[i];
    current_icon.addEventListener('click', function(){
      let component = current_icon.closest('.steps');
      let current_item = component.querySelector('.steps__item[step="' + current_icon.getAttribute("step") + '"]');
      component.querySelector('.steps__icon--active').classList.remove('steps__icon--active');
      component.querySelector('.steps__item--active').classList.remove('steps__item--active');
      current_icon.classList.add('steps__icon--active');
      current_item.classList.add('steps__item--active');
    });
  }
})();