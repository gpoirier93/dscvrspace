app.controller('NeoSearchController', ['$log','$scope','$location','neoFactory','errorManagerHelper', function($log, $scope, $location, neoFactory, errorManagerHelper) {
    
    $scope.neoDate = neoFactory.selectedDate;
    $scope.pageIndex = neoFactory.pageIndex;
    $scope.dateOptionIndex = neoFactory.dateOptionIndex;
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

    if (neoFactory.page) {
        $scope.page = neoFactory.page;
    } else {
        $scope.page = {
            total_pages: 0
        }
    }

    $scope.results = neoFactory.results;
    $scope.resultsKeys = neoFactory.resultsKeys;
    $scope.dataAvailable = neoFactory.results.length > 0 || neoFactory.resultsKeys.length > 0;

    $scope.searchNeoById = function() {
        // Get the search-bar to access the user input
        var id = document.getElementById("search-bar").value;

        // Call the service with the user input
        neoFactory.getNeoById(id, function() {
            // Put the results in the $scope then navigate to the neoDetails page
            if (neoFactory.results.length > 0) {
                $scope.results = neoFactory.results;
                $scope.updateSelectedNeo(neoFactory.results[0]);
                $location.path('/neo/'+neoFactory.selectedNeo.neo_reference_id);
                $scope.dataAvailable = true; 
            } else {
                $scope.results = [];
                $scope.dataAvailable = false;
            }
        }, errorCallback);
    }

    $scope.browse = function() {
        neoFactory.browse($scope.pageIndex, function() {
            if (neoFactory.results.length>0) {
                $scope.results = neoFactory.results;
                $scope.page = neoFactory.page;
                $scope.dataAvailable = true;
            } else {
                $scope.results = [];
                $scope.dataAvailable = false;
            }
        }, errorCallback());
    }

    $scope.searchNeoFromDate = function() {
        neoFactory.getNeoFromDate(function() {
            if (neoFactory.resultsKeys.length > 0) {
                $scope.results = neoFactory.results;
                $scope.resultsKeys = neoFactory.resultsKeys;
                $scope.dataAvailable = true;
            } else {
                $scope.results = [];
                $scope.dataAvailable = false;
            }
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

    $scope.dateOptionUpdate = function(optionIndex) {
            neoFactory.updateDateOptionIndex(optionIndex);
            switch (optionIndex) {
                case 0:
                    $scope.dateOptionButtonDayClass = 'ds-button-active';
                    $scope.dateOptionButtonWeekClass = '';
                    break;
                case 1:
                    $scope.dateOptionButtonDayClass = '';
                    $scope.dateOptionButtonWeekClass = 'ds-button-active';
                    break;
            }
    }
    $scope.dateOptionUpdate($scope.dateOptionIndex);

    $scope.updateNeoDate = function() {
        neoFactory.selectedDate = new Date($scope.neoDate);
    }

    function errorCallback(error) {
        $scope.results = [];
        $scope.dataAvailable = false;
        // errorManagerHelper.showError('Une erreur est survenue. Veuillez réessayer plus tard.')
    }

    $scope.idResultsArray = function() {
        return Object.prototype.toString.call( $scope.results ) === '[object Array]';
    }

    $scope.updateSearchMethod();
}]);