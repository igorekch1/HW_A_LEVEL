
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');
let raf;

let start = document.querySelector("#start")
let stop = document.querySelector("#stop")
let forward = document.querySelector("#forward")
let rewind = document.querySelector("#rewind")
let color = document.querySelector("#color");
let resize = document.querySelector("#size");

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

let sel = document.querySelector ( '#select' )
const options = ["...", "Circle", "Square", "Triangle" ]
options.forEach ( x => {
        var opt = document.createElement ( 'option' )
        opt.innerHTML = x
        opt.value = x
        sel.appendChild ( opt )
})


let Shape = class{
  constructor(){
      // Step for animation
      this.vx = 10;
      this.vy = 1;
  }
  // Clearing canvas
  clear(){ 
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
  }      

  getRadius(){
    return this.radius;
  }

  setRadius(new_radius){
    this.radius = new_radius
  }

  getColor(){
    return this.color
  }

  setColor(new_color){
    this.color = new_color;
  }

  get attrs(){
    return {x: this.x,
            y: this.y}
  }

  set attrs(coord){
    this.x = coord.x;
    this.y = coord.y;
  }

  // static createFigure(){
  //   return new Shape();
  // }
}

class Circle extends Shape{
  constructor(){
      super();

      self = this;
      this.setColor(`#ff0000`);
      this.setRadius(20);

      this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.attrs.x, this.attrs.y, this.getRadius(), 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = this.getColor();
        ctx.fill();
        console.log("draw: my context - ", this)
      }
    }

  anime(){
    super.clear();

    console.log("anime: my context - ",self) 
    self.draw();
    
    //Changing the location of the object
    console.log("---------------\nattrs.x - ",self.attrs.x, "vx - ",self.vx,"\nAnimating...")

    self.attrs.x += self.vx;
    self.attrs.y += self.vy;

    console.log("attrs - ",self.attrs, "vx - ",self.vx,"\n---------------")
    // Checking the ends of canvas: true - go back
    if (self.attrs.y + self.vy > canvas.height ||
      self.attrs.y + self.vy < 0) {
        self.vy =- self.vy;
    }
    if (self.attrs.x + self.vx > canvas.width ||
      self.attrs.x + self.vx < 0) {
        self.vx =- self.vx;
    }

    setTimeout(self.anime(),20)
  }
}  


let new_shape;

sel.onchange = function(e){
  var my_class = e.target.value;
  new_shape = null; 
  if (my_class == "Circle"){
    //Creating an object
    new_shape = new Circle();
    //Setting attributes
    new_shape.attrs = {
      x: 30,
      y: 30
    };
    new_shape.setRadius(20)
  }
  //Drawing this object
  new_shape.draw()
  console.log("----",new_shape)
  return new_shape;
}

color.onchange = function(e){
  new_shape.setColor(Number(e.target.value));
  new_shape.draw();
}

resize.onchange = function(e){
  new_shape.setRadius(Number(e.target.value));
  console.log(new_shape.getRadius(), "  ", e.target.value)
  new_shape.draw();
}


start.addEventListener('click', function(e) {
  // raf = window.requestAnimationFrame(new_shape.anime);
  for(let i = 0; i<3; i++){  
    new_shape.anime();
  }
});

// forward.addEventListener('click', function(e) {
//   raf = window.requestAnimationFrame(new_shape.anime(raf));
// });

// stop.addEventListener('click', function(e) {
//   window.cancelAnimationFrame(raf);
// });

// rewind.addEventListener('click', function(e) {
//   window.cancelAnimationFrame(raf);
// });



//------ OBTAINING IMAGES ------
// let sel_ava = document.querySelector ( '#select_ava' )
// let image_arr = []
// for (let i = 0; i<10; i++){
//   fetch(`https://www.shareicon.net/data/2015/12/14/20781${i}_face_300x300.png`)
//   .then(response => {
//       response.blob().then(response => {
//         urlObject = URL.createObjectURL( response)
//         console.log(urlObject)
// //         var image = document.createElement('img')
// //         image.src = urlObject
// //         image.width = 50
// //         image.height = 50
// //         document.body.appendChild(image)
//       image_arr.push(urlObject)
    
//        var option = document.createElement('option')
//        option.value = i
//        option.innerHTML = ++i
// //        option.appendChild(image)
//        sel_ava.appendChild(option)
//       })
//   })
// }

//----- DRAWING IMAGE ON SELECT -----
// var pict;
// sel_ava.onchange = function(e){
//   ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
//   ctx.fillRect(0,0,canvas.width,canvas.height);
//   pict = null;
//   pict = new Image()
//   pict.src = image_arr[sel_ava.value]
//   console.log("---",sel_ava.value,"--",image_arr[sel_ava.value],"  ",pict.src)
//   pict.onload = function(e){
//     ctx.drawImage(pict, 10,10,50,50)
//   }  
// }


//----- ANIMATION FOR IMAGE-----
// var x=30, y=30, vx=10, vy=1
// function move(){
//   ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
//   ctx.fillRect(0,0,canvas.width,canvas.height);
//   ctx.drawImage(pict,x,y,30,30)
//   x+=vx
//   y+=vy
//   if (y + vy > canvas.height ||
//       y + vy < 0) {
//     vy =- vy;
//   }
//   if (x + vx > canvas.width ||
//       x + vx < 0) {
//     vx =- vx;
//   }

//   raf = window.requestAnimationFrame(move);
// }

//----- MOUSE CONTROL FOR IMAGE -----
// canvas.addEventListener('mousemove', function(e) {
//   if (!running) {
//     ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
//     ctx.fillRect(0,0,canvas.width,canvas.height);
  
//     x = e.clientX - 20
//     y = e.clientY - 250
//     ctx.drawImage(pict,x,y,30,30)
//     console.log("mousemove --- ",pict)
//   }
// });

// canvas.addEventListener('click', function(e) {
//   if (!running) {
//     raf = window.requestAnimationFrame(move);
//     running = true;
//   }
// });

// canvas.addEventListener('mouseout', function(e) {
//   window.cancelAnimationFrame(raf);
//   running = false;
// });



// class Square extends Shape{
//   constructor(x1,y1,x2,y2){
//     super();

//       this.x1 = x1;
//       this.y1 = y1;
//       this.x2 = x2;
//       this.y2 = y2;
//       this.draw = function(){
//         ctx.beginPath();
//         ctx.fillRect(this.x1,this.y1,this.x2,this.y2)
//         ctx.closePath();
//         ctx.fillStyle = this.color;
//         ctx.fill();
//       }
//   }
// }

// class Triangle extends Shape{
//   constructor(x,y){
//     super();
    
//     this.x=x;
//     this.y=y;
//     this.draw = function(){
//       ctx.beginPath();
//       ctx.moveTo(x,x);
//       ctx.lineTo(x,y)
//       ctx.lineTo(y,x);
//       ctx.fill();
//     }

//   }

// }

// Mouse control
// canvas.addEventListener('mousemove', function(e) {
//   if (!running) {
//     clear();
//     new_shape.attrs = {x: e.clientX-300, y: e.clientY-120};
//     new_shape.draw();
//     console.log("mousemove --- ",new_shape)
//   }
// });

// canvas.addEventListener('click', function(e) {
//   if (!running) {
//     raf = window.requestAnimationFrame(anime);
//     running = true;
//   }
// });

// canvas.addEventListener('mouseout', function(e) {
//   window.cancelAnimationFrame(raf);
//   running = false;
// });

// new_shape.draw();