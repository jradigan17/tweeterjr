//----------------------------------------------------------
// Action on Document Ready
$(document).ready(function() {
  // --- our code goes here ---
  console.log("document ready - take two");

  //----------------------------------------------------------
  // Input into Text Area - Counter
  $("#tweet-text").on('input focus', function() {
    // console.log(this.value.length);
    $(this).siblings('div').children('div').children('div').children('.counter').val(140 - this.value.length);
    // Tweet too long - CSS Styling
    if (140 - this.value.length >= 0 && 140 - this.value.length < 10) {
      $('.counter').addClass('warning');
      $('.counter').on('animationend', function() {
        $(this).removeClass('warning');
        $(this).css("color", "var(--green)");
      });
    } else if (140 - this.value.length < 0) {
      $(this).siblings('div').children('div').children('div').children('.counter').css("color", "var(--red)");
    } else {
      $(this).siblings('div').children('div').children('div').children('.counter').css("color", "var(--green)");
    }
    // Hide any data validation - Tweet length good
    if (this.value.length > 0 && this.value.length <= 140) {
      $('.invalid').hide();
    }
  });
  //----------------------------------------------------------

});
//----------------------------------------------------------


