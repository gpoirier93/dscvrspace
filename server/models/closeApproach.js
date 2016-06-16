'use strict';
module.exports = function(sequelize, DataTypes) {
  var CloseApproach = sequelize.define('CloseApproach', {
    epoch_date: DataTypes.NUMERIC,
    relative_velocity_kms: DataTypes.NUMERIC,
    relative_velocity_kmh: DataTypes.NUMERIC,
    miss_distance_au: DataTypes.NUMERIC,
    miss_distance_km: DataTypes.NUMERIC,
    orbiting_body: DataTypes.STRING
  }, {
     freezeTableName: true,
     underscored: true
  });
  return CloseApproach;
};
