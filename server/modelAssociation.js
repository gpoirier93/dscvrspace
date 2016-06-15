var models = require('./models');

// models.Body.hasOne(models.BodyDetails);
// models.Body.belongsTo(models.BodyDetails, { as: 'bodyDetails', foreignKey: 'body_details_id', constraints: false });
//
// // SYNC DB
// models.sequelize.sync({force:true}).then(function () {
//   console.log('Models association completed');
// });

var body = models.Body.create({
  diameter: 10
}, {
  include: [ {model: models.BodyDetails, as:'bodyDetails'} ]
});
