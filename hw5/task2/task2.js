var paragraphs = [];

for (var i = 0; i < 4; i++){
	paragraphs.push(document.body.appendChild(document.createElement("p")));
}

var ind = 0 ;
paragraphs.forEach(function(elem){
	elem.innerHTML = "paragraph_" + ind++;
});

function clickHandler(event){
	event.target.style.fontWeight = "900"
}

paragraphs.forEach(function(x){
	x.addEventListener("click",clickHandler);
});

var events = [function clickTextHandler(event){
		event.target.innerHTML = "The text was changed by click"	
	},
	function clickFontHandler(event){
		event.target.style.fontSize = "24px";
	},
	function clickColorHandler(event){
		event.target.style.color = "red";
	},
	function clickItalicHandler(event){
		event.target.style.fontStyle = 'italic';
	}
];

for (var i = 0; i < paragraphs.length; i++){
	paragraphs[i].addEventListener("click", events[i]);
}