
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
      templateUrl: 'partials/about.html'
    })
    .when('/campaigns', {
      templateUrl: 'partials/campaigns.html',
      controller: 'campaignController'
    }) 
    .when('/contact', {
      templateUrl: 'partials/contact.html'
    })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController'
    })
    .when('/profile', {
      templateUrl: 'partials/profile.html',
      controller: 'profileController'
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController'
    })
    .otherwise({
      templateUrl: 'partials/404.html'
    });
}]);

myApp.run(function($rootScope, $window) {
    if ($window.localStorage.user) {
      $rootScope.currentUser = JSON.parse($window.localStorage.user);
    }
});

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

// campaignController
myApp.controller('campaignController', ['$scope', '$log', function($scope, $log) {
  $log.log($scope);
  $log.log('campaignController is not yet set up.');
}]);

// loginController
myApp.controller('loginController', ['$scope', '$http', '$log', function($scope, $http, $log) {
  $log.log($scope);
  $log.log('loginController is not yet set up.');
      $scope.data = [];
  var request = $http.get('/register');    
  request.success(function(data) {
      $scope.data = data;
  });
  request.error(function(data){
      console.log('Error: ' + data);
  });
  $log.log($scope.data);
}]);

// profileController
myApp.controller('profileController', ['$scope', '$log', function($scope, $log) {
  $log.log($scope);
  $log.log('profileController is not yet set up.');
}]);

myApp.controller('registerController', ['$scope', '$rootScope', '$location', '$window', '$auth', 
  function($scope, $rootScope, $location, $window, $auth) {
    $scope.registerUser = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
}]);


