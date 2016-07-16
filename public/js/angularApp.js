var app = angular.module('dscvrspace', ['ngRoute', '720kb.datepicker']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  var $log =  angular.injector(['ng']).get('$log');
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
  }).when('/error', {
    templateUrl:'/views/error.ejs',
    controller:'ErrorController',
  }).otherwise('/');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false 
  });
}]);

app.controller('mainController', ['$scope', '$location', '$log','neoFactory', function($scope, $location, $log, neoFactory) {
  $scope.$watch('requestedLocation', function () {
    $log.log($scope.requestedLocation);
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
