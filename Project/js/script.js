class CanvasElement extends HTMLElement {
  constructor() {
    super()
    document.body.style = 'background-color:black;'
    this.shadow = this.attachShadow({mode:'open'})
    this.canvas = document.createElement ( 'canvas' )
    this.shadow.appendChild ( this.canvas )
    this.canvas.width = 900
    this.canvas.height = 500
    this.canvas.style = `
      background-color: #ffffff;
      margin: 0 0 0 300px;
      border: 1px solid; 
      margin-top: 105px;
    `

    let googleapis = document.createElement ( 'link' )
    googleapis.rel="stylesheet"
    googleapis.href="https://fonts.googleapis.com/icon?family=Material+Icons"
    document.head.appendChild ( googleapis )

    const buttons = [
        { id: "startButton", type: "play_circle_filled", style: `
            position: fixed;
            top: 15px;
            left: 47%;
        `, click: this.animateShape },
        { id: "pauseButton", type: "pause_circle_filled", style: `
            position: fixed;
            top: 15px;
            left: 50%;
        `, click: this.stopAnimate },
        { id: "forwardButton", type: "fast_forward", style: `
            position: fixed;
            top: 55px;
            left: 47%;
        ` },
        { id: "rewindButton", type: "fast_rewind", style : `
            position: fixed;
            top: 55px;
            left: 50%;
        ` }
    ]
    buttons.forEach ( button => {
      this [ button.id ] = document.createElement ( 'i' )
      this.shadow.appendChild ( this [ button.id ] )
      this [ button.id ].className = 'material-icons'
      this [ button.id ].innerHTML = button.type
      this [ button.id ].style = button.style
      this [ button.id ].addEventListener("click", button.click) 
    })
    
    const selects = [
      {for: `select_figure`, text: "Choose figure: ", id: "select_figure", 
      style_select: `
          width: 120px; 
          height: 25px;
      `, 
      style_label : `
          color: #fff;
          padding-right: 5px;
      `, 
      style: `
          position: fixed;
          top: 10px;
          left: 10px;
      `},

      {for: `select_image`, text: "Choose avatar: ", id: "select_image", 
      style_select: `
          width: 120px; 
          height: 25px
      `, 
      style_label : `
          color: #fff;
          padding-right: 5px;
      `, 
      style: `
          position: fixed;
          top: 50px;
          left: 10px;
      `}
    ] 
    selects.forEach( (select) => {
      var p = document.createElement("p")
      p.style = select.style
      this.shadow.appendChild( p )
      var label = document.createElement('label')
      label.for = select.for
      label.innerHTML = select.text
      label.style = select.style_label
      p.appendChild( label )  
      var sel = document.createElement('select')
      p.appendChild( sel )
      sel.style = select.style_select
      sel.id = select.id
    })

    // var select_figure = this.shadow.querySelector("#select_figure")
    // const options = [
    // {value: "..."}, 
    // {value: "Circle", onclick: this.setFigure("circle")},
    // {value: "Square", onclick: this.setFigure("square")}
    // ]
    // options.forEach ( x => {
    //     var opt = document.createElement ( 'option' )
    //     opt.innerHTML = x
    //     opt.value = x
    //     select_figure.appendChild ( opt )
    //     opt.onclick = x.onclick
    // })

    let style = document.createElement ( 'style' )
    style.innerText = `
      .material-icons {
          font-family: 'Material Icons';
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          font-style: normal;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          -webkit-font-feature-settings: 'liga';
          -webkit-font-smoothing: antialiased;
          font-size: 38px;
          color: #fff;
          cursor: pointer;
      }
    `
    this.shadow.appendChild ( style )

    this.ctx = this.canvas.getContext ( '2d' )
    this.figure = "circle"
    this.coords = { x: 100, y: 100 }
    this.size = 30
    this.fillColor = "#009000"
  }
  setFigure ( fig ) {
    this.figure = fig
    this.createFigure ()
  }
  createFigure () {
    this.ctx.beginPath()
    this [ this.figure ] ()
    this.ctx.fill()
  }
  circle () {
    this.ctx.arc ( this.coords.x, this.coords.y, this.size, 0, 2 * Math.PI )
  }
  square () {
    this.ctx.rect ( this.coords.x, this.coords.y, this.size, this.size )
  }
  triangle () {
    
  }
  setCoords ( x, y ) {
    this.coords = { x: x, y: y }
  }
  setFillColor ( color ) {
    this.ctx.fillStyle = color || this.fillColor
  }
  setFigureSize ( size ) {
    this.size = size
  }
  animateShape () {
    console.log("Animating...")
  }
  stopAnimate(){
    console.log("Animation is stopped")
  }
}

customElements.define ( 'canvas-element', CanvasElement )

let canvas = document.body.appendChild (
    document.createElement ( 'canvas-element' )
)
canvas.setFillColor ( "#ссс" )
canvas.createFigure ()
canvas.figure = "square"
canvas.coords = { x: 300, y: 300 }
canvas.setFillColor ( "#00ff00" )
canvas.createFigure ()