app.controller('NeoSearchController', ['$log','$scope','$location','neoFactory', function($log, $scope, $location, neoFactory) {
    
    $scope.searchNeoById = function() {
        // Get the search-bar to access the user input
        var id = document.getElementById("search-bar").value;

        // Call the service with the user input
        neoFactory.getNeoById(id, function() {
            // Put the results in the $scope then navigate to the neoDetails page
            $scope.results = neoFactory.results;
            $location.path('/neo/'+neoFactory.results[0].neo_reference_id); 
        }, errorCallback);
    }

    function errorCallback(error) {
        $log.log(error);
        $scope.results = [];
    }
}]);