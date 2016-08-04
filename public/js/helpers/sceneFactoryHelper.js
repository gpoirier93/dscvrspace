app.service('sceneFactoryHelper', ['$rootScope', '$log','orbitModellerService', function($rootScope, $log, orbitModellerService) {
    var service = {};

    service.initScene = function(system) {
        var scene = new THREE.Scene();
        
        var light = new THREE.PointLight( 0xfffff, 500, 10000, 10 );
        light.position.set( system.body.semi_major_axis/$rootScope.dd, 0, 0 );
        scene.add( light )

        return scene;
    }

    service.initOrientationScene = function() {
        var scene = new THREE.Scene();
        
        // Add axis
        var material = new THREE.LineBasicMaterial({color: 0xff0000, linewidth:2});
        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 60, 0, 0 )
        );
        scene.add ( new THREE.Line(geometry, material));

        material = new THREE.LineBasicMaterial({color: 0x00ff00, linewidth:2});
        geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 0, 60, 0 )
        );
        scene.add ( new THREE.Line(geometry, material));

        material = new THREE.LineBasicMaterial({color: 0x0000ff, linewidth:2});
        geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 0, 0, 60 )
        );
        scene.add ( new THREE.Line(geometry, material));

        for (var i = 1; i<=6; i++) {
            material = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth:1});
            geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3( i*10, 0, 0 ),
                new THREE.Vector3( i*10, 60, 0 )
            );
            scene.add ( new THREE.Line(geometry, material));

            geometry = new THREE.Geometry();
            geometry.vertices.push(
                new THREE.Vector3( 0, i*10, 0 ),
                new THREE.Vector3( 60, i*10, 0 )
            );
            scene.add ( new THREE.Line(geometry, material));
        }

        return scene;
    }

    service.initCamera = function(sceneWidth, sceneHeight, position) {
        var camera = new THREE.PerspectiveCamera( 45, sceneWidth / sceneHeight, 0.001, 50000 );
        camera.up = new THREE.Vector3(0,0,1);
        camera.position.z = position;
        camera.position.x = position;
        camera.position.y = position;
        camera.updateProjectionMatrix();
        return camera;
    }

    return service;
}])