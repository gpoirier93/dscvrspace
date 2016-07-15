app.service('sceneFactoryHelper', ['$rootScope', '$log','orbitModellerService', function($rootScope, $log, orbitModellerService) {
    var service = {};

    service.initScene = function(system, hasAxis) {
        var scene = new THREE.Scene();

        bulbLight = new THREE.PointLight( 0xFFFFF, 500, 10000, 200 );
        bulbMat = new THREE.MeshStandardMaterial( {
            emissive: 0xffffee,
            emissiveIntensity: 1,
            color: 0x000000
        });
        bulbLight.position.set( 0, 0, 0 );
        bulbLight.castShadow = true;
        scene.add( bulbLight );

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
        var camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 500000 );
        camera.position.z = position;
        return camera;
    }

    return service;
}])