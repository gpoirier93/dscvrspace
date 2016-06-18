'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config.json')[env];
var db        = {};


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Star.hasMany(db.Planet, {as:'planets'});
db.Star.hasMany(db.NEO, {as:'neos'});
db.Planet.hasMany(db.Ring, {as:'rings'});
db.Planet.hasMany(db.Satellite, {as:'satellites'});
db.NEO.hasMany(db.CloseApproach, {as:'close_approaches'});

db.Star.belongsTo(db.Body, {as:'body'});
db.Planet.belongsTo(db.Body, {as:'body'});
db.Satellite.belongsTo(db.Body, {as:'body'});
db.NEO.belongsTo(db.Body, {as:'body'});
db.Body.belongsTo(db.BodyDetail, {as:'details'});
db.Body.belongsTo(db.Orbit, {as:'orbit'});
db.Orbit.belongsTo(db.OrbitDetail, {as:'details'});

module.exports = db;
