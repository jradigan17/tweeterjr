/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  console.log("document ready - take two")

  $("article").on('mouseover', function() {
    $(this).css("box-shadow", "6px 6px 3px var(--lightpurple)");
  })
  $("article").on('mouseleave', function() {
    $(this).css("box-shadow", "none");
  })

  $(".icon").on('mouseover', function() {
    $(this).css("color", "var(--red)");
    $(this).css("cursor", "pointer");
  })
  $(".icon").on('mouseleave', function() {
    $(this).css("color", "var(--black)");
    $(this).css("cursor", "auto");
  })

  $("button").on('mouseover', function() {
    $(this).css("background-color", "var(--purple)");
    $(this).css("background-image", "url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')");

  })
  $("button").on('mouseleave', function() {
    $(this).css("background-color", "var(--green)");
    $(this).css("background-image", "none");
  })

  $('#tweet-text').on('click', function() {
    $(this).css("background-color", "var(--green)");
    $(this).css("background-image", "none");
    $(this).css("color", "var(--black)");
  })

  $('#tweet-text').blur(function() {
    $(this).css("background-color", "var(--black)");
    $(this).css("background-image", "url('https://www.transparenttextures.com/patterns/cardboard.png')");
    $(this).css("color", "var(--green)");
  })

});
