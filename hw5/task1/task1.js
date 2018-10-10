var elem = document.body.appendChild(document.createElement("p"));

elem.innerText = "click me";

var img = document.createElement("img");
document.body.appendChild(img);

img.setAttribute("src","https://api.icons8.com/download/24048c89de25bc718f51d8816173ac484a878b29/windows10/PNG/512/Very_Basic/ok-512.png");
img.style = "display: none;";


function clickHandler(event){
	 img.style = "";
     img.style = "height: 100px; width: 100px; margin-left: 50%; margin-top: 15%;"

}

elem.addEventListener("click", clickHandler);

function clickImageHandler(event){
 	event.target.style = `display:none`;
}

img.addEventListener("click", clickImageHandler);

var x = 2, y = 2;
function increaseChild(event){
	this.style.transform = `scale(${x},${y})`;
	this.style.transition = 'transform 3s';
	x++; y++;
}

img.addEventListener("mouseenter",increaseChild);