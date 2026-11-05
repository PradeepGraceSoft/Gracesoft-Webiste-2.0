/*-----------------------------------------------------------------------------------
SCRIPTS INDEXING
===================
01. Fixed Header Script
02. Header Menu Script
03. Simple Header CTA Slicing
04. Theme Color Scheme Change Script
05. Counter Up Script
06. Blog Filter Script
07. Blog Author Activation Script
08. Sidebar Menu Script
09. Simple Sidebar Menu Slicing Script
10. Blog Listing and Author Search Script
    10.1 Blog Listing Search Bar Script
		10.2 Blog Author Search Bar Script
11. Blog Listing Load More Script
12. Blog Listing DropDown Script
13. Blog Author Copy Link Script
14. Search Result and search pagination
15. Animation On Scroll Disable On Certain Screensize Script 
16. Accordion Js
17. 
-----------------------------------------------------------------------------------*/

{# ===============================================================================================================================================
======================================================================Fixed Header Script=========================================================
================================================================================================================================================== #}
$(window).scroll(function(){
	if ($(this).scrollTop() > 1) {
		$('.header-container-wrapper .header-grp').addClass('fixed');
	} else {
		$('.header-container-wrapper .header-grp').removeClass('fixed');
	}
});


{# ===============================================================================================================================================
======================================================================Header Menu Script==========================================================
================================================================================================================================================== #}
$(function() {
	/** 
     * Mobile Nav
     *
     * Hubspot Standard Toggle Menu
     */
	$('.custom-menu-primary').addClass('js-enabled');
	$('.custom-menu-primary .hs-menu-wrapper').before('<div class="mobile-trigger"><i></i></div>');
	$('.custom-menu-primary .flyouts .hs-item-has-children > a').after(' <div class="child-trigger"><i></i></div>');
	$('.mobile-trigger').click(function() {
		$(this).next('.custom-menu-primary .hs-menu-wrapper').slideToggle(250);
		$('body').toggleClass('mobile-open');
		$('.child-trigger').removeClass('child-open');
		$('.hs-menu-children-wrapper').slideUp(250);
		return false;
	});
	$('.child-trigger').click(function() {
		$(this).parent().siblings('.hs-item-has-children').find('.child-trigger').removeClass('child-open');
		$(this).parent().siblings('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250);
		$(this).next('.hs-menu-children-wrapper').slideToggle(250);
		$(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250);
		$(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.child-trigger').removeClass('child-open');
		$(this).toggleClass('child-open');
		return false;
	});
});


{# ===============================================================================================================================================
======================================================================Simple Header CTA Slicing===================================================
================================================================================================================================================== #}


$(document).ready(function(){
	function resizeHandler() {
		if ($(window).width() <= 750) {
			$(".simple-header-sec .header_cta_cont .header-cta").slice().appendTo(".simple-header-sec .custom-menu-primary .hs-menu-wrapper>ul");
		}
		else{
			$(".simple-header-sec .custom-menu-primary .header-cta").slice().prependTo(".simple-header-sec .header_cta_cont");
		}
	}
	resizeHandler();
	$(window).resize(resizeHandler);

});

$(document).ready(function(){
	$(".simple-header-sec li.hs-item-has-children").each(function() {
		var list_child = $(this).find("li.hs-menu-depth-2").length
		if (list_child >= 4) {
			$(this).find("ul.hs-menu-children-wrapper").addClass("make-it-table")
		}
	})

});




{# ===============================================================================================================================================
======================================================================Theme Color Scheme Change Script============================================
================================================================================================================================================== #}
document.addEventListener('DOMContentLoaded', function() {
	var button = document.getElementById('toggleButton');
	button.addEventListener('click', toggleBodyClass);

	// Check if the class is already added to the body
	if (localStorage.getItem('darkThemeAdded')) {
		addBodyClass();
	}
});

function toggleBodyClass() {
	var body = document.body;

	if (body.classList.contains('dark_theme')) {
		removeBodyClass();
	} else {
		addBodyClass();
	}
}

function addBodyClass() {
	var body = document.body;
	body.classList.add('dark_theme');
	localStorage.setItem('darkThemeAdded', 'true');
}

function removeBodyClass() {
	var body = document.body;
	body.classList.remove('dark_theme');
	localStorage.removeItem('darkThemeAdded');
}


// $(document).ready(function(){
// 	$('.toggle_me_now .switch_theme_scheme input:checkbox').change(function(){
// 		if($(this).is(":checked")) {
// 			$('body').addClass("dark_theme");
// 		} else {
// 			$('body').removeClass("dark_theme");
// 		}
// 	});
// });

// Function to set the theme preference in local storage
function setThemePreference() {
	var checkbox = document.getElementById('toggle_dark_theme');
	var body = document.body;
	if (checkbox.checked) {
		body.classList.add('dark_theme');
		localStorage.setItem('theme', 'dark');
	} else {
		body.classList.remove('dark_theme');
		localStorage.setItem('theme', 'light');
	}
}

// Check the theme preference from local storage on page load
function checkThemePreference() {
	var theme = localStorage.getItem('theme');
	var checkbox = document.getElementById('toggle_dark_theme');
	var body = document.body;
	if (theme === 'dark') {
		body.classList.add('dark_theme');
		checkbox.checked = true;
	} else {
		body.classList.remove('dark_theme');
		checkbox.checked = false;
	}
}
checkThemePreference();
var checkbox = document.getElementById('toggle_dark_theme');
checkbox.addEventListener('change', setThemePreference);






{# ===============================================================================================================================================
======================================================================Counter Up Script===========================================================
================================================================================================================================================== #}

$(document).ready(function(){
	$('.count').counterUp({
		delay: 10,
		time: 2000
	});
	$('.count').addClass('animated fadeInDownBig');
	$('h5').addClass('animated fadeIn');
});

{# ===============================================================================================================================================
======================================================================Blog Filter Script==========================================================
================================================================================================================================================== #}


$(document).ready(function(){
	$(function(){
		$('.hs-blog-listing .filter ul li a').each(function() {
			if ($(this).prop('href') == window.location.href) {
				$('.all').removeClass('active');
				$(this).addClass('active');
			}
		});
	});
});


{# ===============================================================================================================================================
======================================================================Blog Author Activation Script===============================================
================================================================================================================================================== #}


{% if blog_author %}
$('body').addClass('hs-single-author');
{% endif %}




{# ===============================================================================================================================================
======================================================================Sidebar Menu Script=========================================================
================================================================================================================================================== #}


$(document).ready(function(){
	$('.main-sidebar .image-cont .menu-close').click(function(){
		$('.side-bar-menu').toggleClass('cont-open');                                          
	});
	$('.main-sidebar .image-cont .menu-open').click(function(){
		$('.side-bar-menu').toggleClass('cont-open');                                          
	});
});


{#  ===============================================================================================================================================
======================================================================Simple Sidebar Menu Slicing Script==========================================
================================================================================================================================================== #}


$(function() {
	var win = $(window);
	resizeHandler();
	win.resize(resizeHandler);
	function resizeHandler() {
		if (win.width() <= 767) {
			$('.simple_sidebar_menu .slice-cta .header-cta').slice().appendTo('.simple_sidebar_menu .custom-menu-primary .hs-menu-wrapper>ul');
		}
		else{
			$('.simple_sidebar_menu .slice-cta .header-cta').slice().prependTo('.simple_sidebar_menu .slice-cta .header-cta');
		}
	}
});


{#  ===============================================================================================================================================
======================================================================Blog Listing and Author Search Script=======================================
================================================================================================================================================== #}


// Blog Listing Search Bar Script
$(document).ready(function(){
	$("#searchbar").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".listing .post-item").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});
// Blog Author Search Bar Script
$(document).ready(function(){
	$("#authorsearchbar").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".author-banner .listing .post-item").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});


{# ===============================================================================================================================================
======================================================================Blog Listing Load More Script===============================================
================================================================================================================================================== #}


{% if theme.blog_group.blog_listing.pagination == "load_more_button"  %}
$(document).ready(function(){
	var list = $(".load-more .listing .post-item");
	var numToShow = 3;
	var button = $("#next");
	var nocontent = $("#less");
	var numInList = list.length;
	list.hide();
	if (numInList > numToShow) {
		button.show();
		nocontent.hide();
	}
	list.slice(0, numToShow).show();
	button.click(function(){
		var showing = list.filter(':visible').length;
		list.slice(showing - 1, showing + numToShow).fadeIn();
		var nowShowing = list.filter(':visible').length;
		if (nowShowing >= numInList) {
			button.hide();
			nocontent.show();
		}
	});
});
{% endif %}


{#  ===============================================================================================================================================
======================================================================Blog Listing DropDown Script================================================
================================================================================================================================================== #}


{% if theme.blog_group.blog_listing.show_filter_bar == "dropdown" %}
$(document).ready(function(){
	$(".main-conta h4").click(function(){
		$(".drop_down , .main-conta").toggleClass("showMenu");
		$(".drop_down > li").click(function(){
			$(".main-conta > h4").text($(this).text());
			$(".drop_down").removeClass("showMenu");
		});
	});
});
{% endif %}


{# ===============================================================================================================================================
======================================================================Blog Author Copy Link Script================================================
================================================================================================================================================== #}
$(document).ready(function(){
	$(".url_collect").click(function(){
		// Get the text field
		var copyText = document.getElementById("myInput");
		var popup = document.getElementById("popupbox");
		// Select the text field
		copyText.select();
		copyText.setSelectionRange(0, 99999); // For mobile devices
		// Copy the text inside the text field
		navigator.clipboard.writeText(copyText.value);
		$('.pop-up-box').addClass('popupbox_one');
		setTimeout(function() { $('.pop-up-box').removeClass('popupbox_one');
													},800);
	});
});
 

{#  ===============================================================================================================================================
======================================================================Search Result and search pagination=====================================================
================================================================================================================================================== #}


var hsResultsPage = function(_resultsClass) {
	function buildResultsPage(_instance) {
		var resultTemplate = _instance.querySelector(
			'.hs-search-results__template'
		);
		var resultsSection = _instance.querySelector('.hs-search-results__listing');
		var searchPath = _instance
		.querySelector('.hs-search-results__pagination')
		.getAttribute('data-search-path');
		var prevLink = _instance.querySelector('.hs-search-results__prev-page');

		var nextLink = _instance.querySelector('.hs-search-results__next-page');

		var searchParams = new URLSearchParams(window.location.search.slice(1));

		/**
     * v1 of the search input module uses the `q` param for the search query.
     * This check is a fallback for a mixed v0 of search results and v1 of search input.
     */

		if (searchParams.has('q')) {
			searchParams.set('term', searchParams.get('q'));
			searchParams.delete('q');
		}

		function getTerm() {
			return searchParams.get('term') || '';
		}
		function getOffset() {
			return parseInt(searchParams.get('offset')) || 0;
		}
		function getLimit() {
			return parseInt(searchParams.get('limit'));
		}
		function addResult(title, url, description, featuredImage) {
			var newResult = document.importNode(resultTemplate.content, true);
			function isFeaturedImageEnabled() {
				if (
					newResult.querySelector('.hs-search-results__featured-image > img')
				) {
					return true;
				}
			}
			newResult.querySelector('.hs-search-results__title').innerHTML = title;
			newResult.querySelector('.hs-search-results__title').href = url;
			newResult.querySelector(
				'.hs-search-results__description'
			).innerHTML = description;
			if (typeof featuredImage !== 'undefined' && isFeaturedImageEnabled()) {
				newResult.querySelector(
					'.hs-search-results__featured-image > img'
				).src = featuredImage;
			}
			resultsSection.appendChild(newResult);
		}
		function fillResults(results) {
			results.results.forEach(function(result, i) {
				addResult(
					result.title,
					result.url,
					result.description,
					result.featuredImageUrl
				);
			});
		}
		function emptyPagination() {
			prevLink.innerHTML = '';
			nextLink.innerHTML = '';
		}
		function emptyResults(searchedTerm) {
			resultsSection.innerHTML =
				'<div class="hs-search__no-results"><p>Sorry. There are no results for "' +
				searchedTerm +
				'"</p>' +
				'<p>Try rewording your query, or browse through our site.</p></div>';
		}
		function setSearchBarDefault(searchedTerm) {
			var searchBars = document.querySelectorAll('.hs-search-field__input');
			Array.prototype.forEach.call(searchBars, function(el) {
				el.value = searchedTerm;
			});
		}
		function httpRequest(term, offset) {
			var SEARCH_URL = '/_hcms/search?';
			var requestUrl = SEARCH_URL + searchParams + '&analytics=true';
			var request = new XMLHttpRequest();

			request.open('GET', requestUrl, true);
			request.onload = function() {
				if (request.status >= 200 && request.status < 400) {
					var data = JSON.parse(request.responseText);
					setSearchBarDefault(data.searchTerm);
					if (data.total > 0) {
						fillResults(data);
						paginate(data);
					} else {
						emptyResults(data.searchTerm);
						emptyPagination();
					}
				} else {
					console.error('Server reached, error retrieving results.');
				}
			};
			request.onerror = function() {
				console.error('Could not reach the server.');
			};
			request.send();
		}
		function paginate(results) {
			var updatedLimit = getLimit() || results.limit;

			function hasPreviousPage() {
				return results.page > 0;
			}
			function hasNextPage() {
				return results.offset <= results.total - updatedLimit;
			}

			if (hasPreviousPage()) {
				var prevParams = new URLSearchParams(searchParams.toString());
				prevParams.set(
					'offset',
					results.page * updatedLimit - parseInt(updatedLimit)
				);
				prevLink.href = '/' + searchPath + '?' + prevParams;
				prevLink.innerHTML = '&lt; Previous page';
			} else {
				prevLink.parentNode.removeChild(prevLink);
			}

			if (hasNextPage()) {
				var nextParams = new URLSearchParams(searchParams.toString());
				nextParams.set(
					'offset',
					results.page * updatedLimit + parseInt(updatedLimit)
				);
				nextLink.href = '/' + searchPath + '?' + nextParams;
				nextLink.innerHTML = 'Next page &gt;';
			} else {
				nextLink.parentNode.removeChild(nextLink);
			}
		}
		var getResults = (function() {
			if (getTerm()) {
				httpRequest(getTerm(), getOffset());
			} else {
				emptyPagination();
			}
		})();
	}
	(function() {
		var searchResults = document.querySelectorAll(_resultsClass);
		Array.prototype.forEach.call(searchResults, function(el) {
			buildResultsPage(el);
		});
	})();
};

if (
	document.attachEvent
	? document.readyState === 'complete'
	: document.readyState !== 'loading'
) {
	var resultsPages = hsResultsPage('div.hs-search-results');
} else {
	document.addEventListener('DOMContentLoaded', function() {
		var resultsPages = hsResultsPage('div.hs-search-results');
	});
}


{# ===============================================================================================================================================
                                                 Animation On Scroll Disable On Certain Screensize Script 
================================================================================================================================================== #}


{% macro diableAnimationOn() %}
{% if theme.animation_group.animation_on_scroll.disable_animation_on == "mobile_tablet" %}
'tablet', 'mobile'
{% elif theme.animation_group.animation_on_scroll.disable_animation_on == "tablet" %}
'tablet'
{% elif theme.animation_group.animation_on_scroll.disable_animation_on == "mobile" %}
'mobile'
{% elif theme.animation_group.animation_on_scroll.disable_animation_on == "none" %}
false
{% endif %}
{% endmacro %}
AOS.init({
	disable: {{ diableAnimationOn() }} // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function

}); 


	// Filter Js  start

	$(document).ready(function(){
	$(".filter-button").click(function(){
	var value = $(this).attr('data-filter');
	$('.filter-button').removeClass('active');
	$(this).addClass('active');
	if(value == "all")
	{
	$('.cards').show('1000');
}
				 else
				 {
				 $(".cards").not('.'+value).hide('3000');
$('.cards').filter('.'+value).show('3000');
}
});
});

// Filter Js End


// ************************************************ Accordion Js *****************************************

var $accordion = $('.accordion');
$accordion.find('.accordion-content').hide();
$accordion.find('.accordion-group.expanded .accordion-content').show();
$accordion.find('.accordion-header').click(function(){
	$accordion.find(".accordion-header").not(this).parent(".accordion-group.expanded").removeClass('expanded').children('.accordion-content').stop(true,true).slideUp();
	if(!$(this).parent('.accordion-group').hasClass('expanded')){
		$(this).parent(".accordion-group").addClass('expanded').children('.accordion-content').stop(true,true).slideDown();
	}
	else{
		$(this).parent(".accordion-group").removeClass('expanded').children('.accordion-content').stop(true,true).slideUp();
	}
});



// ************************************************ Gallery filter Popup Module  ************************************


$(document).ready(function(){
	$(".filter-button").click(function(){
		var value = $(this).attr('data-filter');
		$('.filter-button').removeClass('active');
		$(this).addClass('active');
		if(value == "all")
		{
			$('.cards').show();
		}
		else
		{
			$(".cards").not('.'+value).hide();
			$('.cards').filter('.'+value).show();
		}
	});
});




//========================================== Image Gallery Popup ============================================

$(document).ready(function(){
	$('.popup-vimeo, popup-mp, video-popup-cm').magnificPopup({
		disableOn: 320,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		autoplay: true
	});
});

//==========================================Thankyou  page============================================


$(document).ready(function(){
	$('.emoji-section .choice').eq(0).addClass('current');
	$('.reaction').eq(0).addClass('current');
	$('.emoji-section .choice').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('.emoji-section .choice').removeClass('current');
		$('.reaction').removeClass('current');
		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
});



/*****==================
Tabber SCRIPT 04
===================****/

$(document).ready(function(){
	$('.tab-container04 .tab-link').eq(0).addClass('current');
	$('.content-box04').eq(0).addClass('current');
	$('.tab-container04 .tab-link').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('.tab-container04 .tab-link').removeClass('current');
		$('.content-box04').removeClass('current');
		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
});


/*****==================
Vertical Tabber SCRIPT 04
===================****/


$(document).ready(function(){
	$('.vertical-tabber-section .tabber-column .tab-links').eq(0).addClass('current');
	$('.tabber-content .tabcontent').eq(0).addClass('current');
	$('.vertical-tabber-section .tabber-column .tab-links').click(function(){
		var tab_id = $(this).attr('data-tab');
		$('.vertical-tabber-section .tabber-column .tab-links').removeClass('current');
		$('.tabber-content .tabcontent').removeClass('current');
		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	});
});




/*****==================
Updated Top Bar Header
===================****/

jQuery(document).ready(function (e) {
	function t(t) {
		e(t).bind("click", function (t) {
			t.preventDefault();
			e(this).parent().fadeOut()
		})
	}
	e(".dropdown-toggle").click(function () {
		var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
		e(".button-dropdown .dropdown-menu").hide().removeClass("dropdown_active");
		e(".button-dropdown .dropdown-toggle").removeClass("active");
		if (t) {
			e(this).parents(".button-dropdown").children(".dropdown-menu").addClass("dropdown_active").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active");
		}
	});
	e(document).bind("click", function (t) {
		var n = e(t.target);
		if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide().removeClass("dropdown_active");
	});
	e(document).bind("click", function (t) {
		var n = e(t.target);
		if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
	})
});


$(document).ready(function(){
	$('.offer_bar .icon_button').click(function(){
		$('.offer_bar').addClass('remove');
	});
});

$(function() {
	$('.header-section').removeClass('toggled');

	$('.top_bar .right-col .search-bar button').click(function(e) {
		e.stopPropagation();
		$('.header-section').toggleClass('toggled');
		$(".header-search-popup").focus();
		$(".language-swithcher .dropdown-menu").hide();
		$(".language-swithcher .dropdown-toggle").removeClass('active');
	});

	$('.header-search-popup input').click(function(e) {
		e.stopPropagation();
	});

	$('.header-section, body').click(function() {
		$('.header-section').removeClass('toggled');
	});

	$('a.dropdown-toggle').click( function(e) {
		e.preventDefault();
	});
});



/*****==================
Popup Module
===================****/

$(document).ready(function(){
	$('.popup-btn').click(function(){ 
		var popupBlock = $('#'+$(this).data('active_popup'));

		setTimeout(function(){
			$('body').addClass('active_popup');
			popupBlock.css('opacity','').find('.popup-content').css('margin-top','');
		}, 200);
	});

	$('.overlay').click(function(){ 
		var popupBlock = $('#'+$(this).data('popup'));

		setTimeout(function(){
			$('body').removeClass('active_popup');
			popupBlock.css('opacity','').find('.popup-content').css('margin-top','');
		}, 200);
	});

});




//================ Search script ====================

$(document).ready(function(){
	$("#search").on("keyup", function() {
		var value = $(this).val().toLowerCase();
		$(".isotope .grid-item").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		});
	});
});

// --------------------------------Onscroll activate sidebar-----------------

$(window).scroll(function() {
	var windscroll = $(window).scrollTop();
	if (windscroll >= 100) {
		$('.content-container .content').each(function(i) {
			// The number at the end of the next line is how pany pixels you from the top you want it to activate.
			if ($(this).position().top <= windscroll + 100) {
				$('.content-title-conta .content-title .color.active').removeClass('active');
				$('.content-title-conta .content-title .color').eq(i).addClass('active');
			}
		});

	} else {

		$('.content-title-conta .content-title .color.active').removeClass('active');
		$('.content-title-conta .content-title .color:first').addClass('active');
	}

}).scroll();