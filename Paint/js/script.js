var canvasFront = document.getElementById('front-canvas'),
    canvasBack = document.getElementById('back-canvas'),
    ctxf = canvasFront.getContext("2d"),
    ctxb = canvasBack.getContext("2d");

var canvasWidth = document.getElementById("canvas-width");
var canvasHeight = document.getElementById("canvas-height");

var canvasPosition;

var mouseX, mouseY,
    mouseXl = document.getElementById("mouseX"),
    mouseYl = document.getElementById("mouseY");

var tools = [], sizes = [];

tools.pencil = document.getElementById("pencil");
tools.eraser = document.getElementById("eraser");

sizes.small = document.getElementById("small");
sizes.middle = document.getElementById("middle");
sizes.big = document.getElementById("big")

var eraserSize = 8, 
    eraseCursor = "url(image/eraser.png), auto";

var canvasClear = document.getElementById("clear-canvas"),
    fileImg = document.getElementById("img-file"),
    properties = document.getElementById("properties"),
    imgWidth = document.getElementById("img-width"),
    imgHeight = document.getElementById("img-height"),
    invert = document.getElementById('invert');

var startX = 100, startY = 100;

window.onload = function(e){
  canvasPosition = canvasBack.getBoundingClientRect();
  console.log(canvasPosition)
}

canvasWidth.onchange = function(e){
  canvasFront.width = this.value;
  canvasBack.width = this.value;
}

canvasHeight.onchange = function(e){
  canvasFront.height = this.value;
  canvasBack.height = this.value;
}

canvasFront.onmousemove = function(e){
  mouseX = e.clientX - canvasPosition.left;
  mouseY = e.clientY - canvasPosition.top;
  mouseXl.innerHTML = mouseX;
  mouseYl.innerHTML = mouseY;
}

canvasClear.onclick = function(e){
  canvasBack.width = canvasBack.width;
  canvasFront.width = canvasFront.width;
}

addAllHandlers(tools,"tool-active");
addAllHandlers(sizes,"size-active");

function addAllHandlers(arr, className){
  for (var item in arr){
    arr[item].onmousedown = addHandler(arr[item], arr, className)
  }
}

function addHandler(element, arr, className){
  return function() {
    removeAllClasses(arr);
    element.setAttribute("class", className);
  }
}

function removeAllClasses(arr){
  for (var item in arr){
    arr[item].removeAttribute("class");
  }
}

sizes.small.onclick = function(e){
  ctxb.lineWidth = 1;
  eraserSize = 8;
  eraseCursor = "url(image/cursor.png), auto"

}

sizes.middle.onclick = function(e){
  ctxb.lineWidth = 5;
  eraserSize = 16;
  eraseCursor = "url(image/cursor.png), auto"

}

sizes.big.onclick = function(e){
  ctxb.lineWidth = 15;
  eraserSize = 32;
  eraseCursor = "url(image/cursor.png), auto"
}

var processing = false;
var operations = [];

operations['mousedown'] = function(){
  processing = true;
  ctxb.beginPath();
}
operations['mouseup'] = function(){
  processing = false;
}

canvasFront.addEventListener("mousedown", operations["mousedown"]);
canvasFront.addEventListener("mouseup", operations["mouseup"]);
canvasFront.addEventListener("mousemove", operations["mousemove"]);

tools.pencil.onclick = function(e){
  canvasFront.style.cursor = "pointer";
  console.log(tools.pencil)
  operations["mousemove"] = function(){
    if (processing){
      console.log("painting....")
      ctxb.lineTo(mouseX, mouseY);
      ctxb.stroke();
    }
  }
}

tools.eraser.onclick = function(e){
  canvasFront.style.cursor = "pointer";
  console.log(tools.pencil)
  operations["mousemove"] = function(){
    if (processing){
      ctxb.clearRect(mouseX,mouseY, eraserSize, eraserSize);
    }
  }
}

color.onchange = function(e){
  ctxb.strokeStyle = e.srcElement.value
}

fileImg.onchange = function(e){
  var file = fileImg.files[0];
  var reader = new FileReader();
  reader.onload = function(e){
    var url = e.target.result;
    img = new Image();
    img.onload = function(){
      ctxf.strokeRect(startX, startY, img.width, img.height);
      ctxf.drawImage(img, startX, startY);
      
      operations['mousemove'] = function(e){
        if (processing){
          canvasFront.width = canvasFront.width;
          ctxf.strokeRect(mouseX, mouseY, imgWidth.value, imgHeight.value);
          ctxf.drawImage(img, mouseX, mouseY, imgWidth.value, imgHeight.value);
        }
      }

      operations['mouseup'] = function(e){
        properties.style.display = `none`;
        canvasFront.width = canvasFront.width;
        processing = false;
        ctxb.drawImage(img, mouseX, mouseY, imgWidth.value, imgHeight.value);
        operations['mousemove'] = undefined;
        operations['mouseup'] = function(e){
          processing = false;
        }
      }
    }

    img.src = url;
    properties.style.display = `block`;
    imgWidth.value = img.width;
    imgHeight.value = img.height;
  }
  reader.readAsDataURL(file);
}

imgHeight.addEventListener("change", changeImageSize);
imgWidth.addEventListener("change", changeImageSize);

function changeImageSize(){
  canvasFront.width = canvasFront.width;
  ctxf.strokeRect(startX, startY, imgWidth.value, imgHeight.value);
  ctxf.drawImage(img, startX, startY, imgWidth.value, imgHeight.value);
}

invert.addEventListener("click", invertImage);

function invertImage(){
  var imageData = ctxf.getImageData(startX, startY, imgWidth.value, imgHeight.value);
  console.log(imageData)
  for(var i = 0; i < imageData.data.length; i += 4){
    for(var j = i; j < i + 3; j++ ){
      imageData.data[j] = 255 - imageData.data[j];
    }
  }
  ctxf.putImageData(imageData, startX, startY);
}

