'use strict';
module.exports = function(sequelize, DataTypes) {
  var Planet = sequelize.define('Planet', {
    average_orbital_speed: DataTypes.NUMERIC,
    moon_number: DataTypes.INTEGER
  }, {
     tableName: 'planet',
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   BodyDetails.belongsTo(models.Body);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(Planet, fn) {
        Planet.created_at = Date.now();
        Planet.updated_at = Date.now();
        fn(null, Planet);
      },
      beforeUpdate: function(Planet, fn) {
        Planet.updated_at = Date.now();
        fn(null, Planet);
      }
    }
  });
  return Planet;
};
