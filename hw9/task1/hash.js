var images = [
	"https://resize.indiatvnews.com/en/centered/newbucket/715_431/2018/03/h6-1521531233.jpg",
	"https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350",
	"https://www.elastic.co/assets/bltada7771f270d08f6/enhanced-buzz-1492-1379411828-15.jpg",
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0_2nqm0H20gpO-Pf9BsBwuAYt3McWcb-6rFs37i244h71Lyrnkg",
	"https://vignette.wikia.nocookie.net/creepypastabrasil/images/b/bf/Sul.jpg/revision/latest?cb=20161014184718&path-prefix=pt-br"
];

var img = document.body.appendChild(document.createElement("img"));
var res = [];
var count = 0;

function hashHandler(e){

	res.push({
		pageID : location.hash,
		startTime : new Date().toLocaleString()
	});

	//-----------test-------------
	console.log(res)
	//----------------------------

	localStorage.setItem("test", JSON.stringify(res))
	console.log("hash was changed")

	//-----------test-------------
	console.log(localStorage.getItem("test"))
	//----------------------------

	if (count === 5) count = 0;
	img.src = images[count++]
};


window.addEventListener("hashchange",hashHandler);