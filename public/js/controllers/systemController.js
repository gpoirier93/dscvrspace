app.controller('SystemController', ['$scope', '$rootScope', '$log', 'system', 'sceneFactory','orbitModellerService', function($scope, $rootScope, $log, system, sceneFactory, orbitModellerService) {
    // Define distance divider
    $rootScope.dd = 1000000;

    // Subscribe to locationChangeStart event to save exit state of the scene
    $scope.$on('$locationChangeStart', function(event) {
        saveSceneState();
    });

    // If there was no previous state, init scene and camera
    if (!sceneFactory.isDefined) {
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 500000 );

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

        system.planets.forEach(function(planet) {
            var orbit = orbitModellerService.modelOrbit(planet.body.orbit);
            scene.add(orbit);
        });
        
        camera.position.z = 100;

        // Add newly created entity to scene factory
        sceneFactory.scene = scene;
        sceneFactory.camera = camera;
    }

    // Remove existing canvas if there is one
    var existingCanvas = document.getElementById('system-canvas');
    if (existingCanvas) {
        document.getElementById('scene-div').removeChild(existingCanvas);
    }

    // Update camera aspect
    sceneFactory.camera.aspect = window.innerWidth/window.innerHeight;
    sceneFactory.camera.updateProjectionMatrix();

    // Create renderer 
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight);
    var canvas = renderer.domElement;
    canvas.id = 'system-canvas';
    document.getElementById('scene-div').appendChild( canvas );

    // Instantiate orbitControls
    var orbitControls = new THREE.OrbitControls( sceneFactory.camera, renderer.domElement );;
    if (sceneFactory.isDefined) {
        orbitControls.target = sceneFactory.orbitControlsParameters.target;
        orbitControls.zoom = sceneFactory.orbitControlsParameters.zoom;
    } else {
        orbitControls.target.set( 0, 0, 0 );
    }
    orbitControls.maxDistance = 10000;
    orbitControls.update();

    // Add window listeners
    window.addEventListener( 'resize', onWindowResize);

    // Render
    render();

    function render() {
        requestAnimationFrame( render );
        renderer.render( sceneFactory.scene, sceneFactory.camera );
    }

    function onWindowResize(e){
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function saveSceneState() {
        $log.log('yeah');
        sceneFactory.orbitControlsParameters = {
            zoom: orbitControls.zoom,
            target: orbitControls.target
        }
        sceneFactory.isDefined = true;
    }
}]);