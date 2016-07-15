app.controller('SystemController', ['$scope', '$rootScope', '$log', 'system', 'sceneFactory','sceneFactoryHelper', function($scope, $rootScope, $log, system, sceneFactory, sceneFactoryHelper) {
    //Define bars height
    $rootScope.bh = 128;
    // Subscribe to locationChangeStart event to save exit state of the scene
    $scope.$on('$locationChangeStart', function(event) {
        saveSceneState();
    });

    // If there was no previous state, init scene and camera
    if (!sceneFactory.isDefined) {
        sceneFactory.scene = sceneFactoryHelper.initScene(system, true)
        sceneFactory.camera = sceneFactoryHelper.initCamera(window.innerWidth, window.innerHeight - $rootScope.bh, 100);
    }

    // Remove existing canvas if there is one
    var existingCanvas = document.getElementById('system-canvas');
    if (existingCanvas) {
        document.getElementById('scene-div').removeChild(existingCanvas);
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