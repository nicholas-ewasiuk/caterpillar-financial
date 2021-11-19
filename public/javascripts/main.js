let toggle = false;

document.addEventListener('click', function(event) {
    const target = event.target;
    toggle = !toggle;

    if (target.className === "test" && toggle) {
        gsap.to("h1", {duration: 2, opacity: 0.3, color:"white", backgroundColor: "blue", rotation: 360, ease: "bounce"});
    }

    if (target.className === "test" && !toggle) {
        gsap.to("h1", {duration: 2, opacity: 1.0, color:"black", backgroundColor: "white", rotation: 0, ease: "bounce"});
    }
});




