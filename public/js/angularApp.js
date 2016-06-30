var dscvrspace = angular.module('dscvrspace', ['ngRoute']);

dscvrspace.config(function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/views/home.ejs',
    controller: 'homeController'
  })
})

dscvrspace.controller('mainController', function($scope) {
  $scope.message = 'Main page';
});

dscvrspace.controller('homeController', function($scope) {
  $scope.message = 'Home Page';
});

dscvrspace.controller('systemController', function($scope) {
  $scope.message = 'System Page';
});

dscvrspace.controller('detailController', function($scope) {
  $scope.message = 'Detail Page';
});
