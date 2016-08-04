app.controller('NeoDetailsController', ['$rootScope', '$scope', '$log','$location','neoFactory','sceneFactoryHelper','systemService','orbitModellerService','$routeParams', function($rootScope, $scope, $log,$location, neoFactory, sceneFactoryHelper, systemService, orbitModellerService, $routeParams) {
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
            var scene = sceneFactoryHelper.initScene(system);
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

            var center = orbitModellerService.modelPlanet(system)
            scene.add( center );
            system.planets.forEach(function(planet) {
                var color = undefined;
                if (planet.solar_order === 3) {
                    color = 0x467EE8;
                }
                var orbit = orbitModellerService.modelOrbit(planet.body.orbit, color);
                scene.add(orbit);
            });
            
            // Orientation indicator
            container2 = document.getElementById('scene-orientation-div-details');

            // renderer
            renderer2 = new THREE.WebGLRenderer();
            renderer2.setClearColor( 0x000000, 1 );
            renderer2.setSize( $rootScope.ordivsc, $rootScope.ordivsc );
            container2.appendChild( renderer2.domElement );

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
        }, function() {
            // do something;
        });
    } 
}]);