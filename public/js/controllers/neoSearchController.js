app.controller('NeoSearchController', ['$log','$scope','$location','neoFactory', function($log, $scope, $location, neoFactory) {
    
    $scope.page = 0;
    $scope.searchMethodIndex = 0;
    $scope.searchMethod = {
        "type": "select", 
        "name": "SearchMethod",
        "value": 'Rechercher par identifiant', 
        "values": [ 'Rechercher par identifiant', 'Rechercher intervalle entre deux dates', 'Tous les astéroïdes'] 
    };
    
    $scope.searchNeoById = function() {
        // Get the search-bar to access the user input
        var id = document.getElementById("search-bar").value;

        // Call the service with the user input
        neoFactory.getNeoById(id, function() {
            // Put the results in the $scope then navigate to the neoDetails page
            $scope.results = neoFactory.results;
            $scope.navigateToNeoDetail(neoFactory.results[0]); 
        }, errorCallback);
    }

    $scope.browse = function() {
        neoFactory.browse($scope.page, function() {
            $scope.results = neoFactory.browseCatalogue;
        }, errorCallback());
    }

    function errorCallback(error) {
        $scope.results = [];
    }

    $scope.updateSearchMethod = function(){
        $scope.searchMethodIndex = searchMethodIndex($scope.searchMethod.value);
        if ($scope.searchMethodIndex == 2) {
            if (neoFactory.browseCatalogue.length > 0) {
                $scope.results = neoFactory.browseCatalogue;
            } else {
                $scope.browse();
            }
        }
    }

    function searchMethodIndex(value) {
        if (value === 'Rechercher par identifiant') {
            return 0;
        } else if (value === 'Rechercher intervalle entre deux dates') {
            return 1;
        } else if (value === 'Tous les astéroïdes') {
            return 2;
        }
    }

    $scope.navigateToNeoDetail = function(neo) {
        neoFactory.selectedNeo = neo
        $location.path('/neo/'+neo.neo_reference_id);
    }
}]);