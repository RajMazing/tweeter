$(document).ready(function() {
  // --- our code goes here ---
});
 
 
 
 const tweets = $.ajax({
    url: '/tweets'
  });
  console.log(tweets);