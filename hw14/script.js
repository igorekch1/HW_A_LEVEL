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


class CanvasCustomElement extends HTMLElement{
  constructor(){
    super()

    let wrapper_canvas = document.createElement('div')
    this.canvas = document.createElement('canvas')
    wrapper_canvas.appendChild(this.canvas)
    this.area = this.canvas.getContext("2d")
    this.shadow = this.attachShadow( {mode : 'open'} )

    let style = document.createElement ( 'style' )
    style.textContent = `
      canvas {
        width: 900px;
        height: 500px;
        border: 1px solid; 
        margin-top: 15px;
        background-color: #fff;
        margin: 0 0 0 300px;
      }
    `

    this.shadow.appendChild( style )
    this.shadow.appendChild( wrapper_canvas )
    
  }

  draw(coord, color) {
    this.area.beginPath();
    this.area.arc(coord.x, coord.y, coord.radius, 0, Math.PI * 2, true);
    this.area.closePath();
    this.area.fillStyle = color;
    this.area.fill();  
  }

}


customElements.define ('canvas-custom-element', CanvasCustomElement)

let circle = document.createElement ( 'canvas-custom-element' )
document.body.appendChild ( circle )

circle.draw (
    { x:30, y:30, radius: 20},
    '#000'
);
