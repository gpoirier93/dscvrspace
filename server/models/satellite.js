'use strict';
module.exports = function(sequelize, DataTypes) {
  var Satellite = sequelize.define('Satellite', {
    name: DataTypes.STRING,
    satellite_type: DataTypes.ENUM('major', 'minor')
  }, {
     tableName: 'satellite',
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   Body.hasOne(models.BodyDetails);
      // }
    }, instanceMethods: {
      isMajorSatellite: function() { return this.satellite_type === 'major' },
      isMinorSatellite: function() { return this.satellite_type === 'minor' },
    }
  }, {
    hooks: {
      beforeCreate: function(Satellite, fn) {
        Satellite.created_at = Date.now();
        Satellite.updated_at = Date.now();
        fn(null, Satellite);
      },
      beforeUpdate: function(Satellite, fn) {
        Satellite.updated_at = Date.now();
        fn(null, Satellite);
      }
    }
  });
  return Satellite;
};
