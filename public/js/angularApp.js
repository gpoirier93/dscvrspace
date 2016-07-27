var $log =  angular.injector(['ng']).get('$log');
var app = angular.module('dscvrspace', ['ngRoute', '720kb.datepicker']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl: '/views/home.ejs',
    controller: 'homeController'
  }).when('/solarSystem', {
    templateUrl: 'views/solarSystem.ejs',
    controller:'SystemController',
    resolve: {
      system: function(systemService) {
        return systemService.getSolarSystem();
      }
    }
  }).when('/about', {
    templateUrl:'/views/about.ejs',
    controller:'aboutController'
  }).when('/neo', {
    templateUrl:'/views/neoSearch.ejs',
    controller:'NeoSearchController'
  }).when('/neo/:id', {
    templateUrl:'/views/neoDetails.ejs',
    controller:'NeoDetailsController'
  }).when('/system/:planet', {
    templateUrl:'/views/systemDetails.ejs',
    controller:'SystemDetailController',
    resolve: {
      system: ['systemService', '$route', function(systemService, $route) {
        var id = systemService.getPlanetIdForSystemUrl($route.current.params.planet);
        if (id !== 0) {
          return systemService.getPlanetById(id);
        } else {
          return {};
        }
      }]
    }
  }).when('/error', {
    templateUrl:'/views/error.ejs',
    controller:'ErrorController',
  }).otherwise('/');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false 
  });
}]);

app.controller('MainController', ['$scope', '$location', '$log','neoFactory','systemService', function($scope, $location, $log, neoFactory, systemService) {
  $scope.navbarItems = [{
        "display_name":"Soleil",
        "url":"/solarSystem",
        "item_id":1
    },{
        "display_name":"Mercure",
        "url":"/system/mercury",
        "item_id":1
    },{
        "display_name":"Vénus",
        "url":"/system/venus",
        "item_id":2
    },{
        "display_name":"Terre",
        "url":"/system/earth",
        "item_id":3
    },{
        "display_name":"Mars",
        "url":"/system/mars",
        "item_id":4
    },{
        "display_name":"Jupiter",
        "url":"/system/jupiter",
        "item_id":5
    },{
        "display_name":"Saturne",
        "url":"/system/saturn",
        "item_id":6
    },{
        "display_name":"Uranus",
        "url":"/system/uranus",
        "item_id":7
    },{
        "display_name":"Neptune",
        "url":"/system/neptune",
        "item_id":8
    }];
  $scope.$watch('requestedLocation', function () {
    if ($scope.requestedLocation !== 'home') {
      $location.path('/'+$scope.requestedLocation);
    } else {
      $location.path('/');
    }
  });
}]);

app.controller('homeController', ['$scope', '$location', '$log', function($scope, $location, $log) {
  
}]);

app.controller('aboutController', function($scope){

});

app.controller('ErrorController', ['$scope', '$location', '$log', function($scope, $location, $log) {

}]);
