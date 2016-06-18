var models = require('../models');
var planets = require('./planetData.json');

// Associate models so we can work with nested objects
models.Star.hasMany(models.Planet, {as:'planets'});
models.Star.hasMany(models.NEO, {as:'neos'});
models.Planet.hasMany(models.Ring, {as:'rings'});
models.Planet.hasMany(models.Satellite, {as:'satellites'});
models.NEO.hasMany(models.CloseApproach, {as:'close_approaches'});

models.Star.belongsTo(models.Body, {as:'body'});
models.Planet.belongsTo(models.Body, {as:'body'});
models.Satellite.belongsTo(models.Body, {as:'body'});
models.NEO.belongsTo(models.Body, {as:'body'});
models.Body.belongsTo(models.BodyDetail, {as:'details'});
models.Body.belongsTo(models.Orbit, {as:'orbit'});
models.Orbit.belongsTo(models.OrbitDetail, {as:'details'});

models.sequelize.sync({force:true}).then(function () {

  /****************
  ***** STARS *****
  ****************/
  //SUN
  models.Body.create({
    diameter: 1391400000,
    details: {
      volume: 10
    }
  }, {
    include: [{model:models.BodyDetail, as:'details'}]
  }).then(function(body) {
    var star = models.Star.build({
      absolute_magnitude: 4.83,
      visual_brightness: 26.74,
      spectral_classification: 'G2V',
      average_speed: 220
    });
    star.setBody(body, {save:false});
    star.save()
  }).then(function(star) {
    /******************
    ***** PLANETS *****
    ******************/
    planets.forEach(function(planet, index) {
      models.Orbit.create({
        eccentricity: planet.orbit.eccentricity,
        semi_major_axis: planet.orbit.semi_major_axis,
        perihelion_distance: planet.orbit.perihelion_distance,
        inclination: planet.orbit.inclination,
        perihelion_argument: planet.orbit.perihelion_argument,
        ascending_node: planet.orbit.ascending_node,
        details: {
          orbit_determination_date: null,
          orbit_uncertainty: null,
          minimum_orbit_intersection: null,
          jupiter_tisserand_invariant: null,
          epoch_osculation: null,
          orbital_period: planet.orbit.orbital_period,
          aphelion_distance: planet.orbit.aphelion_distance,
          orbital_speed: planet.orbit.orbital_speed,
          perihelion_time: null,
          mean_anomaly: null,
          mean_motion: null,
          equinox: "J2000"
        }
      }, {
        include: [{model: models.OrbitDetail, as: "details"}]
      }).then(function(orbit) {
        var body = models.Body.build({
          diameter: planet.diameter,
          details: {
            axial_tilt: planet.axial_tilt,
            mean_density: planet.mean_density,
            gravity: planet.gravity,
            escape_velocity: planet.escape_velocity,
            rotation_period: planet.length_of_day,
            mean_temperature: planet.rotation_period,
            mass: planet.mass,
            volume: planet.volume
          }
        }, {
          include: [{model: models.BodyDetail, as: "details"}]
        });
        body.setOrbit(orbit, {save: false});
        body.save().then(function(body) {
          var planetObject = models.Planet.build({
            moon_number: planet.moon_number,
            ring_number: planet.ring_number,
            name_fr: planet.names.fr,
            name_en: planet.names.en,
          });
          planetObject.setBody(body, {save: false});
          planetObject.save();
        });
      });
    });
  });

});
