//----------------------------------------------------------
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//----------------------------------------------------------

//----------------------------------------------------------
// New Tweet
const createTweetElement = (object) => {
  let flagged = '';
  let blurred = '';
  let heart = '';
  let darktweet = '';
  let darkicon = '';
  
  // Flag Status
  const flagstatus = JSON.parse(localStorage.getItem('flagstatus'));
  if (flagstatus) {
    for (let i = 0; i < flagstatus.length; i++) {
      if (Object.keys(flagstatus[i])[0] === object.user.handle) {
        flagged = 'redflag';
        blurred = 'blurtext'
      }
    }
  }

  // Heart Status
  const heartstatus = JSON.parse(localStorage.getItem('heartstatus'));
  if (heartstatus) {
    for (let j = 0; j < heartstatus.length; j++) {
      if (Object.keys(heartstatus[j])[0] === object.user.handle) {
        heart = 'redflag';
      }
    }
  }

  // Light/Dark Status
  if ($('.darkmode').hasClass('fa-sun')) {
    // console.log('darkmode accessed')
    darktweet = 'class="darkarticle"';
    darkicon = 'id="darkicon"';
  };

  return $(`<article ${darktweet}>
  <header>
    <span><img class="tweeticon" ${darkicon} src="${object.user.avatars}" height="30"/><i class="${object.user.avatar} tweeticon" ${darkicon}></i> ${object.user.name}</span>
    <span class="userhandler">${object.user.handle}</span>
  </header>
  <span class="content ${blurred}">
    ${escapetext(object.content.text)}
  </span>
  <footer>
    <span>${timeago.format(object.created_at)}</span>
    <span><i class="fa-solid fa-flag ${flagged} icon tooltip"><span class="tooltiptext">Report Tweet</span></i><i class="fa-solid fa-retweet icon tooltip"><span class="tooltiptext">Retweet</span></i><i class="fa-solid fa-heart ${heart} icon tooltip"><span class="tooltiptext">Like Tweet</span></i></span>
  </footer>
  </article>
  <br>`);
};
//----------------------------------------------------------

//----------------------------------------------------------
// New Tweet - Data Validation
const tooshort = `Whoops - No Tweet Entered`;
const toolong = `Whoops - Tweet Entered is Too Long`;
const datavalidation = (phrase) => {
  $('#tweet-text').css({"border":"solid", "border-color": "var(--red)","color":"var(--black)","background-image":"none", "background-color": "var(--lightred)"});
  //$(toolong).insertAfter('button');
  $('.invalid').css("visibility","visible");
  $('.invalid').text(phrase);
  $('.invalid').slideDown("fast");
  // $('.left-side').append(toolong);
};
//----------------------------------------------------------

//----------------------------------------------------------
// Ensure Tweets Cannot Override JS or HTML
const escapetext = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
//----------------------------------------------------------

//----------------------------------------------------------
// Render Tweets - New & Existing from Data Base
const renderTweets = (tweets) => {
  if (tweets.length > 10) {
    $('.more-tweets').show();
    $('.badge').text  (tweets.length-10);
    localStorage.setItem('show','10');
    // console.log(localStorage.getItem('show'))
    let firsttweets = [];
    for (let i = tweets.length - 10; i < tweets.length; i++) {
      firsttweets.push(tweets[i]);
    }
    firsttweets.forEach(element => {
      $('.tweets-list').prepend(createTweetElement(element));
    });
  } else {
    $('.more-tweets').hide();
    tweets.forEach(element => {
      $('.tweets-list').prepend(createTweetElement(element));
    });
  }
};
//----------------------------------------------------------

