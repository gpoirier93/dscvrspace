var express = require('express');
var pg = require('pg')
var models = require("./server/models");
var apiRouter = require("./routes/apiRoutes.js");
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index.ejs', {location:'home'});
});

app.get('/solarSystem', function(request, response) {
  response.render('index.ejs', {location:'solarSystem'});
})

app.get('/neo', function(request, response) {
  response.render('index.ejs', {location:'neo'});
})

app.get('/neo/:id', function(request, response) {
  response.render('index.ejs', {location:'neo/'+request.params.id});
})

app.get('/system/:planet', function(request, response) {
  response.render('index.ejs', {location:'system/'+request.params.planet});
})

app.get('/about', function(request, response) {
  response.render('index.ejs', {location:'about'});
})

app.use('/api', apiRouter.getApiRouter(app));

app.get('/*', function(request, response) {
  response.redirect('/');
});

// SYNC DB
models.sequelize.sync({force:false}).then(function () {
  app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
  });
});
