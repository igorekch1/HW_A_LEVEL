let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let raf;

let start = document.querySelector("#start")
let stop = document.querySelector("#stop")
let forward = document.querySelector("#forward")
let rewind = document.querySelector("#rewind")

start.style= `
  position: fixed;
  top: 15px;
  left: 47%;
`
stop.style= `
  position: fixed;
  top: 15px;
  left: 50%;
`
forward.style= `
  position: fixed;
  top: 55px;
  left: 47%;
`
rewind.style= `
  position: fixed;
  top: 55px;
  left: 50%;
`

let sel = document.querySelector ( 'select' )
const options = ["...", "Circle", "Square", "Triangle" ]
options.forEach ( x => {
        var opt = document.createElement ( 'option' )
        opt.innerHTML = x
        opt.value = x
        sel.appendChild ( opt )
})

class Shape{
  constructor(){
      this.vx = 10;
      this.vy =1;
      this.color = `black`;
  }
}

class Circle extends Shape{
  constructor(x,y,radius){
      super();

      this.x = x;
      this.y = y;
      this.radius = radius;
      this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
  }
}

class Square extends Shape{
  constructor(x1,y1,x2,y2){
    super();
      this.x1 = x1;
      this.y1 = y1;
      this.x2 = x2;
      this.y2 = y2;
      this.draw = function(){
        ctx.beginPath();
        ctx.fillRect(this.x1,this.y1,this.x2,this.y2)
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
  }
}

class Triangle extends Shape{
  constructor(x,y){
    super();

    this.x=x;
    this.y=y;
    this.draw = function(){
      ctx.beginPath();
      ctx.moveTo(x,x);
      ctx.lineTo(x,y)
      ctx.lineTo(y,x);
      ctx.fill();
    }

  }

}


// let new_shape;
// sel.onchange = function(e){

//   var my_class = e.target.value;
//   if (my_class == "Circle"){
//     new_shape = new Circle(50,50,25);
//   }
//   if (my_class == "Square"){
//     new_shape = new Square(20,20,60,60);
//   }
//   if (my_class == "Triange"){
//     new_shape = new Triangle(20,60);
//   }
//   // ctx.fillStyle = 'rgba(255, 255, 255, 1)'
//   // ctx.fillRect(0,0,canvas.width, canvas.width)
//   new_shape.draw()
//   console.log("----",new_shape)
//   return new_shape;
// }
var new_shape = new Square(20,20,60,60);
 

function clear() {
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw() {
  clear()
  new_shape.draw();
  new_shape.x1 += new_shape.vx;
  new_shape.x2 += new_shape.vx;
  new_shape.y1 += new_shape.vx;
  new_shape.y2 += new_shape.vy;
  // ball.vy *= .99;
  // ball.vy += .25;

  if (new_shape.y + new_shape.vy > canvas.height ||
      new_shape.y + new_shape.vy < 0) {
    new_shape.vy =- new_shape.vy;
  }
  if (new_shape.x + new_shape.vx > canvas.width ||
      new_shape.x + new_shape.vx < 0) {
    new_shape.vx =- new_shape.vx;
  }

  raf = window.requestAnimationFrame(draw);
}


start.addEventListener('click', function(e) {
  raf = window.requestAnimationFrame(draw);
});

forward.addEventListener('click', function(e) {
  raf = window.requestAnimationFrame(draw);
});

stop.addEventListener('click', function(e) {
  window.cancelAnimationFrame(raf);
});

rewind.addEventListener('click', function(e) {
  window.cancelAnimationFrame(raf);
});


new_shape.draw();

let color = document.querySelector("#color");
let resize = document.querySelector("#size");

function control(){
  color.onchange = function(e){
    new_shape.color = e.target.value;
    console.log(new_shape.color)
    console.log(e.target.value)
  }

  resize.oninput = function(e){
    new_shape.radius = e.target.value;
  }
}

control();

// Mouse control
// canvas.addEventListener('mousemove', function(e) {
//   if (!running) {
//     clear();
//     new_shape.x = e.clientX-300;
//     new_shape.y = e.clientY-120;
//     new_shape.draw();
//     console.log("mousemove --- ",new_shape)
//   }
// });

// canvas.addEventListener('click', function(e) {
//   if (!running) {
//     raf = window.requestAnimationFrame(draw);
//     running = true;
//   }
// });

// canvas.addEventListener('mouseout', function(e) {
//   window.cancelAnimationFrame(raf);
//   running = false;
// });

// new_shape.draw();