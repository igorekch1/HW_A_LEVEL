var LibraryBook = function (_title,_year,_author) {
	var title = _title,
		year = _year,
	 	author = _author,
	 	readerName =  null,
	 	readerData = null;

	var giveTheBook = function(client){
		readerName = client;
		readerData = new Date().toLocaleString().split(', ')[0];
	}

	this.getBookInfo = function(){
		if (readerName) {
			return `Current owner of the book: ${readerName} \nWas taken on: ${readerData}`}
			 else {
			 	return `Title: "${_title}", Year: ${_year}, Author: ${_author} \nThe book is available!`;
		}
	}

	this.getTheBook = function(client){
		if (readerName){
			this.getBookInfo();
			return null;
		} else{
			giveTheBook(client);
			return `"${title}", ${year}, ${author} was given to ${readerName}`;
		}
	}

	this.returnBook = function(){
		if (!readerName) return "This book has been already returned!"
			else{
				readerData = null;
				readerName = null;
				return "Book is returned!";	
			}
	}
}

var books = [];
books[0] = new LibraryBook("The picture of Dorian Gray",1890,"Oscar Wilde");

console.log(books[0].getBookInfo());
console.log(books[0].returnBook());
console.log(books[0].getBookInfo());
console.log(books[0].getTheBook("Vasiliy"));
console.log(books[0].getBookInfo());
console.log(books[0].returnBook());
console.log(books[0].getBookInfo());