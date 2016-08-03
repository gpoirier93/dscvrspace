app.service('sceneFactoryHelper', ['$rootScope', '$log','orbitModellerService', function($rootScope, $log, orbitModellerService) {
    var service = {};

    service.initScene = function(system, hasAxis) {
        var scene = new THREE.Scene();
        var light = new THREE.PointLight( 0xff0000, 500, 10000 );
        light.position.set( 0, 0, 0 );
        scene.add( light )

        center = orbitModellerService.modelBody(system.body);
        scene.add( center );

        if (system.planets) {
            system.planets.forEach(function(planet) {
                var orbit = orbitModellerService.modelOrbit(planet.body.orbit);
                scene.add(orbit);
            });
        }
        if (system.satellites) {
            system.satellites.forEach(function(satellite) {
                var orbit = orbitModellerService.modelOrbit(satellite.body.orbit);
                scene.add(orbit);
            });
        }

        if (hasAxis) {
            // Add axis
            var material = new THREE.LineDashedMaterial({color: 0x0000ff});
            var geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3( 0, 0, 0 ),
                new THREE.Vector3( 10000, 0, 0 )
            );
            scene.add ( new THREE.Line(geometry, material));

            material = new THREE.LineDashedMaterial({color: 0x00ff00});
            geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3( 0, 0, 0 ),
                new THREE.Vector3( 0, 10000, 0 )
            );
            scene.add ( new THREE.Line(geometry, material));

            material = new THREE.LineDashedMaterial({color: 0xff0000});
            geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3( 0, 0, 0 ),
                new THREE.Vector3( 0, 0, 10000 )
            );
            scene.add ( new THREE.Line(geometry, material));
        }
        return scene;
    }

    service.initCamera = function(sceneWidth, sceneHeight, position) {
        var camera = new THREE.PerspectiveCamera( 45, sceneWidth / sceneHeight, 0.1, 500000 );
        camera.up = new THREE.Vector3(0,0,1);
        camera.position.z = position;
        camera.position.x = position;
        camera.position.y = position;
        camera.updateProjectionMatrix();
        return camera;
    }

    return service;
}])