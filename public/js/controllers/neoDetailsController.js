app.controller('NeoDetailsController', ['$scope', '$log','neoFactory', function($scope, $log, neoFactory) {
    $scope.neo = neoFactory.results[0];
    $scope.orbit_determination_date = new Date($scope.neo.orbital_data.orbit_determination_date);
    $scope.orbit = $scope.neo.orbital_data; 
}]);