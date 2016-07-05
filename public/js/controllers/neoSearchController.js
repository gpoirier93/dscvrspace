app.controller('NeoSearchController', ['$log','$scope','neoService', function($log, $scope, neoService) {
    $scope.searchNeoById = function() {
        var id = document.getElementById("search-bar").value;
        $log.log(id);
        neoService.getNeoById(id, function(response, error) {

        });
    }
}]);