// On hover/focus
(function() {
let nav_link = document.querySelectorAll('.nav--on-hover .nav__item--branch > a');
for (i = 0; i < nav_link.length; i++) {
  let link = nav_link[i];
  let li = link.closest('li');
  let flyout = link.nextElementSibling;
  let delay = li.classList.contains('nav__item--mega-branch') ? link.closest('.nav').getAttribute('flyout-delay') : 0;
  li.addEventListener('mouseenter', function(){
    li.classList.add('nav__item--expanded');
  });
  li.addEventListener('mouseleave', act.debounce(function(){
    if (!act.ishover(flyout)) {
      li.classList.remove('nav__item--expanded');
    }
  }, delay));
  link.addEventListener('focus', function(){
    if (link.matches('.nav__list--level1 > li > a')) {
      let nll1 = link.closest('.nav').querySelectorAll('.nav__list--level1 > li');
      for (j = 0; j < nll1.length; j++) {
        nll1[j].classList.remove('nav__item--expanded');
        li.classList.add('nav__item--expanded');
      }
    }
    else {
      li.classList.add('nav__item--expanded');
    }
  });
  link.addEventListener('blur', act.debounce(function(){
    if (!act.isfocuswithin(flyout)) {
      li.classList.remove('nav__item--expanded');
    }
  }, delay));
}
})();

(function() {
let nav_link = document.querySelectorAll('.nav--on-hover .nav__item:not(.nav__item--branch):last-child > a');
for (i = 0; i < nav_link.length; i++) {
  let link = nav_link[i];
  let branch = link.closest('.nav__item--branch');
  link.addEventListener('blur', function() {
    branch.classList.remove('nav__item--expanded');
  });
}
})();

(function() {
let nav_link = document.querySelectorAll('.nav__mega a');
for (i = 0; i < nav_link.length; i++) {
  let link = nav_link[i];
  let flyout = link.closest('.nav__mega');
  let li = link.closest('.nav__item--branch');
  let top_link = li.querySelector(':scope > a');
  let delay = link.closest('.nav').getAttribute('flyout-delay');
  link.addEventListener('focus', function(){
    li.classList.add('nav__item--expanded');
  });
  link.addEventListener('blur', act.debounce(function() {
    if (!act.isfocus(top_link) && !act.isfocuswithin(flyout)) {
      li.classList.remove('nav__item--expanded');
    }
  }, delay));
}
})();

(function() {
// On click
let nav_link = document.querySelectorAll('.nav--on-click .nav__list--level1 > .nav__item--branch > a');
for (i = 0; i < nav_link.length; i++) {
  let link = nav_link[i];
  let li = link.closest('li');
  let flyout = link.nextElementSibling;
  link.addEventListener('click', function(event){
    if (link.getAttribute('href') != 'javascript:;' && !li.classList.contains('nav__item--expanded')) {
      event.preventDefault();
    }
    li.classList.toggle('nav__item--expanded');
    link.setAttribute('aria-expanded', true);
  });
  document.addEventListener('click', function(event){
    if (event.target != link) {
      li.classList.remove('nav__item--expanded');
      link.setAttribute('aria-expanded', false);
    }
  });
}
})();

// Add active class to mega menu links

function linkMatchURL(linkElement) {
    const currentURL = window.location.origin + window.location.pathname;
    const href = linkElement.getAttribute('href');

    if (href.startsWith('#')) return false;

    const linkURL = new URL(href, window.location.origin);
    const linkURLWithoutParams = linkURL.origin + linkURL.pathname;

    return currentURL === linkURLWithoutParams;
}

const mega_link = document.querySelectorAll('.nav__mega a');

mega_link.forEach(link => {
  if (linkMatchURL(link)) {
    link.classList.add('nav__mega-active-link');
  }
  else {
    link.classList.remove('nav__mega-active-link');
  }
});