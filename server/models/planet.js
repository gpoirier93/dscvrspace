'use strict';
module.exports = function(sequelize, DataTypes) {
  var Planet = sequelize.define('Planet', {
    solar_order: DataTypes.INTEGER,
    moon_number: DataTypes.INTEGER,
    ring_number: DataTypes.INTEGER,
    name_fr: DataTypes.STRING,
    name_en: DataTypes.STRING
  }, {
     freezeTableName: true,
     underscored: true
  });
  return Planet;
};
