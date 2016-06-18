'use strict';
module.exports = function(sequelize, DataTypes) {
  var Orbit = sequelize.define('Orbit', {
    eccentricity: DataTypes.NUMERIC,
    semi_major_axis: DataTypes.NUMERIC,
    perihelion_distance: DataTypes.NUMERIC,
    inclination: DataTypes.NUMERIC,
    perihelion_argument: DataTypes.NUMERIC,
    ascending_node: DataTypes.NUMERIC
  }, {
    freezeTableName: true,
     underscored: true
  });
  return Orbit;
};
