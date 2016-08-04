app.factory('sceneFactory', ['$log','$rootScope', function($log, $rootScope) {
    var service = {
        camera:undefined,
        scene:undefined,
        orbitControlsParameters: undefined,
        isDefined: false,
        planetSystem : {
            camera:undefined,
            scene:undefined,
            orbitControlsParameters: undefined,
            isDefined: false
        }
    }

    return service;
}]);