'use strict';
module.exports = function(sequelize, DataTypes) {
  var Planet = sequelize.define('Planet', {
    average_orbital_speed: DataTypes.NUMERIC,
    moon_number: DataTypes.INTEGER
  }, {
     freezeTableName: true,
     underscored: true
  });
  return Planet;
};
