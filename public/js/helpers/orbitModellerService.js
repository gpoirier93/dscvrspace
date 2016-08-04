app.service('orbitModellerService', ['$rootScope','$log', function($rootScope, $log) {
    // Define distance divider
    $rootScope.dd = 1000000;
    $rootScope.ordivsc = 80;
    
    this.modelOrbit = function(orbit, meshColor) {
        var bigAxis = orbit.semi_major_axis/$rootScope.dd;
        var smallAxis = orbit.semi_major_axis * Math.sqrt((orbit.eccentricity * orbit.eccentricity)+1)/$rootScope.dd;
        var curve = new THREE.EllipseCurve(
            0,  0,
            bigAxis, smallAxis,
            0,  2 * Math.PI,  
            false,            
            0                 
        );

        var path = new THREE.Path( curve.getPoints( 200 ) );
        geometry = path.createPointsGeometry( 200 );
        material = new THREE.LineBasicMaterial( { 
            color : meshColor?meshColor:0xFFFFFF,
            linewidth : 1.5
         } );

        var orbitLine = new THREE.Line( geometry, material );
        var transalationX = - bigAxis * orbit.eccentricity;
        var rotationX = (orbit.ascending_node * 2 * Math.PI) / 360; 
        var rotationY = (orbit.inclination * 2 * Math.PI) / 360;
        var rotationZ = (orbit.perihelion_argument * 2 * Math.PI) / 360;

        orbitLine.translateX(transalationX);
        orbitLine.rotateY(rotationY);
        orbitLine.rotateZ(rotationZ);
        orbitLine.rotateZ(rotationX)

        return orbitLine;
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

    function buildSphere(body, texture, color, callback) {
        var geometry = new THREE.SphereGeometry( body.diameter/2/$rootScope.dd, 32, 32 );
        var rotation;
        if (body.details && body.details.axial_tilt) {
            rotation = Math.PI/2 - (body.details.axial_tilt * Math.PI /360);
        } else {
            rotation = Math.PI/2;
        }
        geometry.rotateX(rotation);
        
        var material;
        if (texture) {
            material = new THREE.MeshBasicMaterial( {
                map: texture
            } );
        } else if (color) {
            material = new THREE.MeshBasicMaterial( {
                color: color
            } );
        } else {
            material = new THREE.MeshBasicMaterial( {
                color: 0xFFFFFF
            } );
        }

        var mesh = new THREE.Mesh( geometry, material );
        if (callback) {
            callback(mesh);
        } else {
            return mesh;
        }
    }

    this.textureLoader = new THREE.TextureLoader();
    this.modelSun = function(body, callback) {
        this.textureLoader.load('./res/textures/diffuse_sun.jpg', function(texture) {
            buildSphere(body, texture, undefined, callback);
        });
    }

    this.modelPlanet = function(planet) {
        var color;
        switch (planet.solar_order) {
            case 1:
                color = 0xACB3B5;
                break;
            case 2:
            case 4:
            case 5:
                color = 0x990000;
                break;
            case 3:
            case 8:
                color = 0x467EE8;
                break;
            case 6:
                color = 0xE8C846;
                break;
            case 7:
                color = 0x46D4D4;
                break;
        }
        return buildSphere(planet.body, undefined, color);
    }

    this.modelBodyWithKeplerianEquation = function(orbit, ellipse) {
        
    }
}]);