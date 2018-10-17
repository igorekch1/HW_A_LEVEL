var tagNames = [ "div", "div", "div", "div", "button" ]
var divStyle = `
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: solid 1px green;
    font-size: 25px;
`
elements = tagNames.map ( function ( x ) {
    return document.body.appendChild ( 
        document.createElement ( x ) 
    )
})

elements.filter ( function ( element ) {
    return element.tagName === "DIV"
})
.forEach ( function ( element, num ) {
            element.style = divStyle
            element.innerText = num
})

elements.filter ( function ( element ) {
    return element.tagName === "BUTTON"
})
.forEach ( function ( element ) {
    element.innerHTML = "Remove everything"
    element.onclick = function ( event ) {
        recursRemove()
    }
})

var recursRemove = (function(tag,but){
    var removeElem = document.body.querySelectorAll(tag);
    var removeBut = document.body.querySelector(but);
    var ind = 0;

    return function removeDiv(){
        while (removeElem.length !== ind ){
            removeElem[ind].parentNode.removeChild(removeElem[ind++]);
            removeDiv(); 
            removeBut.parentNode.removeChild(removeBut);
        }
    }
    
})("DIV", "BUTTON")
