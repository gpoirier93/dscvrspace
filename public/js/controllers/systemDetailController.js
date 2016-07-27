app.controller('SystemDetailController', ['$scope','$log', 'sceneFactoryHelper','system', function($scope, $log, sceneFactoryHelper, system) {
    $scope.system = system;
    $log.log($scope.system);
}])