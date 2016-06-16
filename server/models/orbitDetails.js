'use strict';
module.exports = function(sequelize, DataTypes) {
  var OrbitDetail = sequelize.define('OrbitDetail', {
    orbit_determination_date: DataTypes.STRING,
    orbit_uncertainty: DataTypes.INTEGER,
    minimum_orbit_intersection: DataTypes.NUMERIC,
    jupiter_tisserand_invariant: DataTypes.NUMERIC,
    epoch_osculation: DataTypes.NUMERIC,
    orbital_period: DataTypes.NUMERIC,
    aphelion_distance: DataTypes.NUMERIC,
    perihelion_time: DataTypes.NUMERIC,
    mean_anomaly: DataTypes.NUMERIC,
    mean_motion: DataTypes.NUMERIC,
    equinox: DataTypes.STRING
  }, {
     freezeTableName: true,
     underscored: true
  });
  return OrbitDetail;
};
