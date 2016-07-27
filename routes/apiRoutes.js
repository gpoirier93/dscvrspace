var express = require('express');
var dao = require('./apiMethods.js');

module.exports.getApiRouter = function(app) {
  var apiRouter = express.Router();

  apiRouter.get('/satellites/:id', function(req, res) {
    var id = req.params.id;
    dao.findSatelliteById(id, res);
  })

  apiRouter.get('/planets/:id?', function(req, res) {
    var id = req.params.id;
    if (id) {
      dao.findPlanetarySystem(id, res);
    } else {
      dao.findAllPlanets(res);
    }
  });

  apiRouter.get('/stars/:id?', function(req, res) {
    var id = req.params.id;
    if (id) {
      dao.findStarById(id, res);
    } else {
      dao.findAllStars(res);
    }
  });

  apiRouter.get('/solarSystem', function(req, res) {
    dao.findSolarSystem(res);
  });

  return apiRouter;
}
