// let toggle = false;
// let meltToggle = false;

// gsap.set('#level', { 
//     scaleY: 0,
//     transformOrigin: '50% 100%' 
// });

// document.addEventListener('click', function(event) {
//     const target = event.target;
//     toggle = !toggle;

//     if (target.className === 'test' && toggle) {
//         gsap.to('h1', {duration: 2, opacity: 0.3, color:'white', backgroundColor: 'blue', rotation: 360, ease: 'bounce'});
//     }

//     if (target.className === 'test' && !toggle) {
//         gsap.to('h1', {duration: 2, opacity: 1.0, color:'black', backgroundColor: 'white', rotation: 0, ease: 'bounce'});
//     }
// });

// document.addEventListener('click', function(event) {
//     const target = event.target.closest('svg');
//     meltToggle = !meltToggle;

//     if (target.id === 'meltingpot' && meltToggle) {
//         gsap.to('#level', {duration: 3, scaleY: 1, ease: 'elastic(1, 0.8)'});
//         console.log('innnermeltclick');
//     }

//     if (target.id === 'meltingpot' && !meltToggle) {
//         gsap.to('#level', {duration: 3, scaleY: 0, ease: 'power1.in'});
//     }
//     console.log(target);
// });




