var app = angular.module('dscvrspace', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  var $log =  angular.injector(['ng']).get('$log');
  $routeProvider.when('/', {
    templateUrl: '/views/home.ejs',
    controller: 'homeController'
  }).when('/solarSystem', {
    templateUrl: 'views/solarSystem.ejs',
    controller:'systemController',
    resolve: {
      system: function(systemService) {
        return systemService.getSolarSystem();
      }
    }
  }).when('/about', {
    templateUrl:'/views/about.ejs',
    controller:'aboutController'
  }).otherwise('/');

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false 
  });
}]);

app.controller('mainController', function($scope) {
  $scope.message = 'Main page';
});

app.controller('homeController', function($scope) {
  $scope.message = 'Home Page';
});

app.controller('aboutController', function($scope){

});

app.controller('systemController', function($scope, $log, system) {
  $log.log(system);
  $scope.message = 'System Page';
});

app.controller('detailController', function($scope) {
  $scope.message = 'Detail Page';
});