//----------------------------------------------------------
// Load More Tweets - New & Existing from Data Base
const loadMoreTweets = () => {
  let itemcount = JSON.parse(localStorage.getItem('show'));
  let count = itemcount + 10;
  if ($('.fa-gratipay').hasClass('favs')) {
    const favtweets = [];
    const heartstatus = JSON.parse(localStorage.getItem('heartstatus'));
  
    $.get('/tweets', function(data, status) {
      for (let i = 0; i < heartstatus.length; i++) {
        for (let j = 0; j < data.length; j++) {
          if (Object.keys(heartstatus[i])[0] === data[j].user.handle) {
            favtweets.push(data[j]);
          }
        }
      }
      $('.tweets-list').empty();
      if (favtweets.length > 0) {
        if (favtweets.length > itemcount + 10) {
          $('.more-tweets').show();
          $('.badge').text  (favtweets.length - count);
          localStorage.setItem('show', count);
          let firsttweets = [];
          for (let i = favtweets.length - count; i < favtweets.length; i++) {
            firsttweets.push(favtweets[i]);
          }
          firsttweets.forEach(element => {
            $('.tweets-list').prepend(createTweetElement(element));
          });
        } else {
          $('.more-tweets').hide();
          favtweets.forEach(element => {
            $('.tweets-list').prepend(createTweetElement(element));
          });
        }
      } else {
        $('.tweets-list').prepend($(`<label class="no-favs">Whoops - No Tweets Liked</label>`))
      }
    });
  } else {
    $.get('/tweets', function(data, status) {
      $('.tweets-list').empty();
      if (data.length > itemcount + 10) {
        $('.more-tweets').show();
        $('.badge').text  (data.length - count);
        localStorage.setItem('show', count);
        let firsttweets = [];
        for (let i = data.length - count; i < data.length; i++) {
          firsttweets.push(data[i]);
        }
        firsttweets.forEach(element => {
          $('.tweets-list').prepend(createTweetElement(element));
        });
      } else {
        $('.more-tweets').hide();
        data.forEach(element => {
          $('.tweets-list').prepend(createTweetElement(element));
        });
      }
    });
  }
};
//----------------------------------------------------------

//----------------------------------------------------------
// Load Tweets - Load Tweets from Existing Data Base
const loadtweets = () => {
  $('.fa-gratipay').removeClass('favs');
  $.get('/tweets', function(data, status) {
    $('.tweets-list').empty();
    renderTweets(data);
  });
};
//----------------------------------------------------------

//----------------------------------------------------------
// Load Favourite Tweets - Load Tweets from Existing Data Base
const loadfavtweets = () => {
  const favtweets = [];
  const heartstatus = JSON.parse(localStorage.getItem('heartstatus'));

  $.get('/tweets', function(data, status) {
    for (let i = 0; i < heartstatus.length; i++) {
      for (let j = 0; j < data.length; j++) {
        if (Object.keys(heartstatus[i])[0] === data[j].user.handle) {
          favtweets.push(data[j]);
        }
      }
    }
    $('.tweets-list').empty();
    if (favtweets.length > 0) {
      renderTweets(favtweets);
    } else {
      $('.tweets-list').prepend($(`<label class="no-favs">Whoops - No Tweets Liked</label>`))
    }
  });
};
//----------------------------------------------------------

//----------------------------------------------------------
// Check Flag Status Heart Status & Update
const heartstatus = JSON.parse(localStorage.getItem('heartstatus'));
const flagstatus = JSON.parse(localStorage.getItem('flagstatus'));
//----------------------------------------------------------

//----------------------------------------------------------
// Remove Status
const removeStatus = (items, handle) => {
  items = items.filter(item => Object.keys(item)[0] !== Object.keys(handle)[0]);
  return items;
}
//----------------------------------------------------------

//----------------------------------------------------------
// Random Tweet Generator
const randomTweets = [
  'Bactrian camels, also called two-humped camels, can drink up to 88 pints of water (50 liters).',
  "A polar bear's hair is not white — it's colorless! Its strands are thick, hollow, and reflect light.",
  "A chameleon's tongue is as long as its body but can grab prey in a fraction of a second! How fast can you catch something?",
  "A lion's roar can reach 114 decibels (the same loudness as a chainsaw) and can be heard from as far as five miles away.",
  "If a starfish gets split into five pieces, each piece can survive and regrow itself — but only if it contains part of its central disc.",
  "Polar bears actually have black skin underneath that thick coat of fur, which helps them soak up the sun's warm rays in the chilly Arctic.",
  "Hermit crabs drink water by dipping their claws into the water and scooping it into their mouths.",
  "Gorillas have wrinkles on their noses unique to each ape, just like our fingerprints.",
  "Elephants use their mighty trunks for eating and drinking. They can use their trunks to breathe like a snorkel when submerged in deep water.",
  "A rhinoceros horn is made of compacted hair, not bone. It contains keratin, which is a fiber-like protein."
];
//----------------------------------------------------------

