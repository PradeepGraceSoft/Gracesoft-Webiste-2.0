
// ======================================================================
//
// Global variable
//
// ======================================================================
var windowWidth = $(window).width();


// ======================================================================
//
// Hero Banner Image
//
// ======================================================================
$(document).ready(function(){
    $('.hero-banner').each(function(){
        var bannerSource = $(this).find('.hero-image img').attr('src');
        $(this).css('background-image', 'url(' + bannerSource + ')');  
    });
});



// ======================================================================
//
// Video Trigger
//
// ======================================================================


$(document).ready(function() {
    $('.video-icon').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
    });
});


