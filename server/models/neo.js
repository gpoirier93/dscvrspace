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
      freezeTableName: true,
     underscored: true
  });
  return NEO;
};
