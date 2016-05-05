var app = angular.module('resumeApp', ['ngRoute', 'main']);

console.log("I work");

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	// tell angular to use push state
    $locationProvider.html5Mode({ enabled: true }); 
    $routeProvider.
        when('/', {
            templateUrl: 'partials/main.html',
            controller: 'MainController',
            controllerAs: 'MainCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'FormController',
            controllerAs: 'FormCtrl'
        })
}]);