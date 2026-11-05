function site_search(module) {
  const searchResultsWrapper = module.querySelector('.site-search__popup'),
        searchInput = module.querySelector('.site-search__input'),
        searchForm = module.querySelector('.site-search__form'),
        searchError = module.querySelector('.site-search__error'),
        searchResults = module.querySelector('.site-search__results-block'),
        resultTemplate = module.querySelector('.site-search__result-template'),
        loadMoreResults = module.querySelector('.site-search__more'),
        searchOpen = module.querySelector('.site-search__open'),
        searchClose = module.querySelector('.site-search__close');
  let term = '',
      limit = 10,
      offset = 0,
      portalId,
      language,
      no_results,
      domains,
      domains_param = '';
      
  function showResults(d) {
    let data = JSON.parse(d),
        results = data.results;
    if (data.total == 0) {
      searchResults.innerHTML = '<div class="site-search__results-zero">' + no_results + '</div>';
      return;
    }
    if (data.total > data.limit + data.offset) loadMoreResults.classList.add('site-search__more--active');
    else loadMoreResults.classList.remove('site-search__more--active');
    data.results.forEach(function(item) {
      let template = resultTemplate.cloneNode(true);
      template.querySelector('.site-search__result-title').innerHTML = '<a href="'+item.url+'">'+item.title+'</a>';
      template.querySelector('.site-search__result-desc').innerHTML = item.description;
      searchResults.appendChild(template);
    });
    searchResults.appendChild(loadMoreResults);
  }

  function search(term, offset) {
    if(!offset) offset = 0;
    let request = new XMLHttpRequest();
    request.open('GET', 'https://api.hubapi.com/contentsearch/v2/search?portalId=' + portalId + '&language=' + language + '&limit=' + limit + '&offset=' + offset + domains_param + '&term=' + term);
    request.onreadystatechange = function() {
      if(this.readyState === 4 && this.status === 200) showResults(this.responseText);
    };
    request.send();
  }

  resultTemplate.remove();
  resultTemplate.className = 'site-search__result';

  module.querySelector('.site-search__form').addEventListener('submit', function(e) {
    e.preventDefault();
    searchResults.innerHTML = '';
    offset = 0;
    term = e.target.elements.searchInput.value;
    language = e.target.elements.language.value;
    portalId = e.target.elements.portalId.value;
    domains = e.target.elements.domains.value;
    if(domains == 'all') domains_param = '';
    else if(domains == 'current') domains_param = '&domain=' + window.location.hostname;
    else {
      domains = domains.replace(/\s+/g, '');
      let domains_list = domains.split(',');
      for (let i = 0; i < domains_list.length; i++) if(domains_list[i]) domains_param = domains_param + '&domain=' + domains_list[i];
    }
    no_results = e.target.getAttribute('results-zero-text');
    search(term, offset);
    searchResultsWrapper.classList.add('site-search__popup--form-submitted');
    searchInput.blur();
  });

  loadMoreResults.addEventListener('click', function(e) {
    offset = offset + limit;
    search(term, offset);
  });

  function openSearchPopup() {
    document.body.classList.add('site-search-active');
    searchResultsWrapper.classList.add('site-search__popup--active');
    searchResultsWrapper.addEventListener('animationend', function() {
      if (!searchResultsWrapper.classList.contains('site-search__popup--form-submitted')) searchInput.focus();
    });
  }

  function closeSearchPopup() {
    document.body.classList.remove('site-search-active');
    searchResultsWrapper.classList.remove('site-search__popup--active');
    module.querySelector('.site-search__input').value = '';
    searchResults.innerHTML = '';
    searchInput.blur();
    searchResultsWrapper.classList.remove('site-search__popup--form-submitted');
  }

  searchOpen.addEventListener('click', openSearchPopup);
  searchClose.addEventListener('click', closeSearchPopup);

  document.addEventListener('click', function(event) {
    if (!event.target.closest('.site-search__results-block') && !event.target.closest('.site-search__open') && !event.target.closest('.site-search__form')) {
      closeSearchPopup();
    }
  });
}

var site_search_modules = document.querySelectorAll('.site-search');
for (i = 0; i < site_search_modules.length; i++) {
  site_search(site_search_modules[i]);
}