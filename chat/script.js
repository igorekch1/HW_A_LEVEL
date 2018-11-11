document.body.innerHTML = "";
document.body.style = `
    font-family: monospace, Arial;
    font-size: 14px;
`

let lastUpdate

let getData = function ( ref ) {
    return fetch ( 'http://localhost:3000/' + ref )
        .then ( response => response.json () )
}
let appElem = ( tagName, container ) => 
    ( container ? container : document.body )
        .appendChild ( document.createElement ( tagName ) )

let chat
let posts
let users
let currentUser

let chatInput = appElem ( 'input' )
chatInput.style = `
    position: fixed;
    left: 20px;
    width: 80%;
    bottom: 10px;
    border: inset 1px;
    background-color: #af9;
    overflow: auto;
`

let buildChat = function () {
    chat = appElem ( 'section' )
    chat.style = `
        position: fixed;
        top: 70px;
        left: 20px;
        right: 20px;
        bottom: 70px;
        border: inset 1px;
        overflow: auto;
        padding: 10px;
    `
}

let updateChat = async function () {
    
    let updated = await getData ( "lastUpdate" )

    if ( lastUpdate &&
         updated.data === lastUpdate.data && 
         updated.time === lastUpdate.time )
        return

    await Promise.all ( [
        getData ( "users" ).then ( x => users = x ) , 
        getData ( "posts" ).then ( x => posts = x )
    ] )
        
        // PAY ATTENTION !!!!!
        currentUser = users [ users.length - 1 ]
        currentUserId = currentUser.id
    
    console.log("current: ", currentUser) // ВЫВОДИТ ПРЕДЫДУЩИЙ ID 

    initChat ()

    lastUpdate = {
        data: updated.data,
        time: updated.time
    }

    chat.scrollTop = chat.scrollHeight
}

let initChat = async function () {
    chat.innerHTML = ""
    posts.forEach ( post => {
        let user = users.filter ( x => x.id === post.userId )[0]
        chat.appendChild (
            ( function () {
                let cont = appElem ( 'div' )
                let ava = appElem ( 'img', cont )
                ava.src = user.photoURL
                ava.width = "40"
                ava.title = ` ${user.name} ${user.lastName}`
                span_name = appElem ('span', cont).innerHTML = `<small>${user.name} ${user.lastName}</small><br \/>`
                span_name.style = `
                    position: relative;
                    top: -30px;
                    left: 10px;
                `
                let span_date = appElem ( 'span', cont ).innerHTML = ` <small> ${post.date} ${post.time}</small>`
                span_date.style = `
                    position: relative;
                    top: -20px;
                    left: 50px;
                `
                appElem ( 'p', cont ).innerText = post.body
                return cont
            }) ( user )
        )
    })
}

let user_name
let user_lastName
let user_photoURL
let sendData
let regit

//Making registration
let buildCheckIn = function () {
	// Making button to display inputs
    let but = appElem("button")
    but.innerHTML = `Check in`
    but.style= `
        position: fixed;
        top: 10px;
        right: 20px;
        bottom: 80px;
    `
	//Making container for input elements
	regit = appElem("div")
	regit.style = `
		position: fixed;
		top: 10px;
		right : 150px;
		width: 200px;
		height: 150px;
		display : none;
        background-color: #eee;
		padding : 10px 10px 170px 10px;
        border: 1px solid #000;
		border-radius: 5%;
	`
    //Making inputs
	let p1 = appElem("p",regit)
    user_name = appElem("input",p1)
    user_name.placeholder = `Enter your first name`
	let p2 = appElem("p",regit)
	user_lastName = appElem("input",p2)
	user_lastName.placeholder = `Enter your second name`
	let p3 = appElem("p",regit)
	user_photoURL = appElem("input",p3)
	user_photoURL.placeholder = `Enter photoURL`

	let pCollection = document.body.querySelectorAll("p")
	pCollection.forEach(x =>
		x.style = `
			margin-bottom: 0px;
		`
	)

    let inputCollection = regit.querySelectorAll("input")
    inputCollection.forEach(x =>
        x.style = `
            background-color : #fff;
        `
    )
    
    //Making button to send data on the server
    sendData = appElem("button", regit)
    sendData.innerHTML = `Submit`
    sendData.style = `
			position: fixed;
			top: 130px;
			right : 105px;
		`

    // Display input on button-click
	but.onclick = function(e){
		e.preventDefault()
		regit.style = `
			position: fixed;
			top: 0px;
			right : 50px;
			width: 200px;
			height: 150px;
			display : inline-block;
		`
	}
    
    // Sending data to make a new user
	checkIn()
		
}

// Sending data to make a new user
let checkIn = function(){
    sendData.onclick = function(e){
        fetch("http://localhost:3000/users", {
            method: 'POST',
            body: JSON.stringify ({
                name: user_name.value,
                lastName: user_lastName.value,
                photoURL: user_photoURL.value
           }),
           headers: {
               "Content-type": "application/json"
            } 
        }).then(response => console.log(response))
console.log("New user:\n",user_name.value,"\n", user_lastName.value,"\n",user_photoURL.value)
        
        regit.style = `
            display: none;
        `
        updateChat ()    
    }
}

buildChat ()
buildCheckIn()

setTimeout ( function () {
    chat.scrollTop = chat.scrollHeight
}, 200 )

let interval = setInterval ( function () {
    updateChat ()
}, 500 )

chatInput.onchange = function ( event ) {
    console.log("currentUser - ", currentUser)
    console.log("curentuserid - ", currentUserId)
    let postTime = new Date().toLocaleString ().split ( ', ' )
    fetch ( 'http://localhost:3000/lastUpdate', {
        method: 'POST',
        body: JSON.stringify ({
            data: postTime [0],
            time: postTime [1]
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
    fetch ( 'http://localhost:3000/posts', {
        method: 'POST',
        body: JSON.stringify ({
            date: postTime [0],
            time: postTime [1],
            userId: currentUserId,
            body: event.target.value
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
}

