console.log("interact file reached");

$(document).ready(function () {
  console.log("interact file init");

  // $("#button-to-click").on("click", function () {
  //   $("#affected-div").get(0).scrollIntoView('swing');
  // });
  // $("#clickable").on("mousedown", function () {
  //   $("affected-div").slideDown('swing');
  // });

  $("#toggle").click(function () {
    $(".content-side").animate({
      width: "toggle",
    }, {
      direction: "left",
      duration: 1500,
      specialEasing: {
        width: "linear",
      }
    });
  });

  // document.ready
});
