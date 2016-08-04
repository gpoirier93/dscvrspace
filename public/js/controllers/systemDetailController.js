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

    var sceneWidth  = document.getElementById('orbital-data-table').offsetWidth;
    var sceneHeight = sceneWidth * 9 / 16
    var cameraPosition;
    if (system.solar_order === 5) {
        cameraPosition = 50
    } else {
        cameraPosition = 0.5;
    }
    // get scene and camera objects
    var scene = sceneFactoryHelper.initScene(system);
    var camera = sceneFactoryHelper.initCamera(sceneWidth, sceneHeight, cameraPosition);
    
    // Update camera aspect
    camera.aspect = sceneWidth / sceneHeight;
    camera.updateProjectionMatrix();

    // Create renderer
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( sceneWidth, sceneHeight );
    var canvas = renderer.domElement;
    canvas.id = 'system-canvas';
    var sceneDiv = document.getElementById('orbit-scene-div');
    sceneDiv.appendChild( canvas );

    // Instantiate orbitControls
    var orbitControls = new THREE.OrbitControls( camera, renderer.domElement );;
    orbitControls.target.set( 0, 0, 0 );
    orbitControls.maxDistance = 1000;
    orbitControls.update();

    var center = orbitModellerService.modelPlanet(system)
    scene.add( center );
    system.satellites.forEach(function(satellite) {
        var orbit = orbitModellerService.modelOrbit(satellite.body.orbit);
        scene.add(orbit);
    });

    // Orientation indicator
    container2 = document.getElementById('scene-orientation-div-details');

    // renderer
    renderer2 = new THREE.WebGLRenderer();
    renderer2.setClearColor( 0x000000, 1 );
    renderer2.setSize( $rootScope.ordivsc, $rootScope.ordivsc );
    container2.appendChild( renderer2.domElement );
    
    // container2.style.left = sceneDiv.style.left +'px';
    // container2.style.top = sceneDiv.style.top +'px';

    // scene
    scene2 = sceneFactoryHelper.initOrientationScene();

    // camera
    camera2 = new THREE.PerspectiveCamera( 50, $rootScope.ordivsc / $rootScope.ordivsc, 1, 1000 );
    camera2.up = camera.up; // important!

    function render() {
        renderer.render( scene, camera );
        renderer2.render( scene2, camera2 );
    }

    (function animate() {

        requestAnimationFrame( animate );

        orbitControls.update();

        camera2.position.copy( camera.position );
        camera2.position.sub( orbitControls.target ); // added by @libe
        camera2.position.setLength( 150 );

        camera2.lookAt( scene2.position );
        render();
    })();
}])