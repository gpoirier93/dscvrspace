'use strict';
module.exports = function(sequelize, DataTypes) {
  var OrbitDetails = sequelize.define('OrbitDetails', {
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
     tableName: 'orbit_details',
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   Body.hasOne(models.BodyDetails);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(OrbitDetails, fn) {
        OrbitDetails.created_at = Date.now();
        OrbitDetails.updated_at = Date.now();
        fn(null, OrbitDetails);
      },
      beforeUpdate: function(OrbitDetails, fn) {
        OrbitDetails.updated_at = Date.now();
        fn(null, OrbitDetails);
      }
    }
  });
  return OrbitDetails;
};
