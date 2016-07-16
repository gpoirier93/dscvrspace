app.service('orbitModellerService', ['$rootScope','$log', function($rootScope, $log) {
    // Define distance divider
    $rootScope.dd = 1000000;
    this.modelOrbit = function(orbit, meshColor) {
        $log.log(orbit);
        var bigAxis = orbit.semi_major_axis/$rootScope.dd;
        var smallAxis = orbit.semi_major_axis * Math.sqrt((orbit.eccentricity * orbit.eccentricity)+1)/$rootScope.dd;
        var curve = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            bigAxis, smallAxis,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation 
        );

        var path = new THREE.Path( curve.getPoints( 200 ) );
        geometry = path.createPointsGeometry( 200 );
        material = new THREE.LineBasicMaterial( { 
            color : meshColor?meshColor:0xFFFFFF,
            linewidth : 1
         } );

        var orbitLine = new THREE.Line( geometry, material );
        var transalationX = - bigAxis * orbit.eccentricity;
        var rotationX = (orbit.ascending_node * 2 * Math.PI) / 360; 
        var rotationY = (orbit.inclination * 2 * Math.PI) / 360;
        var rotationZ = (orbit.perihelion_argument * 2 * Math.PI) / 360;

        // $log.log(orbit);
        // $log.log(transalationX + '     '+rotationX+'     '+rotationY+'     '+rotationZ);

        orbitLine.translateX(transalationX);
        orbitLine.rotateY(rotationY);
        orbitLine.rotateZ(rotationZ);
        orbitLine.rotateZ(rotationX)
        // orbitLine.rotateX(rotationX);
        // orbit.matrixWorldNeedsUpdate = true;

        return orbitLine;
    }

    this.modelBody = function(body) {
        var geometry = new THREE.SphereGeometry( body.diameter/2/$rootScope.dd, 32, 32 );
        var material = new THREE.MeshLambertMaterial( {color: 0xffff00} );
        return new THREE.Mesh( geometry, material );
    }

    this.modelOrbitWithParameters = function(bigAxis, eccentricity, ascendingNode, inclination, perihelionArgument) {
        return this.modelOrbit({
            semi_major_axis: bigAxis,
            eccentricity: eccentricity,
            ascending_node: ascendingNode,
            inclination: inclination,
            perihelion_argument: perihelionArgument
        }, 0xFF0000)
    } 
}]);