app.factory('sceneFactory', ['$log', function($log) {
    var service = {
        camera:undefined,
        scene:undefined,
        orbitControlsParameters: undefined,
        isDefined: false
    }
    return service;
}]);