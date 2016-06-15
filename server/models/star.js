'use strict';
module.exports = function(sequelize, DataTypes) {
  var Star = sequelize.define('Star', {
    absolute_magnitude: DataTypes.NUMERIC,
    visual_brightness: DataTypes.NUMERIC,
    spectral_classification: DataTypes.STRING,
    average_speed: DataTypes.NUMERIC
  }, {
     tableName: 'star',
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   BodyDetails.belongsTo(models.Body);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(Star, fn) {
        Star.created_at = Date.now();
        Star.updated_at = Date.now();
        fn(null, Star);
      },
      beforeUpdate: function(Star, fn) {
        Star.updated_at = Date.now();
        fn(null, Star);
      }
    }
  });
  return Star;
};
