'use strict';
module.exports = function(sequelize, DataTypes) {
  var BodyDetail = sequelize.define('BodyDetail', {
    axial_tilt: DataTypes.NUMERIC,
    mean_density: DataTypes.NUMERIC,
    gravity: DataTypes.NUMERIC,
    escape_velocity: DataTypes.NUMERIC,
    rotation_period: DataTypes.NUMERIC,
    mean_temperature: DataTypes.NUMERIC,
    mass: DataTypes.NUMERIC,
    volume: DataTypes.NUMERIC
  }, {
    freezeTableName:true,
     underscored: true
  });
  return BodyDetail;
};
