var models = require('../models');

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
  /******************
  ***** PLANETS *****
  ******************/
  //BODIES
  models.Body.bulkCreate([
    {
      diameter: 1391400000,
      details: {
        volume: 10
      }
    }, {
      include: [{model:models.BodyDetail, as:'details'}]
    }]).then(function(bodies){

  });

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
  }).then(function(body){
    var star = models.Star.build({
      absolute_magnitude: 4.83,
      visual_brightness: 26.74,
      spectral_classification: 'G2V',
      average_speed: 220
    });
    star.setBody(body, {save:false});
    star.save();
  });

});
