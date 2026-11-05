function tags_list(btn) {
  const list = btn.nextElementSibling;
  btn.classList.toggle('tags-list__btn--active');
  list.classList.toggle('tags-list__list--active');
  
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.tags-list')) {
      btn.classList.remove('tags-list__btn--active');
      list.classList.remove('tags-list__list--active')
    }
  });
}

const tag_list_btn = document.querySelectorAll('.tags-list__open-list');

tag_list_btn.forEach(btn => {
  btn.addEventListener('click', () => {
    tags_list(btn);
  })
});