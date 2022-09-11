//----------------------------------------------------------
// Actions on document load
$(document).ready(function() {
  // --- our code goes here ---
  console.log("document ready - take three");

  // const element = document.querySelector('main')
  // const position = element.getBoundingClientRect()

  // Determine Offset of Main
  const height = $('main').offset().top - 100;

//----------------------------------------------------------
// Action on Resize
  $(window).on('resize', function() {
    location.reload();
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Document Load - Check Darkmode
  // console.log('load event occured');
  // console.log("darkmode status on load", localStorage.getItem('darkmode'));
  if (localStorage.getItem('darkmode') === 'true') {
    $('body').addClass('darkbody');
    $('nav').addClass('darknav');
    $('.userinfo').attr('id', 'darkheader');
    $('.tweeticon').attr('id', 'darkicon');
    $('article').addClass('darkarticle');
    $('#tweet-text').css('background-image', 'none')
    $('.darkmode').addClass('fa-sun');
    $('.darkmode').removeClass('fa-moon');
  }
//----------------------------------------------------------


//----------------------------------------------------------
// Action on Scroll
  $(window).on("scroll", function() {
    // Hide New Tweet Section
    if ($(window).scrollTop() > $('main').offset().top) {
      $('.new-tweet').hide();
    }
    // Show Back To Top Button
    if ($(window).scrollTop() > $('article').first().offset().top) {
      $('.back-top').show();
    }
    // Hide Back to Top Button
    if ($(window).scrollTop() < $('article').first().offset().top) {
      $('.back-top').hide();
    }
    // CSS Change Nav Bar on Scroll & Dark Mode Fixed
    if ($(window).scrollTop() > $('main').offset().top - 100) {
      $('nav').css('border-style',"solid");
      $('.darkspan').css({'position':'fixed','top': '100px', 'right':'0'});
    } else if ($(window).width() >= 1024) {
      $('nav').css('border-style',"solid solid none solid");
    } else {
      $('nav').css('border-style',"solid solid none solid");
      $('.darkspan').css({'position':'static','top': '', 'right':''});
    }

  });
//----------------------------------------------------------

//----------------------------------------------------------
// New Tweet - Nav Bar
  $('.new-tweeter').on('click', function(event) {
    event.preventDefault();
    // Action if Past Main
    if ($(window).scrollTop() > $('main').offset().top - 100) {
      if ($('.new-tweet').is(':visible')) {
        $("html, body").stop().animate({ scrollTop: height}, "slow");
        $('#tweet-text').focus();
        return;
      } else {
        $('.new-tweet').slideDown('slow');
        $('#tweet-text').focus();
        $("html, body").stop().animate({ scrollTop: height}, "slow");
        return;
      }
    // Action if Before Main
    } else if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp("slow");
      return;
    } else {
      $('.new-tweet').slideDown('slow');
      $('#tweet-text').focus();
      return;
    }
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Dark Mode/Light Mode
  $('.darkmode').on('click', function(event) {
    // console.log('darkmode button clicked');
    // Turn on Dark Mode
    if ($(this).hasClass('fa-moon')) {
      $('body').addClass('darkbody');
      $('nav').addClass('darknav');
      $('.userinfo').attr('id', 'darkheader');
      $('.tweeticon').attr('id', 'darkicon');
      $('article').addClass('darkarticle');
      $('#tweet-text').css('background-image', 'none')
      $(this).addClass('fa-sun');
      $(this).removeClass('fa-moon');
      localStorage.setItem('darkmode', true);
      // console.log("moon clicked:", localStorage.getItem('darkmode'));
      return;
    } else {
      // Turn off Dark Mode
      // console.log('Sun Clicked');
      $('body').removeClass('darkbody');
      $('nav').removeClass('darknav');
      $('.userinfo').removeAttr('id');
      $('.tweeticon').removeAttr('id');
      $('article').removeClass('darkarticle');
      $('#tweet-text').css('background-image', 'url("https://www.transparenttextures.com/patterns/cardboard.png"')
      $(this).removeClass('fa-sun');
      $(this).addClass('fa-moon');
      localStorage.setItem('darkmode', false);
      // console.log("sun clicked:", localStorage.getItem('darkmode'));
      return;
    }
  });
//----------------------------------------------------------

});
//----------------------------------------------------------


