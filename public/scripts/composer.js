$(document).ready(function() {
  // --- our code goes here ---
  console.log("document ready - take three");

  // const element = document.querySelector('main')
  // const position = element.getBoundingClientRect()
  const height = $('main').offset().top - 100;

  $(window).on('resize', function() {
    location.reload();
  });

  $(window).on("scroll", function() {
    if ($(window).scrollTop() > $('main').offset().top) {
      $('.new-tweet').hide();
    }
    if ($(window).scrollTop() > $('article').first().offset().top) {
      $('.back-top').show();
    }
    if ($(window).scrollTop() < $('article').first().offset().top) {
      $('.back-top').hide();
    }

    if ($(window).scrollTop() > $('main').offset().top - 100) {
      $('nav').css('border-style',"solid");
    } else {
      $('nav').css('border-style',"solid solid none solid");
    }
  });

  $('.new-tweeter').on('click', function(event) {
    event.preventDefault();
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
    } else if ($('.new-tweet').is(':visible')) {
      $('.new-tweet').slideUp("slow");
      return;
    } else {
      $('.new-tweet').slideDown('slow');
      $('#tweet-text').focus();
      return;
    }

  });

});