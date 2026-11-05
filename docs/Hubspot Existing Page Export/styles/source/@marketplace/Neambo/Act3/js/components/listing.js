listing.verify = {
  eq: function(prop, val) {
    if(val == '*') return true;
    if(prop.split(' ').includes(val)) return true;
    else return false;
  },
  ne: function(prop, val) {
    if(!prop.split(' ').includes(val)) return true;
    else return false;
  },
  gt: function(prop, val) {
    if(prop > val) return true;
    else return false;
  },
  gte: function(prop, val) {
    if(prop >= val) return true;
    else return false;
  },
  lt: function(prop, val) {
    if(prop < val) return true;
    else return false;
  },
  lte: function(prop, val) {
    if(prop <= val) return true;
    else return false;
  }
};

listing.filter = function(id){
  let filter_el = document.querySelectorAll('[listing="' + id + '"].listing__filter--active'),
      filter = [];
  for (let i = 0; i < filter_el.length; i++) {
    let attr = filter_el[i].attributes;
    for (let i = 0; i < attr.length; ++i) {
        let attr_name = attr[i].name.split('-');
        if(attr_name[0] == 'filter') {
          filter.push({
            prop: attr_name[1],
            op: attr_name[2],
            val: attr[i].value
          });
        }
    }
  }
  listing.obj[id].filter(function(item) {
      for (let i = 0; i < filter.length; ++i) {
        if(!listing.verify[filter[i].op](item.values()[filter[i].prop], filter[i].val)) return false;
      }
      return true;
  });
}

listing.obj = [];
listing.el = document.querySelectorAll('.listing__render');
  
for (let i = 0; i < listing.el.length; i++) {
  let id = listing.el[i].id;
  listing.obj[id] = new List(listing.el[i], listing.options[id], listing.values[id]);
  listing.obj[id].on('updated', function(list) {
    if(list.matchingItems.length == 0) listing.el[i].classList.add('no-results');
    else listing.el[i].classList.remove('no-results');
  });
  listing.filter(id);
  // Hide pagination if pages <= 1
  const $pagination = listing.el[i].querySelector('.listing__pagination');
  if (!!$pagination) {
    if (listing.obj[id].matchingItems.length <= listing.obj[id].page) $pagination.classList.add('listing__pagination--one-item');
    else $pagination.classList.remove('listing__pagination--one-item');
    listing.obj[id].on('updated', function() {
      if (listing.obj[id].matchingItems.length <= listing.obj[id].page) $pagination.classList.add('listing__pagination--one-item');
      else $pagination.classList.remove('listing__pagination--one-item');
    });
  }
}

listing.make_active = function(el) {
  if(!el) return;
  let filter_group = el.closest('.listing__filter-group'),
      active_class = filter_group.getAttribute('active-filter-class').split(' '),
      inactive_class = filter_group.getAttribute('inactive-filter-class').split(' ');
  for (let i = 0; i < inactive_class.length; i++)
    el.classList.remove(inactive_class[i]);
  for (let i = 0; i < active_class.length; i++)
    el.classList.add(active_class[i]);
}

listing.make_inactive = function(el) {
  if(!el) return;
  let filter_group = el.closest('.listing__filter-group'),
      active_class = filter_group.getAttribute('active-filter-class').split(' '),
      inactive_class = filter_group.getAttribute('inactive-filter-class').split(' ');
  for (let i = 0; i < active_class.length; i++)
    el.classList.remove(active_class[i]);
  for (let i = 0; i < inactive_class.length; i++)
    el.classList.add(inactive_class[i]);
}  

listing.filter_el = document.querySelectorAll('.listing__filter');
for (let i = 0; i < listing.filter_el.length; i++) {
  listing.filter_el[i].addEventListener('click', function(){
    let filter_group = this.closest('.listing__filter-group');
    if(this.classList.contains('listing__filter--active')) return;
    else {
      listing.make_inactive(filter_group.querySelector('.listing__filter--active'));
      listing.make_active(this);
    }
    listing.filter(this.getAttribute('listing'));
  });
}
  
listing.debounce = function (callback, delay) {
  let timeout;
  return function() {
    clearTimeout( timeout );
    timeout = setTimeout( callback, delay );
  }
}
  
listing.search_el = document.querySelectorAll('.listing__search-input');
for (let i = 0; i < listing.search_el.length; i++) {
  let id = listing.search_el[i].getAttribute('listing');
  listing.search_el[i].addEventListener('keyup', listing.debounce(function(){
    listing.obj[id].search(listing.search_el[i].value, listing.options[id].search);
  }, listing.options[id].searchDelay ));
}

listing.pagination = document.querySelectorAll('.listing__pagination');
for (let i = 0; i < listing.pagination.length; i++) {
  listing.pagination[i].addEventListener('click', function(event) {
    if (event.target.matches('a.page') || event.target.matches('li')) {
      let list = this.closest('.listing__items');
      act.scroll_to(list, act.scroll_offset.get());
    }
  });
}

// Filter list by URL hash
listing.hash_filter = function() {
  if(window.location.hash) {
    var paramsString = window.location.hash.substr(1);
  } else return;
  var searchParams = new URLSearchParams(paramsString);
  if(searchParams.has('filter')) {
    var url_filters = searchParams.get('filter').split(',');
    if(searchParams.has('list')) {
      var list_id = searchParams.get('list');
    } else {
      var list_id = document.querySelector('.listing__render').id;
    }
  } else return;
  document.querySelectorAll('[listing="'+ list_id +'"][filter-category-eq="*"]').forEach(filter_el => {filter_el.click()});
  for (var i = 0; i < url_filters.length; i++) {
    document.querySelectorAll('[listing="'+ list_id +'"][filter-category-eq="'+ url_filters[i] +'"]').forEach(filter_el => {filter_el.click()});
  }
  if(searchParams.has('scroll')) act.scroll_to(document.getElementById(searchParams.get('scroll')), act.scroll_offset.get());
}

listing.hash_filter();
window.addEventListener('hashchange', listing.hash_filter, false);

document.querySelectorAll('a[href*="#"]').forEach(item => {
  item.addEventListener('click', event => {
  	var hash = '#' + item.href.split('#')[1];
    if(hash == window.location.hash) listing.hash_filter();
  })
});