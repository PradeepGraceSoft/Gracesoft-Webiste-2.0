document.getElementById('blog_load_more_btn').addEventListener('click', function(){
  let load_more_btn = this,
      next_page_link = this.getAttribute('next-page-link'),
      post_list = document.getElementById('post-list'),
      blog_load_more = document.querySelector('.blog-load-more'),
      request = new XMLHttpRequest();
      
  blog_load_more.style.minHeight = blog_load_more.offsetHeight;
  blog_load_more.classList.add('blog-load-more--loading');

  request.open('GET', next_page_link);
  request.responseType = 'document';
  request.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      let new_posts = this.response.querySelectorAll('#post-list > *'),
          next_page_load_more_btn = this.response.getElementById('blog_load_more_btn');
      for (i = 0; i < new_posts.length; i++) {
        new_posts[i].classList.add('post-loaded');
        post_list.appendChild(new_posts[i]);
      }
      // Sets focus on the first item loaded
      new_posts[0].setAttribute('tabindex', 0);
      new_posts[0].focus();
      // Fixes z-index issue caused by the animation
      setTimeout(function(){
        for (i = 0; i < new_posts.length; i++) {new_posts[i].classList.remove('post-loaded')}
      }, 500);
      if(next_page_load_more_btn) {
        load_more_btn.setAttribute('next-page-link', next_page_load_more_btn.getAttribute('next-page-link'));
        blog_load_more.classList.remove('blog-load-more--loading');
      } else {
        blog_load_more.remove();
      }
    }
  };
  request.send();
});