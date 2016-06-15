'use strict';
module.exports = function(sequelize, DataTypes) {
  var BodyDetails = sequelize.define('BodyDetails', {
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
  }, {
    classMethods: {
      // associate: function(models) {
      //   BodyDetails.belongsTo(models.Body);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(BodyDetails, fn) {
        BodyDetails.created_at = Date.now();
        BodyDetails.updated_at = Date.now();
        fn(null, BodyDetails);
      },
      beforeUpdate: function(BodyDetails, fn) {
        BodyDetails.updated_at = Date.now();
        fn(null, BodyDetails);
      }
    }
  });
  return BodyDetails;
};
