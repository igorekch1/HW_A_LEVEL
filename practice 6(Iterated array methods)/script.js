var sourceArray = [
        {  id: "http",  ref:  "https://www.w3schools.com/" },
        {  id: "translate",  ref:  "https://translate.google.com" },
        {  id: "develop",  ref:  "https://stackoverflow.com/questions" },
        {  id: "vue",  ref:  "https://garevna.github.io/vue-course.github.io/#/" },
        {  id: "W3C",  ref:  "https://www.w3.org/" },
        {  id: "JS",  ref:  "https://www.w3schools.com/js/default.asp" },
        {  id: "git",  ref:  "https://github.com" },
]

//task1 
var res = [];

sourceArray.forEach(function(x){
	res.push(x.id)
},res)

console.log(res); 

//task2
var www = sourceArray.filter((x => ~(x.ref).indexOf("www"))) // ~ - not -1 

console.log(www);

//task3
sourceArray.forEach(function(x){
	var p = document.body.appendChild(document.createElement('p'));
	p.innerHTML = x.ref;
	p.style.fontSize = '20px';
})