// console.log("interact file reached");

$(document).ready(function () {
  console.log("interact file init");

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

  $("#create-btn.btn").click(function(e){
    e.preventDefault();
    $(".create-input-ctrls").slideToggle(300, function(){
      console.log("slideUp + slideDown");
    });
  });

});

// $(selector).slideToggle(speed,easing,callback)

  // $("#button-to-click").on("click", function () {
  //   $("#affected-div").get(0).scrollIntoView('swing');
  // });
  // $("#clickable").on("mousedown", function () {
  //   $("affected-div").slideDown('swing');
  // });