/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const data = [

  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "avatar": "",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1661113959088
  },
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "avatar": "",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1661467449808
  },
  {
    "user": {
      "name": "Canada",
      "avatars": "",
      "avatar": "fa-brands fa-canadian-maple-leaf",
      "handle": "@Canada"
    },
    "content": {
      "text": "By which Ontario town is Neys Park"
    },
    "created_at": 1661716232227
  },
  {
    "user": {
      "name": "Chris Hadfield",
      "avatars": "",
      "avatar": "fa-solid fa-user-astronaut",
      "handle": "@CHadfield"
    },
    "content": {
      "text": "Who or what was in space first - Marc Garneau, Roberta Bondar or the Canadarm?"
    },
    "created_at": 1661922449227
  },
];

const createTweetElement = (object) => {
  return $(`<article>
  <header>
    <span><img class="tweeticon" src="${object.user.avatars}" height="30"/><i class="${object.user.avatar} tweeticon"></i> ${object.user.name}</span>
    <span class="userhandler">${object.user.handle}</span>
  </header>
  <span class="content">
    ${escapetext(object.content.text)}
  </span>
  <footer>
    <span>${timeago.format(object.created_at)}</span>
    <span><i class="fa-solid fa-flag icon"></i><i class="fa-solid fa-retweet icon"></i><i class="fa-solid fa-heart icon"></i></span>
  </footer>
  </article>
  <br>`);
}

const renderTweets = (tweets) => {
  tweets.forEach(element => {
    $('.tweets-list').prepend(createTweetElement(element));
  });
}

const tooshort = `Whoops - No Tweet Entered`;

const toolong = `Whoops - Tweet Entered is Too Long`;

const datavalidation = (phrase) => {
  $('#tweet-text').css({"border":"solid", "border-color": "var(--red)","color":"var(--black)","background-image":"none", "background-color": "var(--lightred)"});
  //$(toolong).insertAfter('button');
  $('.invalid').css("visibility","visible");
  $('.invalid').text(phrase);
  $('.invalid').slideDown("fast");
  // $('.left-side').append(toolong);
}

const escapetext = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadtweets = () => {
  $.get('/tweets', function(data, status) {
    renderTweets(data)
  })
}

$(document).ready(function() {

  console.log("document ready");

  $('.invalid').hide();
  $('.new-tweet').hide();
  $('.back-top').hide();

  renderTweets(data);
  
  $('form').on('submit', function(event) {
    event.preventDefault();
    console.log('Button clicked, performing ajax call...');
    console.log($('#tweet-text').serialize());
    // $('.invalid').remove();
    $('.invalid').hide();
    if ($('.counter').val() < 0){
      datavalidation(toolong);
      return;
    } else if ($('.counter').val() === "140") {
      datavalidation(tooshort);
      return;
    } else {
      $.post('/tweets', $('#tweet-text').serialize(), function(data, status) {
        $('#tweet-text').val("");
        $('.counter').val(140);
        loadtweets();
      })
    }
  })


  loadtweets()

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

  $('#tweet-text').on('focus', function() {
    $(this).css({"background-color": "var(--green)", "background-image": "none", "color": "var(--black)", "border-style": "none none solid none", "border-color": "var(--green)"});
  });

  $('#tweet-text').blur(function() {
    $(this).css({"background-color": "var(--black)", "background-image": "url('https://www.transparenttextures.com/patterns/cardboard.png')", "color": "var(--green)", "border-style": "none none solid none", "border-color": "var(--green)"});
    if ($('.counter').val() < 140 && $('.counter').val() >= 0) {
      $('button').addClass('shake');
      $('button').on('animationend', function() {
        $(this).removeClass('shake');
      });
    }
  });

  $('.back-top').on('click', function() {
    $("html, body").stop().animate({ scrollTop: 0}, "slow");
  })

});
