app.controller('NeoDetailsController', ['$scope', '$log','neoFactory', function($scope, $log, neoFactory) {
    $scope.neo = neoFactory.selectedNeo;

    if ($scope.neo.orbital_data) {
        $scope.orbit_determination_date = new Date($scope.neo.orbital_data.orbit_determination_date);
        $scope.orbit = $scope.neo.orbital_data;
    } else {
        neoFactory.getNeoOrbitalData($scope.neo.neo_reference_id, function() {
            $scope.orbit_determination_date = new Date(neoFactory.selectedNeo.orbital_data.orbit_determination_date);
            $scope.orbit = neoFactory.selectedNeo.orbital_data; 
        }, function() {
            // do nothing
        })
    } 
}]);