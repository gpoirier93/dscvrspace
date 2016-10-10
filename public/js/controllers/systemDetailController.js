app.controller('SystemDetailController', ['$rootScope', '$scope','$log', 'sceneFactoryHelper','system','systemService', 'planetListsHelper', 'errorManagerHelper', 'orbitModellerService', 'sceneFactory'
, function($rootScope, $scope, $log, sceneFactoryHelper, system, systemService, planetListsHelper, errorManagerHelper, orbitModellerService, sceneFactory) {
    $scope.system = system;
    var planetList = planetListsHelper.solarSystemPlanetList();
    $scope.comparaisonDropdownList = planetList.splice(1,planetList.length-1);
    // initScene();

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