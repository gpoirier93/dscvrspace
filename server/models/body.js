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
      associate: function(models) {
        Body.belongsTo(models.BodyDetail);
      }
    }
  });
  return Body;
};
