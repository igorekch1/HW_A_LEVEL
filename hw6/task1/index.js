var operations = [  'push',  'pop',  'shift',  'unshift', 'splice'  ]
var currentOperation = null
var arr = []

var arrElem = document.createElement ( 'section' )
document.body.appendChild ( arrElem )
arrElem.innerHTML = arr

var elem = document.createElement ( 'input' )
elem.type = 'text'
document.body.appendChild ( elem )
elem.placeholder = 'новый элемент массива'
elem.style.visibility = 'hidden'

elem.onchange = function ( event ) {

    arr [ currentOperation ] === 'splice' ? 
        insert(this.value, ind):  
            arr[ currentOperation ] (this.value)
  
    arrElem.innerHTML = arr
    this.style.visibility = 'hidden'
}

function insert(num, ind){
    arr.splice(num, 0 , ind)
}


var index = document.createElement('input');
index.type = 'text';
document.body.appendChild(index);
index.placeholder = "enter index:";
index.style.visibility = 'hidden';


//index on change
index.onchange = function (event){
    this.style.visibility = 'hidden'
    var ind =  this.value;
}


var extracted = document.createElement ( 'p' )
document.body.appendChild ( extracted )

var btns = []

for ( var operation of operations ) {
    btns.push ( 
      document.body.appendChild ( 
        document.createElement ( 'button' )
      )
    )
    btns [ btns.length-1 ].innerHTML = operation
    btns [ btns.length-1 ].onclick = exploreArray.bind ( elem )
}



