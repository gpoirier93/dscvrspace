app.controller('SystemController', ['$scope', '$rootScope', '$log', 'system', 'sceneFactory','sceneFactoryHelper','orbitModellerService', function($scope, $rootScope, $log, system, sceneFactory, sceneFactoryHelper, orbitModellerService) {

    var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
    //Define bars height
    $rootScope.bh = 128;

    // Subscribe to locationChangeStart event to save exit state of the scene
    $scope.$on('$locationChangeStart', function(event) {
        saveSceneState();
    });

    // Remove existing canvas if there is one
    var existingCanvas = document.getElementById('system-canvas');
    if (existingCanvas) {
        document.getElementById('scene-div').removeChild(existingCanvas);
    }

    // If there was no previous state, init scene and camera
    if (!sceneFactory.isDefined) {
        sceneFactory.scene = sceneFactoryHelper.initScene(system)
        sceneFactory.camera = sceneFactoryHelper.initCamera(window.innerWidth, window.innerHeight - $rootScope.bh, 1000);
    }

    // Update camera aspect
    sceneFactory.camera.aspect = window.innerWidth / (window.innerHeight - $rootScope.bh);
    sceneFactory.camera.updateProjectionMatrix();

    // Create renderer 
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight - $rootScope.bh);
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
    orbitControls.maxDistance = 15000;

    // Add window listeners
    window.addEventListener( 'resize', onWindowResize);

    // Orientation indicator
    container2 = document.getElementById('scene-orientation-div');

    // renderer
    renderer2 = new THREE.WebGLRenderer();
    renderer2.setClearColor( 0x000000, 1 );
    renderer2.setSize( $rootScope.ordivsc, $rootScope.ordivsc );
    container2.appendChild( renderer2.domElement );

    // scene
    scene2 = sceneFactoryHelper.initOrientationScene();

    // camera
    camera2 = new THREE.PerspectiveCamera( 50, $rootScope.ordivsc / $rootScope.ordivsc, 1, 1000 );
    camera2.up = sceneFactory.camera.up; // important!

    orbitModellerService.modelSun(system.body, function(center) {
        sceneFactory.scene.add( center );
        system.planets.forEach(function(planet) {
            var color = undefined;
            if (planet.solar_order === 3) {
                color = 0x467EE8;
            }
            var orbit = orbitModellerService.modelOrbit(planet.body.orbit, color);
            sceneFactory.scene.add(orbit);
        });
    });

    function render() {
        renderer.render( sceneFactory.scene, sceneFactory.camera );
        renderer2.render( scene2, camera2 );
    }

    (function animate() {

        requestAnimationFrame( animate );

        orbitControls.update();

        camera2.position.copy( sceneFactory.camera.position );
        camera2.position.sub( orbitControls.target ); // added by @libe
        camera2.position.setLength( 150 );

        camera2.lookAt( scene2.position );
        render();
    })();

    function onWindowResize(e){
        sceneFactory.camera.aspect = window.innerWidth / (window.innerHeight - $rootScope.bh);
        sceneFactory.camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, (window.innerHeight - $rootScope.bh) );
    }

    function saveSceneState() {
        sceneFactory.orbitControlsParameters = {
            zoom: orbitControls.zoom,
            target: orbitControls.target
        }
        sceneFactory.isDefined = true;
    }
}]);