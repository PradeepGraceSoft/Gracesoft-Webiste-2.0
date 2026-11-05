const pricing_toggle = document.querySelectorAll('.pricing__toggle');

for (i = 0; i < pricing_toggle.length; i++) {
  pricing_toggle[i].addEventListener('click', function(event) {
    const pricing_wrapper = event.target.closest('.pricing');
    pricing_wrapper.classList.toggle('pricing--1');
    pricing_wrapper.classList.toggle('pricing--2');
    pricing_wrapper.classList.add('pricing--active');
  });
}