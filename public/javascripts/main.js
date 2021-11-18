let toggle = false;

document.addEventListener('click', function(event) {
    const target = event.target;
    toggle = !toggle;

    if (target.className === "test" && toggle) {
        gsap.to("h1", {duration: 2, opacity: 0.3, backgroundColor: "chocolate", rotation: 360});
    }

    if (target.className === "test" && !toggle) {
        gsap.to("h1", {duration: 2, opacity: 1.0, backgroundColor: "white", rotation: 0});
    }
});




