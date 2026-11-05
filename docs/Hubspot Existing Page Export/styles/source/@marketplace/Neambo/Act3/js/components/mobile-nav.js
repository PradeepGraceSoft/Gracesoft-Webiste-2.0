const mobile_nav_open = document.querySelector('.mnav__open'),
      mobile_nav_close = document.querySelector('.mnav__close'),
      mobile_nav_popup = document.querySelector('.mnav__popup'),
      mobile_nav_overlay = document.querySelector('.mnav__overlay');

const open_mobile_nav = function() {
  document.body.classList.add('mnav-active');
}

const close_mobile_nav = function() {
  document.body.classList.remove('mnav-active');
}

mobile_nav_open.addEventListener('click', open_mobile_nav);
mobile_nav_close.addEventListener('click', close_mobile_nav);
mobile_nav_overlay.addEventListener('click', close_mobile_nav);

// Menu

const vmenu_toggle = document.querySelectorAll('.mnav__menu__toggle, .mnav__menu__link[href="javascript:;"]');
for (i = 0; i < vmenu_toggle.length; i++) {
  vmenu_toggle[i].addEventListener('click', function(event) {
    const vmenu_current = event.target.closest('.mnav__menu__item--parent');
    const vmenu_expanded = event.target.closest('.mnav__menu__list').querySelectorAll(':scope > .mnav__menu__item--expanded');
    for (n = 0; n < vmenu_expanded.length; n++) {
      if (vmenu_expanded[n] != vmenu_current) {
        vmenu_expanded[n].classList.remove('mnav__menu__item--expanded');
        const vmenu_expanded_children = vmenu_expanded[n].querySelectorAll('.mnav__menu__item--expanded');
        for (z = 0; z < vmenu_expanded_children.length; z++) {
          vmenu_expanded_children[z].classList.remove('mnav__menu__item--expanded');
        }
      }
    }
    event.target.closest('.mnav__menu__item').classList.toggle('mnav__menu__item--expanded');
  });
}

// Close nav on anchors click

document.addEventListener('click', function(e){
  if(!e.target.matches('.mnav__popup a[href*="#"]')) return;
  document.body.classList.remove('mnav-active');
});