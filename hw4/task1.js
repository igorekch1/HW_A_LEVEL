var handbag = {
	size: "medium",
	color: "red",
	price: 1200,
	content: ["духи","помада","сигареты","расческа","зеркальце","тушь","телефон","кошелёк"],
	addItem: function(item){
		this.content.push(item);
	},
	delItem: function(num){
		this.content.splice(num,1);
	}
}
console.log(handbag.content);
console.log("---------------");
handbag.addItem("блокнот");
console.log(handbag.content);
console.log("---------------");
handbag.delItem(5);
console.log(handbag.content);
