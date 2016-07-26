app.controller('NeoDetailsController', ['$scope', '$log','$location','neoFactory','sceneFactoryHelper','systemService','orbitModellerService','$routeParams', function($scope, $log,$location, neoFactory, sceneFactoryHelper, systemService, orbitModellerService, $routeParams) {
    if (neoFactory.selectedNeo) {
        if (neoFactory.selectedNeo.orbital_data && neoFactory.selectedNeo.close_approach_data) {
            init();
        } else {
            neoFactory.getNeoOrbitalData(neoFactory.selectedNeo.neo_reference_id, function() {
                init();
            }, function() {
                // do nothing
            })
        }
    } else {
        neoFactory.getNeoById($routeParams.id, function() {
            neoFactory.selectedNeo = neoFactory.results[0];
            init();
        }, function() {
            $location.path('/error')
        })
    }

    function init() {
        $scope.neo = neoFactory.selectedNeo;
        $scope.orbit_determination_date = new Date($scope.neo.orbital_data.orbit_determination_date);
        $scope.orbit = $scope.neo.orbital_data;
        $scope.close_approaches = $scope.neo.close_approach_data;
        initScene();
    }

    function initScene() {
        systemService.getSolarSystem(function(system) {
            var sceneWidth  = document.getElementById('orbital-data-table').offsetWidth;
            var sceneHeight = sceneWidth * 9 / 16

            // get scene and camera objects
            var scene = sceneFactoryHelper.initScene(system, true);
            var camera = sceneFactoryHelper.initCamera(sceneWidth, sceneHeight, 1000)

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