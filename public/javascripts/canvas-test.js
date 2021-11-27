// $(document).ready(function () {
//   // CANVAS
//   console.log('canvas reached');
//   const canvas = document.querySelector('canvas');
//   // console.log(canvas);

//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   const c = canvas.getContext('2d');
  
//   // multiple random circles
//   // for(let i = 0; i < 3; i++){
//   //   const color = ["#d4fbc4", "#d8f1c4", "#e1dec1", "#e6d2c0", "#ecc5bf"];
//   //   const x = Math.random() * window.innerWidth;
//   //   const y = Math.random() * window.innerHeight;
//   //   c.beginPath();
//   //   c.arc(x, y, 100, 0, Math.PI * 2, false);
//   //   c.fillStyle = "#d4fbc4"
//   //   c.fill();
//   // }


//   let x = Math.random() * innerWidth;
//   let y = Math.random() * innerHeight;
//   // velocity (+ equals right on the x axis - goes right)
//   let xVelocity = (Math.random() - 0.5) * 12;
//   let yVelocity = (Math.random() - 0.5) * 12;
//   let radius = 50;

  
//   const randomCircle = function(x, y, xVelocity, yVelocity, radius) {
//     this.x = x;
//     this.y = y;
//     this.xVelocity = xVelocity;
//     this.yVelocity = yVelocity;
//     this.radius = radius;

//     this.draw = function() {
//       c.beginPath();
//       c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//       c.fillStyle = "#d4fbc4"
//       c.fill();
//     }

//     this.update = function(){
//       if (this.x + radius > innerWidth || this.x - this.radius < 0) {
//         this.xVelocity = - this.xVelocity;
//       }
//       if (this.y + radius > innerHeight || this.y - this.radius < 0) {
//         this.yVelocity = - this.yVelocity;
//       }
//       x += this.xVelocity;
//       y += this.yVelocity;

//       this.draw();
//     }
//   }
//   let newCircle = new randomCircle(100, 100, 20, 20, 80);
  
//   // const circleMove = function() {
//   //   requestAnimationFrame(circleMove);
//   //   c.clearRect(0, 0 , innerWidth, innerHeight);
//   //   // drawing new circle from the object above
//   //   // circle.draw();
//   //   circle.update();

//   //   c.beginPath();
//   //   c.arc(x, y, radius, 0, Math.PI * 2, false);
//   //   c.fillStyle = "#d4fbc4"
//   //   c.fill();

//   //   console.log("animation reached");

//   //   if (x + radius > innerWidth || x - radius < 0) {
//   //     xVelocity = - xVelocity;
//   //   }
//   //   if (y + radius > innerHeight || y - radius < 0) {
//   //     yVelocity = - yVelocity;
//   //   }
//   //   x += xVelocity;
//   //   y += yVelocity;
//   // };
//   const circleMove = function() {
//     requestAnimationFrame(circleMove);
//     c.clearRect(0, 0, innerWidth, innerHeight);
//     // drawing new circle from the object above
//     // circle.draw();
//     newCircle.update();
//   };

//   circleMove();

// });