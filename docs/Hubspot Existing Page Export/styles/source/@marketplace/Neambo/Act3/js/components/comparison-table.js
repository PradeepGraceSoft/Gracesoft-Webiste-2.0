function comptab(obj, cols_nr, first_col_width_lg, first_col_width_md, first_col_width_sm, first_col_width_xs) {
  const header = obj.querySelector('.comptab__head');
  const scroller_body = obj.querySelector('.comptab__scroller--body');
  const scroller_head = obj.querySelector('.comptab__scroller--head');
  const track_body = obj.querySelector('.comptab__track--body');
  const track_head = obj.querySelector('.comptab__track--head');
  const regular_col = obj.querySelectorAll('.comptab__col--regular');
  const regular_col_ref = scroller_body.querySelector('.comptab__col--regular');
  const first_col = obj.querySelectorAll('.comptab__col--first');
  
  let scroller_body_width = scroller_body.offsetWidth;
  let first_col_width;

  // XS
  if (window.innerWidth < act.xs) {
    first_col_width = first_col_width_xs;
  }
  
  // SM
  else if (window.innerWidth < act.sm) {
    first_col_width = first_col_width_sm;
  }

  // MD
  else if (window.innerWidth < act.md) {
    first_col_width = first_col_width_md;
  }

  // LG
  else {
    first_col_width = first_col_width_lg;
  }

  let col_width = (scroller_body_width - first_col_width) / cols_nr;
  let track_width = 0;

  // Set regular col width
  for (i = 0; i < regular_col.length; i++) {
    regular_col[i].style.flexBasis = col_width + 'px';
    regular_col[i].style.maxWidth = col_width + 'px';
  };

  // Set track width
  track_body.style.width = first_col_width + regular_col_ref.getBoundingClientRect().width * cols_nr + 'px';
  track_head.style.width = first_col_width + regular_col_ref.getBoundingClientRect().width * cols_nr + 'px';

  // Add class if scrolled
  scroller_body.addEventListener('scroll', act.throttle(function() {
    if (scroller_body.scrollLeft > 0) {
      obj.classList.add('comptab--scrolled');
    }
    else {
      obj.classList.remove('comptab--scrolled');
    }
  }, 10));

  // Is scrollable?
  if (scroller_body.offsetHeight > scroller_body.scrollHeight) {
    obj.classList.add('comptab--scrollable');
  }
  else {
    obj.classList.remove('comptab--scrollable');
  }

  // Sync scroll between head and body
  scroller_body.addEventListener('scroll', function() {
    scroller_head.scrollLeft = this.scrollLeft;
  }, {passive: true});

  // Add class when sticky for styling purposes
  if (obj.classList.contains('comptab--sticky-header')) {
    let new_element = document.createElement('div');
    new_element.classList.add('comptab__sticky-header-observer');
    function insertBefore(el, referenceNode) {
      referenceNode.parentNode.insertBefore(el, referenceNode);
    }
    insertBefore(new_element, header);
    let comptab_sticky_header_observer = new IntersectionObserver(
      function(entries) {
        if (entries[0].intersectionRatio === 0) {
          obj.classList.add('comptab--sticky-header-on');
        } else if (entries[0].intersectionRatio === 1) {
          obj.classList.remove('comptab--sticky-header-on');
        }
      },
      { threshold: [0, 1] }
    );
    comptab_sticky_header_observer.observe(obj.querySelector('.comptab__sticky-header-observer'));
  }
}

document.addEventListener('tippyready', function() {
  const comptab_tippy = tippy('.comptab__ttip', {
    content(ref) {
      return ref.querySelector('.comptab__ttip-content').innerHTML;
    },
    allowHTML: true,
    onTrigger(instance, event) {
      if (instance.reference.closest('.comptab').classList.contains('comptab--light')) {
        instance.setProps({
          theme: 'act-dark'
        });
      }
      else if (instance.reference.closest('.comptab').classList.contains('comptab--dark')) {
        instance.setProps({
          theme: 'act-light'
        });
      }
    },
    interactive: true,
    appendTo: () => document.body,
    aria: {
      content: null,
      expanded: false,
    }
  });
});