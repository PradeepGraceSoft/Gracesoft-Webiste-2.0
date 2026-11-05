const modal_open_event = new Event('modalopen');
const modal_closed_event = new Event('modalclosed');

// Open

function open_modal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    // Open modal
    modal.classList.add('modal--active');
    document.body.classList.add('modal-active');
    // Add arrows if part of a group with at least two items
    modal_group_init(modal);
    // Set focus within to navigate with 'Tab' key (a11y)
    modal.setAttribute('tabindex', 0);
    modal.addEventListener('animationend', (e) => {
      if (e.target === modal) modal.focus();
      e.stopImmediatePropagation();
    });
    // Close with Escape key and Tab away
    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close_modal(modal.id);
      }
      else if (e.key === 'Tab') { 
        setTimeout(function() {
          if (!act.isfocuswithin(modal)) {
            close_modal(modal.id);
          }
        }, 100);
      }
    });
    // Dispatch 'modalopen' event
    modal.dispatchEvent(modal_open_event);
  }
}

// Close

function close_modal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    // Close modal
    modal.classList.remove('modal--active');
    document.body.classList.remove('modal-active');
    // Remove arrows if any
    const modal_arrows = modal.querySelector('.modal__arrows');
    if (!!modal_arrows) modal_arrows.remove();
    // Prevent keydown bubble
    modal.addEventListener('keydown', function(e) {
      e.stopImmediatePropagation();
    });
    // Dispatch 'modalclosed' event
    modal.dispatchEvent(modal_closed_event);
  }
}

// Group/arrows

function modal_group_init(modal) {
  // Check for this modal's data-modal-group attribute
  if ('modalGroup' in modal.dataset) {
    const group = modal.dataset.modalGroup;
    // Get all modals from this group
    const group_modals = document.querySelectorAll('.modal[data-modal-group="' + group + '"]');
    // Append arrows if there is at least one other modal in this group
    if (group_modals.length > 1) {
      modal.classList.add('modal--has-arrows');
      let prev_svg, next_svg;
      if (document.documentElement.getAttribute('dir') == 'rtl') {
        prev_svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32218 2.32544C6.75176 1.89152 7.44824 1.89152 7.87782 2.32544L17.6778 11.2143C18.1074 11.6482 18.1074 12.3518 17.6778 12.7857L7.87782 21.6746C7.44824 22.1085 6.75176 22.1085 6.32218 21.6746C5.89261 21.2406 5.89261 20.5371 6.32218 20.1032L15.3444 12L6.32218 3.89679C5.89261 3.46287 5.89261 2.75935 6.32218 2.32544Z" fill="currentColor"/></svg>';
        next_svg = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.6778 2.32544C17.2482 1.89152 16.5518 1.89152 16.1222 2.32544L6.32219 11.2143C5.89261 11.6482 5.89261 12.3518 6.32219 12.7857L16.1222 21.6746C16.5518 22.1085 17.2482 22.1085 17.6778 21.6746C18.1074 21.2406 18.1074 20.5371 17.6778 20.1032L8.65564 12L17.6778 3.89679C18.1074 3.46287 18.1074 2.75935 17.6778 2.32544Z" fill="currentColor"/></svg>';
      }
      else {
        prev_svg = '<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M17.6778 2.32544C17.2482 1.89152 16.5518 1.89152 16.1222 2.32544L6.32219 11.2143C5.89261 11.6482 5.89261 12.3518 6.32219 12.7857L16.1222 21.6746C16.5518 22.1085 17.2482 22.1085 17.6778 21.6746C18.1074 21.2406 18.1074 20.5371 17.6778 20.1032L8.65564 12L17.6778 3.89679C18.1074 3.46287 18.1074 2.75935 17.6778 2.32544Z" fill="currentColor"/></svg>';
        next_svg = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.32218 2.32544C6.75176 1.89152 7.44824 1.89152 7.87782 2.32544L17.6778 11.2143C18.1074 11.6482 18.1074 12.3518 17.6778 12.7857L7.87782 21.6746C7.44824 22.1085 6.75176 22.1085 6.32218 21.6746C5.89261 21.2406 5.89261 20.5371 6.32218 20.1032L15.3444 12L6.32218 3.89679C5.89261 3.46287 5.89261 2.75935 6.32218 2.32544Z" fill="currentColor"/></svg>';
      }
      for (i = 0; i < group_modals.length; i++) {
        if (group_modals[i] == modal) {
          let prev_modal, next_modal;
          if (!!group_modals[i - 1]) prev_modal = group_modals[i - 1].id;
          else if (group_modals[i] == group_modals[0]) prev_modal = group_modals[group_modals.length - 1].id;
          if (!!group_modals[i + 1]) next_modal = group_modals[i + 1].id;
          else if (group_modals[i] == group_modals[group_modals.length - 1]) next_modal = group_modals[0].id;
          modal.insertAdjacentHTML('beforeend', '<div class="modal__arrows"><a class="modal__arrow modal__arrow--prev" href="javascript:;" close-modal="'+modal.id+'" open-modal="'+prev_modal+'" role="button" aria-label="Previous">'+prev_svg+'</a><a class="modal__arrow modal__arrow--next" href="javascript:;" close-modal="'+modal.id+'" open-modal="'+next_modal+'" role="button" aria-label="Next">'+next_svg+'</a></div>');          
          // Navigate with arrow keys (a11y)
          modal.addEventListener('keydown', (e) => {
            if (e.key == 'ArrowLeft') {
              close_modal(modal.id);
              if (document.documentElement.getAttribute('dir') == 'rtl') open_modal(next_modal);
              else open_modal(prev_modal);
            }
            else if (e.key == 'ArrowRight') {
              close_modal(modal.id);
              if (document.documentElement.getAttribute('dir') == 'rtl') open_modal(prev_modal);
              else open_modal(next_modal);
            }
          });
          // Touch/swipe nav
          act.swipedetect(modal, function(swipedir) {
            if (swipedir =='right') {
              close_modal(modal.id);
              if (document.documentElement.getAttribute('dir') == 'rtl') open_modal(next_modal);
              else open_modal(prev_modal);
            }
            else if (swipedir =='left') {
              close_modal(modal.id);
              if (document.documentElement.getAttribute('dir') == 'rtl') open_modal(prev_modal);
              else open_modal(next_modal);
            }
          });
          return;
        }
      }
    }
  }
}

