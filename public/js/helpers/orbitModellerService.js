app.service('orbitModellerService', ['$rootScope', function($rootScope) {
    this.modelOrbit = function(orbit) {
        var bigAxis = orbit.semi_major_axis/$rootScope.dd;
        var smallAxis = orbit.semi_major_axis * Math.sqrt((orbit.eccentricity * orbit.eccentricity)+1)/$rootScope.dd;
        var curve = new THREE.EllipseCurve(
            0,  0,            // ax, aY
            bigAxis, smallAxis,           // xRadius, yRadius
            0,  2 * Math.PI,  // aStartAngle, aEndAngle
            false,            // aClockwise
            0                 // aRotation 
        );

        var path = new THREE.Path( curve.getPoints( 100 ) );
        geometry = path.createPointsGeometry( 100 );
        material = new THREE.LineBasicMaterial( { color : 0xFFFFFF } );

        return new THREE.Line( geometry, material );
    }

    this.modelBody = function(body) {
        var geometry = new THREE.SphereGeometry( body.diameter/2/$rootScope.dd, 32, 32 );
        var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
        return new THREE.Mesh( geometry, material );
    }
}]);