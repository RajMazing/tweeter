// *
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

$(document).ready(() => {
const escaping = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const data = [
  
];

const renderTweets = function (tweets) {
  //$("#tweets-container").empty();
  
  //added syntax to stop duplicating tweets
  $('#tweet-container').html('');
// loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container

  for (let tweet of tweets) {
    let createTweet = createTweetElement(tweet);
    $("#tweet-container").prepend(createTweet);
  }
};

const createTweetElement = function (tweet) {
  const time = timeago.format(tweet.created_at);
  let $tweet = $(`

  <article>
        <header>
          <div class="displayName">
          <img src="${tweet.user.avatars}">
          <div class="user-name">${tweet.user.name}</div>
          </div>
          <div class="tweeterHandle">${tweet.user.handle}</div>
        </header>
        <p>${escaping(tweet.content.text)}</p>
        <footer>
          <div>${time}</div>
          <div class="socials">
            <a class="fas fa-flag"></a>
            <a class="fas fa-retweet"></a>
            <a class="fas fa-heart"></a>
          </div>
        </footer>
      </article>
      <br>
  `);
  return $tweet;
};

renderTweets(data);

//Loading tweets faster
const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: `http://localhost:8080/tweets`,
  })
    .then((response) => {
      console.log("response = ", response);
      renderTweets(response);
    })
    .catch((error) => {
      console.log("error =", error);
    });
};

loadTweets();

//link to submit button
$("form").on("submit", function (e) {
  e.preventDefault();
  const data = $("#tweet-text").val();
  if (data.trim() === "") {
    $(".message").html("❌ Error, you can't input an empty tweet ❌");
    $(".alert").slideDown();
    //  return "Error, you can't input an empty tweet";
  } else if (data.length > 140) {
    $(".message").html("❌ Character limit exceeded ❌");
    $(".alert").slideDown();
    //  return "Character limit exceeded";
  } else {
    $(".message").html("");
    $(".alert").slideUp();

    const tweetData =  $(this).serialize();
    const tweetUrl = "http://localhost:8080/tweets/";
    
  
    $.ajax({
      method: "POST",
      url: tweetUrl,
      data: tweetData,
    })

   .then((response) => {
     loadTweets();
     $(".counter").val('140');
     $("#tweet-text").val('');
    
  })
  .catch((error) => {});


  }
});
});


