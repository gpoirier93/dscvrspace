var express = require('express');
var pg = require('pg')
var models = require("./server/models");

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  // var bodies = models.Body.findAll({ include: [ models.BodyDetail ]}).then(function(bodies) {
  //   console.log(bodies[0]);
  //   console.log(bodies[0].getBodyDetail());
  // });
  response.render('index.ejs');
});

// SYNC DB
models.sequelize.sync({force:false}).then(function () {
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
});
