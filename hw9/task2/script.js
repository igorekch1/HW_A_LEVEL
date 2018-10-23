fetch("https://ichef.bbci.co.uk/images/ic/720x405/p0517py6.jpg")
	.then(response => {
		response.blob().then(response =>{
			url = URL.createObjectURL(response);
			var img = document.body.appendChild(document.createElement("img")) 
			img.src = url
		})		
	})