
// set up angular app
var myApp = angular.module('HomeworkBetApp', ['ngRoute']);

const _monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                   "October", "November", "December"];


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
    .when('/join-campaign', {
      templateUrl: 'partials/join-campaign.html',
      controller: 'addCourseController'
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

// myApp.controller('pageController', ['$scope', '$log', function($scope, $log) {
//   $log.log($scope);
// }]);

// for the home page
myApp.controller('routeController', ['$scope', function($scope) {
  $scope.template = {
    banner: 'partials/banner.html',
    about: 'partials/about.html',
    contact: 'partials/contact.html'
  }  
}]);

// addCourseController is for partials/join-campaign.html
myApp.controller('addCourseController', ['$scope', '$http', '$log', 
  function($scope, $http, $log) {
    $log.log($scope);
    $log.log('addCourseController is not yet set up.');
    // this should be set up similar to register, but for adding
    // a course, if the api is ready. GET request should not be
    // needed but POST would.
    $scope.newCourse = {};
    
    $scope.addCourse = function() {
      console.log($scope.newCourse); //TODO remove after testing
      var data = {
        name:       $scope.user.firstName,
        startDate:  $scope.user.startDate,
        endDate:    $scope.user.endDate
      };
      // set up request
      $http.post('/api/courses/new', JSON.stringify(data)).then(function (response) {
        if (response.data) {
          $scope.msg = "Post Register Data Submitted Successfully!";
          console.log($scope.msg);
          $scope.response.newCourse = response.data;
          console.log($scope.response.newCourse);
          // from here, we need to validate the response to determine where to go
          if($scope.response.newCourse.error) {
            // TODO fix - this error passing is not correct syntax
            //$location.path('/404', {error: $scope.registerResponse.error});
            $location.path('/404');
          } else {
            $location.path('/profile'); //TODO update to correct link
          }
        }
      }, function (response) {
        $scope.msg = "Service not Exists";
        $scope.statusval = response.status;
        $scope.statustext = response.statusText;
        $scope.headers = response.headers();
      });
    };
  }
]);
// // anchorController
// myApp.controller('anchorController', function($scope, $location, $anchorScroll) {
//   $scope.scrollTo = function(id) {
//       $location.hash(id);
//       $anchorScroll();
//   }
// });


// campaignController
myApp.controller('campaignController', ['$scope', '$http', '$log', 
  function($scope, $http, $log) {
    $log.log($scope);
    $log.log('campaignController is not yet fully set up.');
   
//    $scope.data = {};
    $scope.campData = {};
    // what to do if going to the page directly?
    // set up a function that gets the first active campaign from a list?
    // that'd involve a get request for the whole pool
    // otherwise if ID is provided, then get request with pool/id

    // for now, just getting the earliest pool to start

        var request = $http.get('/api/pools/');    
        request.success(function(data) {
          
            // just get the first entry for now 
            pool = data.pools[0];
            console.log(pool);
            start = new Date(pool.startDate);
            end = new Date(pool.endDate);
            
            $scope.campData = {     startMonth: _monthNames[ start.getMonth() ], 
                                    endMonth: _monthNames[ end.getMonth() ],
                                    startDay: start.getDate(),
                                    endDay: end.getDate()
                                    };
            console.log("successfully got campaign data");
        });
        request.error(function(data){
            console.log('Error: ' + data);
        });
  }
/*
    $scope.campData = {     startMonth: _monthNames[ 0 ], 
                            endMonth: _monthNames[ 1 ],
                            startDay: 1,
                            endDay: 2, 
                            year: 2018
                            };
*/
  
]);


// loginController is for partials/login.html
myApp.controller('loginController', ['$scope', '$http', '$location', '$log', 
  function($scope, $http, $location, $log) {
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
      // console.log($scope.user); //TODO remove after testing
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
            // should we set this to a standard scope error?
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
  }
]);

// profileController
myApp.controller('profileController', ['$scope', '$http', '$log', 
  function($scope, $http, $log) {
    $log.log($scope);
    $log.log('profileController is not yet set up.');
    // Is user's ID in $scope anywhere? How do we query? I assume by ID?
    // needs to get user info, based on logged in user
    // needs to get user's active campaigns
    // needs to get all campaigns
    // should populate data on page based on these lists 
    // - ALL CAMPAIGN list should have links with ID for redirect to 
    // campaigns/:id
  }
]);

myApp.controller('registerController', ['$scope', '$http', '$location', 
  function($scope, $http, $location) {

    var request = $http.get('/api/register');    
    request.success(function(data) {
        //$scope.registerFormData = data; //TODO remove after testing
        console.log(data);
        console.log("SUCCESSFULLY GOT THE REGISTER PAGE STUFF!");
    });
    request.error(function(data){
        console.log('Error: ' + data);
    });


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
  }
]);


