var names = ["Ivan", "Petr", "Sergej", "Nikoay", "Vasiliy"];
var surnames = ["Ivanov","Petrov","Smith","White","Brown"];
var fullName = [];

//Вариант №1
for(var i = 0; (i<names.length) && (i<surnames.length); i++) {
    fullName.push(names[i] +" "+ surnames[i]);
}

//Вариант №2
for(var i = 0; (i<names.length) && (i<surnames.length); i++){
    fullName[i] = names[i] +" "+ surnames[i];
}

for(var i = 0; (i<names.length) && (i<surnames.length); i++){
    console.log(fullName[i]);
}


