app.controller('NeoDetailsController', ['$scope', '$log','neoFactory','sceneFactoryHelper','systemService','orbitModellerService', function($scope, $log, neoFactory, sceneFactoryHelper, systemService, orbitModellerService) {
    $scope.neo = neoFactory.selectedNeo;

    if ($scope.neo.orbital_data) {
        $scope.orbit_determination_date = new Date($scope.neo.orbital_data.orbit_determination_date);
        $scope.orbit = $scope.neo.orbital_data;
        initScene();
    } else {
        neoFactory.getNeoOrbitalData($scope.neo.neo_reference_id, function() {
            $scope.orbit_determination_date = new Date(neoFactory.selectedNeo.orbital_data.orbit_determination_date);
            $scope.orbit = neoFactory.selectedNeo.orbital_data;
            initScene(); 
        }, function() {
            // do nothing
        })
    }

    function initScene() {
        systemService.getSolarSystem(function(system) {
            var sceneWidth = 800
            var sceneHeight = 800 * 9 / 16

            // get scene and camera objects
            var scene = sceneFactoryHelper.initScene(system, true);
            var camera = sceneFactoryHelper.initCamera(sceneWidth, sceneHeight, 100)

            // Add NEO orbit
            var orbitalData = $scope.orbit;
            scene.add( orbitModellerService.modelOrbitWithParameters(orbitalData.semi_major_axis * 1.496e+8, orbitalData.eccentricity, orbitalData.ascending_node_longitude, orbitalData.inclination, orbitalData.perihelion_argument ) );

            // Update camera aspect
            camera.aspect = sceneWidth / sceneHeight;
            camera.updateProjectionMatrix();

            // Create renderer
            var renderer = new THREE.WebGLRenderer({antialias: true});
            renderer.setSize( sceneWidth, sceneHeight );
            var canvas = renderer.domElement;
            canvas.id = 'system-canvas';
            document.getElementById('orbit-scene-div').appendChild( canvas );

            // Instantiate orbitControls
            var orbitControls = new THREE.OrbitControls( camera, renderer.domElement );;
            orbitControls.target.set( 0, 0, 0 );
            orbitControls.maxDistance = 10000;
            orbitControls.update();

            render();

            function render() {
                requestAnimationFrame( render );
                renderer.render( scene, camera );
            }
        }, function() {
            // do something;
        });
    } 

}]);