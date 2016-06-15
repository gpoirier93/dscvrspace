'use strict';
module.exports = function(sequelize, DataTypes) {
  var Orbit = sequelize.define('Orbit', {
    eccentricity: DataTypes.NUMERIC,
    semie_major_axis: DataTypes.NUMERIC,
    perihelion_distance: DataTypes.NUMERIC,
    inclination: DataTypes.NUMERIC,
    perihelion_argument: DataTypes.NUMERIC,
    ascending_node: DataTypes.NUMERIC
  }, {
     tableName: 'orbit',
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   Body.hasOne(models.BodyDetails);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(Orbit, fn) {
        Orbit.created_at = Date.now();
        Orbit.updated_at = Date.now();
        fn(null, Orbit);
      },
      beforeUpdate: function(Orbit, fn) {
        Orbit.updated_at = Date.now();
        fn(null, Orbit);
      }
    }
  });
  return Orbit;
};
