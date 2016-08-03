app.controller('MainController', ['$scope', '$location', '$log','neoFactory','systemService','planetListsHelper', function($scope, $location, $log, neoFactory, systemService, planetListsHelper) {
  $scope.navbarItems = planetListsHelper.solarSystemPlanetList();
  $scope.$watch('requestedLocation', function () {
    if ($scope.requestedLocation !== 'home') {
      $location.path('/'+$scope.requestedLocation);
    } else {
      $location.path('/');
    }
  });
}]);