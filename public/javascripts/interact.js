// console.log("interact file reached");

$(document).ready(function () {
  console.log("interact file init");

  // $('#graph-controls').slideToggle()

  $("#create-btn").click(function(){
    $("#graph-controls").slideToggle(300, function(){
      console.log("slideUp + slideDown");
    });
  });

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

  $("#previous-btn").click(function(){
    $("#previous-menu-item__sub").slideToggle(300, function(){
      console.log("slideUp + slideDown");
    });
  });

  $("#create-btn").click(function(){
    $(".create-input-ctrls").slideToggle(300, function(){
      console.log("slideUp + slideDown");
    });
  });

  // $("#graph-controls").hide();

  // $("#create-btn").click(function(){
  //   $("#menu-slide").slideUp(300)
  //   $("#graph-controls").slideToggle(300, function(){
  //     $("#graph-controls").show();
  //   });
  // });

  // document.ready
});

// $(selector).slideToggle(speed,easing,callback)
