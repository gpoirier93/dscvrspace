'use strict';
module.exports = function(sequelize, DataTypes) {
  var Star = sequelize.define('Star', {
    absolute_magnitude: DataTypes.NUMERIC,
    visual_brightness: DataTypes.NUMERIC,
    spectral_classification: DataTypes.STRING,
    average_speed: DataTypes.NUMERIC
  }, {
     freezeTableName: true,
     underscored: true
  });
  return Star;
};
