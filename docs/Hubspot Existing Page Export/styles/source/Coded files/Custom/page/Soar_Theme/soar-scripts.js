/****************************
*   SOAR TEMPLATE SCRIPTS   *
****************************/


$(document).ready(function() {
    
    /* Add menu items and classes */
    $('.custom-menu-primary').addClass('js-enabled');
    $('.custom-menu-primary .layout-widget-wrapper').before('<div class="mobile-trigger">MENU</div>');
    $('.custom-menu-primary .layout-widget-wrapper').append('<div class="close-menu"></div>');
    
    $('.custom-menu-primary .flyouts .hs-item-has-children > a').after('<div class="child-trigger"></div>');

    $('.child-trigger').click(function() {
        $(this).parent().siblings('.hs-item-has-children').find('.child-trigger').removeClass('child-open');
        $(this).parent().siblings('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250);
        $(this).next('.hs-menu-children-wrapper').slideToggle(250);
        $(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.hs-menu-children-wrapper').slideUp(250);
        $(this).next('.hs-menu-children-wrapper').children('.hs-item-has-children').find('.child-trigger').removeClass('child-open');
        $(this).toggleClass('child-open');
        return false;
    });
    
    

    /* Bind open/close buttons for blog subscribe overlay */        
    $('.open-subscribe').on('click', function() {
        $('body').addClass('no-scroll');
        $('.subscribe-form').addClass('open');
    });    
    $('.close-subscribe').on('click', function() {
        $('body').removeClass('no-scroll');
        $('.subscribe-form').removeClass('open');
    });
    
    /* Bind open/close buttons for mobile nav overlay */
    $('.mobile-trigger').on('click', function() {
        $('body').addClass('menu-open');
        $('.custom-menu-primary').addClass('open');
    });  
    $('.close-menu').on('click', function() {
        $('body').removeClass('menu-open');
        $('.custom-menu-primary').removeClass('open');
        $('.custom-menu-primary').addClass('closed');
    });

    /* Move Homepage RSS Featured Image to BG Image */
    $('.hs-rss-featured-image').each(function() {
        imageUrl = $(this).attr('src');
        $(this).parent('.hs-rss-item-image-wrapper').css('background-image', 'url(' + imageUrl + ')');
        $(this).remove();
    });
    
    
});


$(window).load(function() {
    
    /* Adds class to parent element of <select> */
    $('select').parent().addClass('hs-select');
    
    /* Set Up Form Classes */    
    $('.inputs-list').parent('.input').addClass('hs-inputs-list');
    
    /* Find last visible element of 2 col form */
    $('fieldset > div:hidden').parent().addClass('hidden-field');
    $(".hs-form > fieldset:not('.hidden-field'):last").addClass('last-field');

    /* Find last visible element in 1 col form */
    $('.hs-form > div:hidden').addClass('hidden-field');
    $(".hs-form > div:not('.hidden-field'):not('.hs_submit'):last").addClass('last-field');
    
    /* Adjust form on page load */
    adjustFormSubmit();

});
$(window).resize(function() {
    
    /* Adjust form on window resize */
    adjustFormSubmit();
    
});

/* Adjust last element of form to fit submit button */
function adjustFormSubmit() {
    if (window.innerWidth >= 800) {
        
        /* Find all forms and adjust */   
        $(':not(#comment-form)').children('.hs-form').each(function() {

            $(this).find('.hs_submit').css('position','absolute');
            
            if ($(this).find('.hs_submit').innerWidth() < ($(this).outerWidth() / 2 )) {
                var subWidth = $(this).find('.last-field').siblings('.hs_submit').outerWidth();
                $(this).find('.last-field').css('padding-right', subWidth + 10);    
            }
            else {
                $(this).find('.hs_submit').css('position','static');
                $(this).find('.last-field').css('padding-right', 0);  
            }
            
        });
        
    }
    else {
        $('.hs_submit').css('position','static');
        $('.last-field').css('padding-right', 0);  
        
    }
}


/* Sticky Footer */
function updateHeight(){
    var bodyHeight = $( window ).height() - $('.header-container-wrapper').outerHeight() - $('.footer-container-wrapper').outerHeight();
    $('.body-container-wrapper').css('min-height', bodyHeight + 'px');
}
updateHeight();
$(window).on("resize", updateHeight);
