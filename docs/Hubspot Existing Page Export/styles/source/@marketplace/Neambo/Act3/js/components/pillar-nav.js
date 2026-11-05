// !!! Only one instance of the Pillar Nav on a page

var pillar = {
  offset: 0,
  nav_button: document.querySelector('.pillar-nav__button'),
  nav_toggle: document.querySelector('.pillar-nav__toggle'),
  content: document.querySelector('.pillar-content'),
  nav_items: document.querySelectorAll('.pillar-nav__link'),
  nav_display_overline: document.querySelector('.pillar-nav__display .pillar-nav__overline'),
  nav_display_title: document.querySelector('.pillar-nav__display .pillar-nav__title'),
  nav_progress: document.querySelector('.pillar-nav__progress'),
  nav_progress_bar: document.querySelector('.pillar-nav__progress-bar'),
  nav_progress_start: 0,
  nav_progress_end: 0,
  ticking: false,
  sections: [],
  progress: function(scroll_pos){
    let active_section = 0;
    for (i = 0; i < pillar.sections.length; i++)
      if(scroll_pos > pillar.sections[i].top) active_section = i;
  
    pillar.nav_display_overline.innerHTML = pillar.sections[active_section].overline;
    pillar.nav_display_title.innerHTML = pillar.sections[active_section].title;
  
    if (scroll_pos > pillar.nav_progress_start && scroll_pos < pillar.nav_progress_end) {
      pillar.nav_progress_bar.style.width = ((scroll_pos - pillar.nav_progress_start) / (pillar.nav_progress_end - pillar.nav_progress_start) * 100) + '%';
    } else if (scroll_pos <= pillar.nav_progress_start) {
      pillar.nav_progress_bar.style.width = '0%';
    } else {
      pillar.nav_progress_bar.style.width = '100%';
    }
  },

  init: function(){
		
		pillar.offset = act.scroll_offset.get();
    // Nav
    pillar.nav_button.addEventListener('click', function(e) {
      e.target.closest('.pillar-nav').classList.toggle('pillar-nav--list-open');
      document.addEventListener('click', function(ev) {
        if (!ev.target.closest('.pillar-nav__button')) pillar.nav_button.closest('.pillar-nav').classList.remove('pillar-nav--list-open');
      });
    });
    // Toggle
    pillar.nav_toggle.addEventListener('click', function(e) {
      e.target.closest('.pillar-nav').classList.add('pillar-nav--toggle-interactive');
      e.target.closest('.pillar-nav').classList.toggle('pillar-nav--compact');
    });
    // Progress & link nav
    let rect = pillar.content.getBoundingClientRect();
    pillar.nav_progress_start = rect['top'] + window.scrollY - pillar.offset;
    pillar.nav_progress_end = pillar.nav_progress_start + pillar.content.offsetHeight;
    for (i = 0; i < pillar.nav_items.length; i++) {
      var link = pillar.nav_items[i];
      var section = document.getElementById(link.hash.substr(1));
      if (section) {
        let rect = section.getBoundingClientRect();
        pillar.sections.push({
          overline: link.querySelector('.pillar-nav__overline').innerHTML,
          title: link.querySelector('.pillar-nav__title').innerHTML,
          top: window.scrollY + rect['top'] - pillar.offset
        });
      }
    }
    document.addEventListener('scroll', function(e) {
      if(!pillar.ticking) {
        window.requestAnimationFrame(function() {
          pillar.progress(window.scrollY);
          pillar.ticking = false;
        });
        pillar.ticking = true;
      }
    });
    pillar.progress(window.scrollY);

  }
}

pillar.init();