'use strict';

function Avalon() {
	this.checkSetup();
	
	this.signInButton = document.getElementById('sign-in');
	this.signOutButton = document.getElementById('sign-out');
	
	this.roomCodeField = document.getElementById('room-code');
	this.joinRoomButton = document.getElementById('join-room');
	
	this.joinRoomButton.addEventListener('click', this.joinRoom.bind(this));
	
	this.signInButton.addEventListener('click', this.signIn.bind(this));

	this.initFirebase();
	console.log("Firebase loaded!");
}

Avalon.prototype.initFirebase = function() {
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.storage = firebase.storage();
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

Avalon.prototype.getRole = function() {
	// TODO: get player role
};

Avalon.prototype.joinRoom = function() {
	if(!this.isSignedIn()) {
		console.log("You must sign in first!");
		return;
	}
	this.room_code = this.roomCodeField.value;
	console.log('Clicked join room button');
	this.room = this.database.ref('room/' + this.room_code);
	console.log("Room: " + this.room_code);
	this.room.once("value").then(function(snapshot) {
		if(!snapshot.hasChildren()) {
			console.log("Room doesn't exist!");
		} else {
			console.log("Joined room!");
		}
	});
	
	
}

Avalon.prototype.isSignedIn = function() {
	if(this.auth.currentUser)
		return true;
}

Avalon.prototype.signIn = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  this.auth.signInWithPopup(provider);
}

Avalon.prototype.createRoom = function() {
	this.room_code = Math.random().toString(36).substr(2, 5);
	if(this.database.ref('room/' + this.room_code)) {
		this.createRoom();
		return;
	}
	// TODO: create room
}

Avalon.prototype.onAuthStateChanged = function(user) {
	if(user) { // User is signed in
		//
	} else { // User is signed out
		//
	}
}

Avalon.prototype.checkSetup = function() {
	if(!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
		window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
	}
}

window.onload = function() {
	window.avalon = new Avalon();
}