function readData(file, callback){
	var request = new XMLHttpRequest();

	request.open("GET", file);

	//request.responseType = "json";
	request.setRequestHeader("Content-Type", "application/json")

// 	request.setRequestHeader(
//     "X-CSRF-TOKEN",
//     "AIJu7NUduZPGo-7uZ"
// )	

	request.onreadystatechange = function(event){
		if (this.readyState === 4 && this.state === 200){
			callback(this.responseText);
		}
	}

	request.send();
}

readData("myobject.json", function(text){
	var data = JSON.parse(text);
})

