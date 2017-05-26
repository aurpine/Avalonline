'use strict';

function Avalon() {
	this.checkSetup();

	this.initFirebase();
}

Avalon.prototype.initFirebase = function() {
	this.auth = firebase.auth();
	this.database = firebase.database();
	this.storage = firebase.storage();
	this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

Avalon.prototype.getRole = function() {
	database.
};



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