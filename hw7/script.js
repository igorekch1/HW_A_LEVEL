var User = function (name="default_user", email="not_stated"){
	this.name = name;
	this.email = email;
	this.photoUrl = User.getAvatar(); 
}

User.avatars = [
	 "http://kemerovorea.ru/upload/medialibrary/19d/user.png",
     "https://pre00.deviantart.net/50f9/th/pre/i/2011/217/e/8/pikachu_2_by_nostalgiaattack-d45jd3i.png",
     "https://cdn.diversityavatars.com/wp-content/uploads/2018/01/Vector-Smart-Object-5.png",
     "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-31-512.png",
     "http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-L3-icon.png",
     "https://findicons.com/files/icons/1072/face_avatars/300/i05.png",
     "http://www.iconarchive.com/download/i51043/hopstarter/halloween-avatars/Gomez.ico",
     "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/256/Zombie-2-icon.png",
     "https://vignette.wikia.nocookie.net/yogscast/images/8/8a/Avatar_Turps_2015.jpg"
	];

User.admin = {
    photoURL: "https://i.pinimg.com/originals/3d/47/4f/3d474f82ff71595e8081f9a120892ae8.gif",
    name: "admin"
};

User.getAvatar = function(){
	return this.avatars.shift();
};

User.prototype.messageBox = (function(){
	// box wrapper
	var message_box = document.createElement('div');
	message_box.style = `
		position: absolute;
        top: 0;
        left: 0;
		width : 250px;
		height : 200px;
		background-color: #777;
		border: 3px solid #000;
	`;
	document.body.appendChild(message_box);
	
	// userInfo wrapper
	message_box.user_info = message_box.appendChild(document.createElement('div'))
	message_box.user_info.style = `
		width: 100%;
		height: 70px;
		border-bottom: 2px solid #000;	
	`;

	// avatar
	message_box.image = message_box.user_info.appendChild(document.createElement('img'));
	message_box.image.style = `
		width: 50px;
		height: 50px;
		margin: 10px;
	`;

	// userName
	message_box.user_name = message_box.user_info.appendChild(document.createElement('span'));
	message_box.user_name.style = `
		font-size: 20px;
		color: #fff;
		letter-spacing: 2px;
		position: absolute;
		top: 25px;
		left: 80px;
	`;

	// textArea
	message_box.textArea = message_box.appendChild(document.createElement('textarea'));
	message_box.textArea.style = `
		width: 244px;
		height: 122px;
	`;
	message_box.textArea.placeholder = "Chatting...";

	return message_box;
})();

User.prototype.write = function (message){
	console.log(this)
	this.messageBox.image.src = this.photoUrl;
	this.messageBox.user_name = this.name;
	this.messageBox.textArea.value = message;
}


var readMessages = [];
User.prototype.read = function(){
	this.messageBox.user_name = this.name;
	this.messageBox.image.src = this.photoUrl;
	this.messageBox.textArea.value = userInfo;
}

var users = [];
users.push ( new User() )
users.push ( new User ( "Иван" ) )
users.push ( new User ( 'Alex', "alex@gmail.com" ) )
users.push ( new User ( 'Bob', "bob777@gmail.com" ) )
users.push ( new User ( 'Dima', "dima888@gmail.com" ) )
users.push ( new User ( 'Fima', "fima999@gmail.com" ) )

var userInfo = [];
var i =0;
(function run(){
	
	setTimeout(function(){
		users[i].write (`Hello, I'm ${users[i].name}\nMy email: ${users[i].email}`);
		userInfo.push({
			name: users[i].name,
			email: users[i].email
		})
		console.log(users[i]);
		if ( users.length > ++i ) run();
	}, 3000)

	//User.admin.read();
})();
