$(document).ready(function () {
  $("#tweet-text").on("keyup", function () {
    let counter = $(".counter");
    counter.text(140 - $(this).val().length);

    if (counter.text() < 0) {
      counter.css("color", "red");

      console.log($(".counter"));
    } else {
      counter.css("color", "black");
    }
  });
});
// $("input").blur(function(){
//   alert("This input field has lost its focus.");
// });
