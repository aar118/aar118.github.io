$(document).ready(function() {
  $(".inputs").focus(function() {
    $(this).css("background-color", "#cccccc");
  });
  $(".inputs").blur(function() {
    $(this).css("background-color", "#ffffff");
  });
  $("textarea").focus(function() {
    $(this).css("background-color", "#cccccc");
  });
  $("textarea").blur(function() {
    $(this).css("background-color", "#ffffff");
  });
  $(".best").click(function() {
    $("#best-container").toggle();
  });
  $(".highest").click(function() {
    $("#highest-container").toggle();
  });
  $("#stats").click(function() {
    $(".stats-container").toggle();
  });
})