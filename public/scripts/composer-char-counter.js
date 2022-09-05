$(document).ready(function() {
  // --- our code goes here ---
  console.log("document ready");

  $("#tweet-text").on('input', function() {
    console.log(this.value.length);
    $(this).siblings('div').children('.counter').val(140 - this.value.length);
    if(140 - this.value.length < 0) {
      $(this).siblings('div').children('.counter').css("color", "var(--red)");
    } else {
      $(this).siblings('div').children('.counter').css("color", "var(--green)");
    }
  });

});