// Handle special content

// Iframes load/unload
const modal_iframe = document.getElementsByClassName('modal__iframe');
for (let i = 0; i < modal_iframe.length; i++) {
  modal_iframe[i].closest('.modal').addEventListener('modalopen', function(e) {
    if (modal_iframe[i].hasAttribute('data-src')) {
      modal_iframe[i].setAttribute('src', modal_iframe[i].getAttribute('data-src'));
      modal_iframe[i].removeAttribute('data-src');
    }
  });
  modal_iframe[i].closest('.modal').addEventListener('modalclosed', function(e) {
    if (modal_iframe[i].hasAttribute('src')) {
      modal_iframe[i].setAttribute('data-src', modal_iframe[i].getAttribute('src'));
      modal_iframe[i].removeAttribute('src');
    }
  });
}
// Videos/audios autoplay/pause
const modal_media = document.getElementsByClassName('modal__media');
for (let i = 0; i < modal_media.length; i++) {
  modal_media[i].closest('.modal').addEventListener('modalopen', function(e) {
    if (modal_media[i].hasAttribute('data-autoplay')) {
      modal_media[i].play();
    }
  });
  modal_media[i].closest('.modal').addEventListener('modalclosed', function(e) {
    modal_media[i].pause();
  });
}

// Open/close modal shortcuts
document.addEventListener("click", function(e){
  const link = e.target.closest("[open-modal]");
  if(link) open_modal(link.getAttribute('open-modal'));
});
document.addEventListener("click", function(e){
  const link = e.target.closest("[close-modal]");
  if(link) close_modal(link.getAttribute('close-modal'));
});