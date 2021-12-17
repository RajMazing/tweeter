// *
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */


const escaping =  function(str) {
  let div = document.createElement("div") 
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
};


const data = [
  // {
  //   user: {
  //     name: "Newton",
  //     avatars: "https://i.imgur.com/73hZDYK.png",
  //     handle: "@SirIsaac",
  //   },
  //   content: {
  //     text: "If I have seen further it is by standing on the shoulders of giants",
  //   },
  //   created_at: 1461116232227,
  // },
  // {
  //   user: {
  //     name: "Descartes",
  //     avatars: "https://i.imgur.com/nlhLi3I.png",
  //     handle: "@rd",
  //   },
  //   content: {
  //     text: "Je pense , donc je suis",
  //   },
  //   created_at: 1461113959088,
  // },
];

const renderTweets = function (tweets) {
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
          <div>${tweet.user.name}</div>
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


$("form").on("submit", function (e){
  e.preventDefault();

  const data = $('#tweet-text').val();
   if (data.trim() === "") {
    $(".message").html("❌ Error, you can't input an empty tweet ❌");
    $('.alert').slideDown()
    //  return "Error, you can't input an empty tweet";
   } else if (data.length > 140) {
    $(".message").html("❌ Character limit exceeded ❌");
    $('.alert').slideDown()
    //  return "Character limit exceeded";
   } else {
     const tweetUrl = '/tweets/';
     $(".message").html('');
     $('.alert').slideUp();
     $.ajax({
       method: 'POST',
       url: tweetUrl,
       data:  $(this).serialize(),
       success: function(data){
          console.log(data);
        }
      })
        .then(loadTweets());
         $('.counter').val('140');
         $('#tweet-text').val('');
     }
   })
   



const loadTweets = function () {
  $.ajax({
    type: "GET",
    url: `/tweets`,
  })
  .then((response) =>{
    console.log('response = ', response);
    renderTweets(response);
  })
  .catch((error) => {
    console.log('error =', error);
  })
}
loadTweets()



 //  });
    //  });
//    }
// });
// ("submit", function (e){
//   e.preventDefault();

  // const data = $('#tweet-text').val();
  //  if (data.trim() === "") {
  //    return "Error, fix this!";
  //  } else if (data.length > 140) {
  //    return "Character limit exceeded"
  //  } else {
  //    const tweetUrl = '/tweets/';
  //    $.ajax({
  //      method: 'POST',
  //      url: tweetUrl,
  //      data:  $(this).serialize(),
  //     })
       
  //   });
  //  }