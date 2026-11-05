const rtext = document.querySelectorAll('.rtext__more-btn');

for (i = 0; i < rtext.length; i++) {
  rtext[i].addEventListener('click', function(event) {
    event.target.closest('.rtext').classList.toggle('rtext--expanded');
  });
}