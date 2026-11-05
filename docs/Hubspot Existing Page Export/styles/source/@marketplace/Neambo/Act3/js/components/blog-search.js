let blog_search = document.querySelector('.blog-search'),
    blog_search_form = blog_search.querySelector('.blog-search__form'),
    blog_search_input = blog_search.querySelector('.blog-search__input'),
    blog_results = blog_search.querySelector('.blog-search__results');

function do_blog_search(e){
  e.preventDefault();
  blog_search_input.blur();
  let term = blog_search_input.value;
  if(term.length < 3) {
    blog_search.classList.remove('blog-search--searching');
    blog_search.classList.remove('blog-search--done');
    blog_results.innerHTML = '';
    return;
  }
  
  blog_search.classList.remove('blog-search--done');
  blog_search.classList.add('blog-search--searching');
  
  blog_results.innerHTML = '';
  
  let request = new XMLHttpRequest(),
      api = 'https://api.hubapi.com/contentsearch/v2/search?portalId={{ hub_id }}';
  for (let i = 0; i < blog_search_form.elements.length; i++) {
    if(blog_search_form.elements[i].name && blog_search_form.elements[i].value)
      api += '&' + blog_search_form.elements[i].name + '=' + encodeURIComponent(blog_search_form.elements[i].value);
  }
  request.open('GET', api);
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);
      if(data.total) {
        for (let i = 0; i < data.results.length; i++) {
          let item = document.createElement('div'),
              item_html = '';
          item.classList.add('blog-search__results-item');
          item_html = '<p class="blog-search__results-title ui-label"><a href="' + data.results[i].url + '">' + data.results[i].title + '</a></p>';
          item_html += '<p class="blog-search__results-desc small-text">' + data.results[i].description + '</p>';
          item.innerHTML = item_html;
          blog_results.appendChild(item);
        }
      } else {
        let txt = e.target.getAttribute('results-zero-text') || 'No results found.';
        blog_results.innerHTML = '<div class="blog-search__results-zero">' + txt + '</div>';
      }
      blog_search.classList.remove('blog-search--searching');
      blog_search.classList.add('blog-search--done');
    }
  };
  request.send();
}

function blog_search_reset() {
  blog_search.classList.remove('blog-search--done');
  blog_results.innerHTML = '';
  blog_search_input.value = '';
}

const blog_search_reset_btn = document.querySelectorAll('.blog-search__reset');

blog_search_reset_btn.forEach(btn => {
  btn.addEventListener('click', () => {
    blog_search_reset();
  })
});