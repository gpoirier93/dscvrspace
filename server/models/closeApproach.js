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
     tableName: 'close_approach',
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   Body.hasOne(models.BodyDetails);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(CloseApproach, fn) {
        CloseApproach.created_at = Date.now();
        CloseApproach.updated_at = Date.now();
        fn(null, CloseApproach);
      },
      beforeUpdate: function(CloseApproach, fn) {
        CloseApproach.updated_at = Date.now();
        fn(null, CloseApproach);
      }
    }
  });
  return CloseApproach;
};
