'use strict';
module.exports = function(sequelize, DataTypes) {
  var NEO = sequelize.define('NEO', {
    name: DataTypes.STRING,
    nasa_jpl_url: DataTypes.STRING,
    absolute_magnitude: DataTypes.NUMERIC,
    estimated_diameter_min_km: DataTypes.NUMERIC,
    estimated_diameter_max_km: DataTypes.NUMERIC,
    is_potentially_hazardous: DataTypes.BOOLEAN
  }, {
     tableName: 'neo',
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   Body.hasOne(models.BodyDetails);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(NEO, fn) {
        NEO.created_at = Date.now();
        NEO.updated_at = Date.now();
        fn(null, NEO);
      },
      beforeUpdate: function(NEO, fn) {
        NEO.updated_at = Date.now();
        fn(null, NEO);
      }
    }
  });
  return NEO;
};
