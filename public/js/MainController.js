var app = angular.module('main', ['ngRoute']);

console.log("I WORK MAIN CONTROLLER");

app.controller('MainController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
	this.greeting = "HELLO WORLD";
}])