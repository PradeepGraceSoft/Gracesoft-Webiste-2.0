const content_card_collapse_desc = document.querySelectorAll('.content-card--collapse-desc');
for (i = 0; i < content_card_collapse_desc.length; i++) {
  let card = content_card_collapse_desc[i];
  card.addEventListener('click', function(e) {
    if (e.target.tagName != 'A') {
      if (card.classList.contains('content-card--sync-desc')) {
        let cards = card.closest('.content-cards').querySelectorAll('.content-card');
        for (j = 0; j < cards.length; j++) {
          cards[j].classList.toggle('content-card--expanded');
        }
      }
      else card.classList.toggle('content-card--expanded');
    }
  });
}