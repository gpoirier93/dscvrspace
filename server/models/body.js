'use strict';
module.exports = function(sequelize, DataTypes) {
  var Body = sequelize.define('Body', {
    diameter: { type: DataTypes.NUMERIC, allowNull: false },
    media_url: DataTypes.STRING
  }, {
     freezeTableName:true,
     underscored: true
  }, {
    classMethods: {
      // associate: function(models) {
      //   Body.hasOne(models.BodyDetails);
      // }
    }
  }, {
    hooks: {
      beforeCreate: function(Body, fn) {
        Body.created_at = Date.now();
        Body.updated_at = Date.now();
        fn(null, Body);
      },
      beforeUpdate: function(Body, fn) {
        Body.updated_at = Date.now();
        fn(null, Body);
      }
    }
  });
  return Body;
};
