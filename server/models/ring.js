'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ring = sequelize.define('Ring', {
    distance_from_center_start: DataTypes.NUMERIC,
    distance_from_center_end: DataTypes.NUMERIC,
    width: DataTypes.NUMERIC
  }, {
     freezeTableName: true,
     underscored: true
  });
  return Ring;
};
