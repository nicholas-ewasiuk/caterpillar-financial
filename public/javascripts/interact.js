console.log("interact file reached");

$(document).ready(function () {
  console.log("interact file init");

  $("#drop-down").on("click", function () {
    $(".created-graphs").get(0).scrollIntoView('swing');
  });

  // $("").on("click", function () {
  //   $(".content").slideDown('swing');
  // });

  $( ".input-fields" ).click(function() {
    $( "data" ).animate({
      width: "toggle",
    }, {
      duration: 1500,
      specialEasing: {
        width: "linear",
        height: "easeOutBounce"
      },
      complete: function() {
        $( this ).after( "<h1> TEST TEST </h1>" );
      }
    });
  });
// document.ready
});