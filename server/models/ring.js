'use strict';
module.exports = function(sequelize, DataTypes) {
  var Ring = sequelize.define('Ring', {
    distance_from_center_start: DataTypes.NUMERIC,
    distance_from_center_end: DataTypes.NUMERIC,
    width: DataTypes.NUMERIC
  }, {
     tableName: 'ring',
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   Ring.belongsTo(models.Body);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(Ring, fn) {
        Ring.created_at = Date.now();
        Ring.updated_at = Date.now();
        fn(null, Ring);
      },
      beforeUpdate: function(Ring, fn) {
        Ring.updated_at = Date.now();
        fn(null, Ring);
      }
    }
  });
  return Ring;
};
