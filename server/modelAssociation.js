var models = require('./models');

models.Star.hasMany(models.Planet);
models.Star.hasMany(models.NEO);
models.Planet.hasMany(models.Ring);
models.Planet.hasMany(models.Satellite);
models.NEO.hasMany(models.CloseApproach);

models.Star.belongsTo(models.Body);
models.Planet.belongsTo(models.Body);
models.Satellite.belongsTo(models.Body);
models.NEO.belongsTo(models.Body);
models.Body.belongsTo(models.BodyDetail);
models.Body.belongsTo(models.Orbit);
models.Orbit.belongsTo(models.OrbitDetail);

// SYNC DB
models.sequelize.sync({force:false}).then(function () {
  console.log('Models association completed');
  var bodies = models.Body.findAll({ include: [ models.BodyDetail ]}).then(function(bodies) {
    console.log(bodies[0]);
    console.log(bodies[0].getBodyDetail());
  });
});
