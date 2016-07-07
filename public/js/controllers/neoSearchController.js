app.controller('NeoSearchController', ['$log','$scope','$location','neoFactory', function($log, $scope, $location, neoFactory) {
    
    $scope.neoDate = new Date();
    $scope.dataAvailable = true;
    $scope.pageIndex = neoFactory.pageIndex;
    $scope.searchMethod = {
        "type": "select", 
        "name": "SearchMethod",
        "value": neoFactory.searchMethodValue.value,
        "values": [ neoFactory.searchMethodObject(0), neoFactory.searchMethodObject(1), neoFactory.searchMethodObject(2)] 
    };

    if (neoFactory.stats) {
        $scope.stats = neoFactory.stats;
    } else {
        neoFactory.getDataSetStats(function() {
            $scope.stats = neoFactory.stats;
        })
    }
    
    $scope.searchNeoById = function() {
        // Get the search-bar to access the user input
        var id = document.getElementById("search-bar").value;

        // Call the service with the user input
        neoFactory.getNeoById(id, function() {
            // Put the results in the $scope then navigate to the neoDetails page
            $scope.results = neoFactory.results;
            $scope.updateSelectedNeo(neoFactory.results[0]);
            $location.path('/neo/'+neoFactory.selectedNeo.neo_reference_id);
            $scope.dataAvailable = true; 
        }, errorCallback);
    }

    $scope.browse = function() {
        neoFactory.browse($scope.pageIndex, function() {
            $scope.results = neoFactory.results;
            $scope.page = neoFactory.page;
            $scope.dataAvailable = true;
        }, errorCallback());
    }

    $scope.nextPage = function() {
        if ($scope.pageIndex < $scope.page.total_pages) {
            $scope.pageIndex += 1;
            $scope.browse();
        }
    }

    $scope.previousPage = function() {
        if ($scope.pageIndex > 0) {
            $scope.pageIndex -= 1;
            $scope.browse();
        }
    }

    $scope.setPageIndex = function(index) {
        if (index >= 0 && index <= $scope.page.total_pages) {
            $scope.pageIndex = index;
            $scope.browse();
        }
    }

    $scope.updateSearchMethod = function(){
        neoFactory.searchMethodValue = neoFactory.searchMethodObject($scope.searchMethod.value);
        if ($scope.searchMethod.value == 0) {
            $scope.browse();
        } else if ($scope.searchMethod.value === 2) {
            $scope.results = neoFactory.results;
        }
    }

    $scope.updateSelectedNeo = function(neo) {
        neoFactory.selectedNeo = neo
    }

    function errorCallback(error) {
        $scope.results = [];
        $scope.dataAvailable = false;
    }

    $scope.updateSearchMethod();
}]);