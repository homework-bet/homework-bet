
// set up angular app
var myApp = angular.module('HomeworkBetApp', ['ngRoute']);


// add routes

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main.html',
      controller: 'routeController'
    })
    .when('/about', {
      templateUrl: 'partials/about.html',
      controller: 'pageController'
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'pageController'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'pageController'
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      controller: 'pageController'
    })
    .when('/campaigns', {
      templateUrl: 'partials/campaigns.html',
      controller: 'pageController'
    });
}]);

myApp.controller('pageController', ['$scope', '$log', function($scope, $log) {
  $log.log($scope);
}]);


myApp.controller('routeController', ['$scope', function($scope) {
  $scope.template = {
    banner: 'partials/banner.html',
    about: 'partials/about.html',
    contact: 'partials/contact.html'
  }  
}]);
