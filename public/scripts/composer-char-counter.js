$(document).ready(function () {
  $("#tweet-text").on("input", function () {
    let counter = $(".counter");
    counter.text(140 - $(this).val().length);
    // turning characters to red when count less than 0
    if (counter.text() < 0) {
      counter.css("color", "red");

      console.log($(".counter"));
    } else {
      counter.css("color", "purple");
    }
  });
});
