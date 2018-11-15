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
size.big = document.getElementById("big")
