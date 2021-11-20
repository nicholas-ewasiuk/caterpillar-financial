document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let rightPressed = false;
let leftPressed = false;
let upPressed = false;
let downPressed = false;

const rect2 = document.getElementById('rect2');
let rect2x = 0;
let rect2y = 0;

function keyDownHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = true;
  }
  else if(event.keyCode == 37) {
    leftPressed = true;
  }
  if(event.keyCode == 40) {
    downPressed = true;
  }
  else if(event.keyCode == 38) {
    upPressed = true;
  }
}

function keyUpHandler(event) {
  if(event.keyCode == 39) {
    rightPressed = false;
  }
  else if(event.keyCode == 37) {
    leftPressed = false;
  }
  if(event.keyCode == 40) {
    downPressed = false;
  }
  else if(event.keyCode == 38) {
    upPressed = false;
  }
}

function draw() {
  if(rightPressed) {
    rect2x += 1;
    rect2.transform = `translate(${rect2x} ${rect2y})`;
    console.log('right');
  }
  else if(leftPressed) {
    rect2x -= 1;
    rect2.transform = `translate(${rect2x} ${rect2y})`;
    console.log('left');
  }
  if(downPressed) {
    rect2y += 1;
    rect2.transform = `translate(${rect2x} ${rect2y})`;
    console.log('down');
  }
  else if(upPressed) {
    rect2y -= 1;
    rect2.transform = `translate(${rect2x} ${rect2y})`;
    console.log('up');
  }
  window.requestAnimationFrame(draw);
}

draw();