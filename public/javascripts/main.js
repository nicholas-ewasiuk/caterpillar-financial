let toggle = false;
let resize = false;

gsap.set('#level', {
    scaleY: 0,
    transformOrigin: '50% 100%'
});

document.addEventListener('click', function(event) {
    const target = event.target;
    toggle = !toggle;

    if (target.className === 'test' && toggle) {
        gsap.to('h1', {duration: 2, opacity: 0.3, color:'white', backgroundColor: 'blue', rotation: 360, ease: 'bounce'});
    }

    if (target.className === 'test' && !toggle) {
        gsap.to('h1', {duration: 2, opacity: 1.0, color:'black', backgroundColor: 'white', rotation: 0, ease: 'bounce'});
    }
});


document.addEventListener('click', function (event) {
    const target = event.target.closest('svg');
    console.log(target);

const fifth = document.getElementById('fifth-col');
fifth.addEventListener('click', (e) => {
  console.log('circle clicked - enlarging');
  fifth.setAttribute('r', 60);
  fifth.setAttribute('cx', 250);
  fifth.setAttribute('cy', 250);
});

const textField = document.getElementById('data-text');
textField.addEventListener('click', (e) => {
    console.log('clicked textField');
    // mycirctextFielde.setAttribute('text', "");
  });
});


const graph = document.getElementById('graph'),
const transformed = graph.getElementById('transformed');

console.log( svgPoint(graph, 10, 10) ); // returns x, y
console.log( svgPoint(transformed, 10, 10) ); // = x/4, y/4

// translate page to SVG coordinate
function svgPoint(element, x, y) {
  const pt = graph.createSVGPoint();
  pt.x = x;
  pt.y = y;
  return pt.matrixTransform( element.getScreenCTM().inverse() );
}

const  svg = document.getElementById('fifth'),
  const NS = svg.getAttribute('xmlns');

const fifth = document.getElementById('fifth-col');

for (i = 0; i < 30; i++) {
    fifth = document.createElementNS(NS, 'circle');
    fifth.setAttributeNS(null, 'cx', Math.round(Math.random() * 1600));
    fifth.setAttributeNS(null, 'cy', Math.round(Math.random() * 800));
    fifth.setAttributeNS(null, 'r', 20 + Math.round(Math.random() * 30));
    fifth.appendChild(c);
  }

const c = document.getElementById('circle')
const temperature = c.getElementById('circle')

 pt.y = y;
 pt.x = x;
if (circleRadius > 0) {
    c.setAttribute("fill", 'cy', 10)
}