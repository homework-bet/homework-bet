
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
myApp.controller('loginController', ['$scope', '$http', '$location', '$log', 
  function($scope, $http, $location, $log) {
    $log.log($scope);
    $log.log('loginController is not yet fully set up.');
    $scope.data = {};
    $scope.user = {};
  
    var request = $http.get('/api/login');    
    request.success(function(data) {
        $scope.loginFormData = data;
        console.log(data);
        console.log("SUCCESSFULLY GOT THE LOGIN PAGE STUFF!");
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });
  
  
    // needs http post request, rewriting /login express route as /api/login
    $scope.loginUser = function () {
      console.log($scope.user);
      // set up data to post
      var data = {
        email:    $scope.user.email,
        password: $scope.user.password
      };
  
      // set up request
      $http.post('/api/login', JSON.stringify(data)).then(function (response) {
        if (response.data) {
          $scope.msg = "Post Data Submitted Successfully!";
          console.log($scope.msg);
          $scope.loginResponse = response.data;
          console.log($scope.loginResponse);
          // from here, we need to validate the response to determine where to go
          if($scope.loginResponse.error) {
            // TODO fix - this error passing is not correct syntax
            //$location.path('/404', {error: $scope.loginResponse.error});
            $location.path('/404');
          } else {
            $location.path('/profile');
          }
        }
      }, function (response) {
        $scope.msg = "Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
        $scope.headers = response.headers();
      });
    };
}]);

// profileController
myApp.controller('profileController', ['$scope', '$log', function($scope, $log) {
  $log.log($scope);
  $log.log('profileController is not yet set up.');
}]);

myApp.controller('registerController', ['$scope', '$http', '$location', 
  function($scope, $http, $location) {
    $scope.registerUser = function() {
      console.log($scope.user);
        var data = {
          firstName:  $scope.user.firstName,
          lastName:   $scope.user.lastName,
          password:   $scope.user.password, 
          email:      $scope.user.email
      };
      // set up request
      $http.post('/api/register', JSON.stringify(data)).then(function (response) {
        if (response.data) {
          $scope.msg = "Post Register Data Submitted Successfully!";
          console.log($scope.msg);
          $scope.registerResponse = response.data;
          console.log($scope.registerResponse);
          // from here, we need to validate the response to determine where to go
          if($scope.registerResponse.error) {
            // TODO fix - this error passing is not correct syntax
            //$location.path('/404', {error: $scope.registerResponse.error});
            $location.path('/404');
          } else {
            $location.path('/profile');
          }
        }
      }, function (response) {
        $scope.msg = "Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
        $scope.headers = response.headers();
      });
    };


}]);


