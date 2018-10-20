function readData(file, callback){
	var request = new XMLHttpRequest();

	request.open("GET", file);

	request.setRequestHeader("Content-Type", "application/json")

	request.onreadystatechange = function(event){
		if (this.readyState === 4 && this.status === 200){
			callback(this.responseText);
		}
	}

	request.send();


}

readData("./myobject.json", function(text){
	var data = JSON.parse(text);
	console.dir(data);
	for (images of data){
		var img = document.body.appendChild(document.createElement("img"));
		img.src = images.ref;
		var imgTitle = document.body.appendChild(document.createElement("p"))
		imgTitle.innerHTML = images.title;
		var size = (img.width)/2 - 30;
		imgTitle.style.margin = `5px 0 50px ${size}px`;
	}

})
