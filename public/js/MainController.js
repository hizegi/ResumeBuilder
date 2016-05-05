var app = angular.module('main', ['ngRoute']);

console.log("I WORK MAIN CONTROLLER");

app.controller('MainController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	var self = this;
	this.greeting = "HELLO WORLD";
	this.user = false;





	// LOGIN FUNCTION
	this.logIn = function(){
		console.log("LOGIN function firing in app.js");
		$http({
			method: 'post',
			url: '/users/login',
			data: this.loginData
		}).then(
		//success
		function(response){
			console.log(response);
			self.loginData.email = undefined;
			self.loginData.password = undefined;
		},
		function(err){
			// make login error true to change class
	    	self.loginError = true;
			// create variable for element with login-status id
			var box = document.getElementById('login-status');
			// add text to p tag
	    	box.innerHTML = "Incorrect login, please try again!";
		}
		);
	};



}])