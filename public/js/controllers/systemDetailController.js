app.controller('SystemDetailController', ['$scope','$log', 'sceneFactoryHelper','system','systemService', 'planetListsHelper', 'errorManagerHelper'
, function($scope, $log, sceneFactoryHelper, system, systemService, planetListsHelper, errorManagerHelper) {
    $scope.system = system;
    var planetList = planetListsHelper.solarSystemPlanetList();
    $scope.comparaisonDropdownList = planetList.splice(1,planetList.length-1);

    $scope.solarOrderFormat = function(order) {
        var formattedText;
        if (order === 1) {
            formattedText = "1ère planète"
        } else {
            formattedText = order+"ème planète"
        }
        return formattedText;
    }

    $scope.setComparaison = function(item) {
        systemService.getPlanetById(item.item_id, function(system) {
            $scope.comparaison = system;
        }, function() {
            errorManagerHelper.showError('Une erreur est survenue. Veuillez réessayer plus tard.')
            $scope.comparaison = undefined;
        });
    }

    $scope.numberAsExponential = function(number) {
        return Number(number).toExponential();
    }
}])