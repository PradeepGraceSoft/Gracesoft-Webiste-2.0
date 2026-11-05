const tab_trigger_el = document.querySelectorAll('[go-to-tab]');
for (var i = 0; i < tab_trigger_el.length; i++) {
    tab_trigger_el[i].addEventListener('click', function(){
        go_to_tab(this.getAttribute('go-to-tab'));
    });
}

function go_to_tab(id) {
  const tab_target = document.getElementById(id);
  if (!!tab_target) {
    const component = tab_target.closest('.tabs');
    const buttons = component.querySelectorAll('.tabs__btn');
    const tabs = component.querySelectorAll('.tabs__tab');
    const button_target = component.querySelectorAll('.tabs__btn[go-to-tab="'+ id +'"]');
    const button_inactive_class = component.getAttribute('data-tabs-inactive').split(' ');
    const button_active_class = component.getAttribute('data-tabs-active').split(' ');

    // Tabs component has been interacted with
    component.classList.add('tabs--active');

    // Remove active class from all tabs
    for (i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove('tabs__tab--active');
    }

    // Add active class to the target tab
    tab_target.classList.add('tabs__tab--active');

    // Remove active class from all buttons
    for (i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('tabs__btn--active');

      // Remove active style classes from all buttons
      for (n = 0; n < button_active_class.length; n++) {
        buttons[i].classList.remove(button_active_class[n]);
      }

      // Add inactive style classes to all buttons
      for (n = 0; n < button_inactive_class.length; n++) {
        buttons[i].classList.add(button_inactive_class[n]);
      }
    }

    // Add active class to the target buttons
    for (i = 0; i < button_target.length; i++) {
      button_target[i].classList.add('tabs__btn--active');

      // Remove inactive style classes from target buttons
      for (n = 0; n < button_inactive_class.length; n++) {
        button_target[i].classList.remove(button_inactive_class[n]);
      }

      // Add active style classes to the target buttons
      for (n = 0; n < button_active_class.length; n++) {
        button_target[i].classList.add(button_active_class[n]);
      }
      
      if (window.innerWidth < act.sm) {
        const scroll_where = act.getOffsetTop(button_target[1]) - act.scroll_offset.get();
        window.scroll({
          top: scroll_where,
          left: 0,
          behavior: 'smooth' 
        });
      }
    }
  }
}