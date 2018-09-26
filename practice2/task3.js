function delChar(str){
    var newStr = "";
    for (var i = 0; i<str.length; i++){
        if ((str.charCodeAt(i) < 1103) && (str.charCodeAt(i) > 1040)){
            newStr+=str.substr(i,1);
        }
    }
    return newStr;
}

var result = delChar("Вчbvnера 789 был home work наiuyстоtящий + празrorднgfdик");
console.log(result);