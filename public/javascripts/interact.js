console.log("interact file reached");

$(document).ready(function () {
  console.log("interact file init");

  $("#drop-down").on("click", function () {
    $(".created-graphs").get(0).scrollIntoView('swing');
  });

  // $("").on("click", function () {
  //   $(".content").slideDown('swing');
  // });

  $(".input-fields").click(function () {
    $("data").animate({
      width: "toggle",
    }, {
      duration: 1500,
      specialEasing: {
        width: "linear",
        height: "easeOutBounce"
      },
      complete: function () {
        $(this).after("<h1> TEST TEST </h1>");
      }
    });
  });

  // attempt to get some window to popup in the graph vewbox
  const positionInVb = function (e) {
    const VPWH = [];                  // viewbox width / height
    const intVPW, intVPH;             // viewbox width / height
    const intCoordX = e.clientX;
    const intCoordY = e.clientY;    
    const intDistanceScrolledUp = document.body.scrollTop;
    const intPopupOffsetTop = intDistanceScrolledUp + intCoordY;
    const intDistanceScrolledLeft = document.body.scrollLeft;
    const intPopupOffsetLeft = intDistanceScrolledLeft + intCoordX;

    VPWH = getViewPortWidthHeight();    
    intVPW = VPWH[0];
    intVPH = VPWH[1];

    popup.style.position = 'absolute';
    //  .offsetWidth & .offsetHeight === 0
    popup.style.display = 'block';
    popup.style.zIndex = '10100';
    if (intCoordX > intVPW / 2) { intPopupOffsetLeft -= popup.offsetWidth; }
    if (intCoordY > intVPH / 2) { intPopupOffsetTop -= popup.offsetHeight; }
    popup.style.top = intPopupOffsetTop + 'px';
    popup.style.left = intPopupOffsetLeft + 'px';
  }

// double check info window create script
  // .InfoWindow({
  //   content: contentString,
  // });

// const circleGraph is the location logic above
  circleGraph.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
      shouldFocus: false,
    });
  });


  // document.ready
});