'use strict';
module.exports = function(sequelize, DataTypes) {
  var Satellite = sequelize.define('Satellite', {
    name: DataTypes.STRING,
    satellite_type: DataTypes.ENUM('major', 'minor')
  }, {
     freezeTableName: true,
     underscored: true
  }, {
    instanceMethods: {
      isMajorSatellite: function() { return this.satellite_type === 'major' },
      isMinorSatellite: function() { return this.satellite_type === 'minor' },
    }
  });
  return Satellite;
};