//----------------------------------------------------------
// Actions on Document Ready
$(document).ready(function() {

  console.log("document ready");
  // console.log('onload heartstatus:', localStorage.getItem('heartstatus'));
  // console.log('onload flagstatus:', localStorage.getItem('flagstatus'));
  // localStorage.clear()

//----------------------------------------------------------
// Hide Error Validation & New Tweet & Back to Top Button
  $('.invalid').hide();
  $('.new-tweet').hide();
  $('.back-top').hide();
  $('.more-tweets').hide();
  localStorage.removeItem('show')
  // console.log(localStorage.getItem('show'))
//----------------------------------------------------------

//----------------------------------------------------------
// Render & Render Tweets - DNU as Data Base Removed
  // renderTweets(data);
//----------------------------------------------------------

//----------------------------------------------------------
// Submit New Tweet & Data Validation
  $('form').on('submit', function(event) {
  // Need to prevent form submission
    event.preventDefault();
    $('.fa-gratipay').removeClass('favs');
    localStorage.setItem('favs', false);
    // console.log('Button clicked, performing ajax call...');
    // console.log($('#tweet-text').serialize());
    // $('.invalid').remove();
    $('.invalid').hide();
  // Tweet too long
    if ($('.counter').val() < 0) {
      datavalidation(toolong);
      return;
  // Tweet too short
    } else if ($('.counter').val() === "140") {
      datavalidation(tooshort);
      return;
  // Good Tweet - Submit and Render
    } else {
      $.post('/tweets', $('#tweet-text').serialize(), function(data, status) {
        $('#tweet-text').val("");
        $('.counter').val(140);
        loadtweets();
      });
    }
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Load Initial Tweets
  if (localStorage.getItem('favs') === 'true') {
    $('.fa-gratipay').addClass('favs');
    loadfavtweets();
  } else {
    loadtweets();
  }
//----------------------------------------------------------

//----------------------------------------------------------
// Load Favorite Tweets Status
if (localStorage.getItem('fav') === 'true') {
  $('.fa-gratipay').addClass('heart');
}
//----------------------------------------------------------

//----------------------------------------------------------
// CSS Styling when Enter Text Area
  $('#tweet-text').on('focus', function() {
    $(this).css({"background-color": "var(--green)", "background-image": "none", "color": "var(--black)", "border-style": "none none solid none", "border-color": "var(--green)"});
  });

  // CSS Styling when Leaving Text Area
  $('#tweet-text').blur(function() {
    if ($('.darkmode').hasClass('fa-moon')) {
      $(this).css({"background-color": "var(--black)", "background-image": "url('https://www.transparenttextures.com/patterns/cardboard.png')", "color": "var(--green)", "border-style": "none none solid none", "border-color": "var(--green)"});
    } else {
      $(this).css({"background-color": "var(--black)", "background-image": 'none', "color": "var(--green)", "border-style": "none none solid none", "border-color": "var(--green)"});
    }


  // CSS Styling - Shake For User to Submit Tweet
    if ($('.counter').val() < 140 && $('.counter').val() >= 0) {
      $('button').addClass('shake');
      $('button').on('animationend', function() {
        $(this).removeClass('shake');
      });
    }
  });
//----------------------------------------------------------

//----------------------------------------------------------
// CSS Styling - Go Back to Top
  $('.back-top').on('click', function() {
    $("html, body").stop().animate({ scrollTop: 0}, "slow");
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Random Tweet Generator
  $(".fa-ghost").on('click', function() {
    const index = Math.floor(Math.random() * (randomTweets.length));
    $('#tweet-text').val(randomTweets[index]);
    $('#tweet-text').focus();
    $('#tweet-text').css({"background-color": "var(--green)", "background-image": "none", "color": "var(--black)", "border-style": "none none solid none", "border-color": "var(--green)"});
    $('button').addClass('shake');
      $('button').on('animationend', function() {
        $(this).removeClass('shake');
      });
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Report Flag 
  $(".tweets-list").on('click', ".fa-flag", function(event) {
    // console.log("Item Flagged")
    let flagstatus = JSON.parse(localStorage.getItem('flagstatus'));

    const userhandle = $(this).parent().parent().siblings('header').children('.userhandler').text();
    const userflag = {[userhandle]: true};

    if ($(this).parent().find('.fa-flag').hasClass('redflag')) {
      $(this).parent().find('.fa-flag').removeClass('redflag');
      $(this).parent().find('.fa-flag').parent().parent().siblings('.content').removeClass('blurtext');
      let value = removeStatus(flagstatus, userflag);
      localStorage.setItem('flagstatus', JSON.stringify(value))
      // console.log(localStorage);
      event.stopPropagation();
      return;

    } else {
      $(this).parent().find('.fa-flag').addClass('redflag');
      $(this).parent().find('.fa-flag').parent().parent().siblings('.content').addClass('blurtext');
      event.stopPropagation();
      if (!flagstatus) {
        flagstatus = [userflag];
      } else {
        flagstatus.push(userflag);
      }
      localStorage.setItem("flagstatus", JSON.stringify(flagstatus));
      // console.log(localStorage.getItem('flagstatus'));
      return;
    }
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Heart - Like 
  $(".tweets-list").on('click', ".fa-heart", function(event) {
    // console.log("Heart Liked")
    let heartstatus = JSON.parse(localStorage.getItem('heartstatus'));

    if (!heartstatus) {
      $('.fa-gratipay').addClass('heart');
      localStorage.setItem('fav', true);
    } else if (heartstatus.length === 0) {
      $('.fa-gratipay').addClass('heart');
      localStorage.setItem('fav', true);
    };

    const userhandle = $(this).parent().parent().siblings('header').children('.userhandler').text();
    const userheart = {[userhandle]: true};

    if ($(this).parent().find('.fa-heart').hasClass('redflag')) {
      $(this).parent().find('.fa-heart').removeClass('redflag');
      let value = removeStatus(heartstatus, userheart);
      localStorage.setItem('heartstatus', JSON.stringify(value))
      // console.log(localStorage);
      event.stopPropagation();
      if (!heartstatus) {
        $('.fa-gratipay').removeClass('heart');
        localStorage.setItem('fav', false);
      } else if (heartstatus.length === 0) {
        $('.fa-gratipay').removeClass('heart');
        localStorage.setItem('fav', false);
      }
      if ($('.fa-gratipay').hasClass('favs')) {
        loadfavtweets();
      }
      return;

    } else {
      $(this).parent().find('.fa-heart').addClass('redflag');
      event.stopPropagation();
      if (!heartstatus) {
        heartstatus = [userheart];
      } else {
      heartstatus.push(userheart);
      }
      localStorage.setItem("heartstatus", JSON.stringify(heartstatus));
      // console.log(localStorage.getItem('heartstatus'));
      return;
    }
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Show Favourites
  $(".fa-gratipay").on('click', function(event) {
    if ($(this).hasClass('favs')){
      $(this).removeClass('favs')
      localStorage.setItem('favs', false)
      loadtweets();
    } else {
      $(this).addClass('favs');
      // console.log("Show Fav Tweets");
      localStorage.setItem('favs', true)
      loadfavtweets();
    }
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Load More Tweets
  $(".more-tweets").on('click', function(event) {
    loadMoreTweets();
    // console.log(localStorage.getItem('show'))
  });
//----------------------------------------------------------

//----------------------------------------------------------
// Re-Tweet
  $(".tweets-list").on('click', ".fa-retweet", function() {
    // console.log("Re-Tweet")

    const message = $(this).parent().parent().siblings('.content').text().trim();
    // console.log(message);
    const height = $('main').offset().top - 100;

    $('.new-tweet').slideDown('slow');
    $('#tweet-text').val(message);
    $('#tweet-text').focus();
    $("html, body").stop().animate({ scrollTop: height}, "slow");
    $('button').addClass('shake');
    $('button').on('animationend', function() {
      $(this).removeClass('shake');
    });

  });
//----------------------------------------------------------

//----------------------------------------------------------
// Mouse Over & Mouse Leave Examples
  // $("article").on('mouseover', function() {
  //   $(this).css("box-shadow", "6px 6px 3px var(--lightpurple)");
  // })
  // $("article").on('mouseleave', function() {
  //   $(this).css("box-shadow", "none");
  // })

  // $(".icon").on('mouseover', function() {
  //   $(this).css("color", "var(--red)");
  //   $(this).css("cursor", "pointer");
  // })
  // $(".icon").on('mouseleave', function() {
  //   $(this).css("color", "var(--black)");
  //   $(this).css("cursor", "auto");
  // })

  // $("button").on('mouseover', function() {
  //   $(this).css("background-color", "var(--purple)");
  //   $(this).css("background-image", "url('https://www.transparenttextures.com/patterns/clean-gray-paper.png')");

  // })
  // $("button").on('mouseleave', function() {
  //   $(this).css("background-color", "var(--green)");
  //   $(this).css("background-image", "none");
  // })
//----------------------------------------------------------

});
//----------------------------------------------------------

// //----------------------------------------------------------
// // User Data
// const data = [
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "avatar": "",
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1661113959088
//   },
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "avatar": "",
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1661467449808
//   },
//   {
//     "user": {
//       "name": "Canada",
//       "avatars": "",
//       "avatar": "fa-brands fa-canadian-maple-leaf",
//       "handle": "@Canada"
//     },
//     "content": {
//       "text": "By which Ontario town is Neys Park"
//     },
//     "created_at": 1661716232227
//   },
//   {
//     "user": {
//       "name": "Chris Hadfield",
//       "avatars": "",
//       "avatar": "fa-solid fa-user-astronaut",
//       "handle": "@CHadfield"
//     },
//     "content": {
//       "text": "Who or what was in space first - Marc Garneau, Roberta Bondar or the Canadarm?"
//     },
//     "created_at": 1661922449227
//   },
// ];
// //----------------------------------------------------------