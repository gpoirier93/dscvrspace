var express = require('express');
var models = require('../server/models');
var serverErrors = require('../server/errors/serverErrors.js');

var dao = module.exports = {};

const SUN_ID = 1;

dao.findSatelliteById = function(id, response) {
  models.Satellite.findById(id, {
    include:[{
      model:models.Body,
      as:'body',
      include:[{
        model:models.BodyDetail,
        as:'details'
      }, {
        model:models.Orbit,
        as:'orbit',
        include:[{
          model:models.OrbitDetail,
          as:'details'
        }]
      }]
    }]
  }).then(function(planet) {
    if (planet) {
      response.send(planet);
    } else {
     sendError(response, new serverErrors.ResourceNotFoundError())
   }
 }).catch(function(error) {
   sendError(response, new serverErrors.BadDBRequestError(error.message));
 });
};

dao.findPlanetById = function(id, response) {
  models.Planet.findById(id, {
    include:[{
      model:models.Body,
      as:'body',
      include:[{
        model:models.BodyDetail,
        as:'details'
      }, {
        model:models.Orbit,
        as:'orbit',
        include:[{
          model:models.OrbitDetail,
          as:'details'
        }]
      }]
    }, {
      model:models.Ring,
      as: 'rings'
    }]
  }).then(function(planet) {
    if (planet) {
      response.send(planet);
    } else {
     sendError(response, new serverErrors.ResourceNotFoundError())
   }
 }).catch(function(error) {
   sendError(response, new serverErrors.BadDBRequestError(error.message));
 });
}

dao.findAllPlanets = function(response) {
  models.Planet.findAll({
    include:[{
      model:models.Body,
      as:'body',
      include:[{
        model:models.BodyDetail,
        as:'details'
      }, {
        model:models.Orbit,
        as:'orbit',
        include:[{
          model:models.OrbitDetail,
          as:'details'
        }]
      }]
    }, {
      model:models.Ring,
      as: 'rings'
    }]
  }).then(function(planets) {
    if (planets) {
      response.send(planets);
    } else {
     sendError(response, new serverErrors.ResourceNotFoundError())
   }
 }).catch(function(error) {
   sendError(response, new serverErrors.BadDBRequestError(error.message));
 });
}

dao.findStarById = function(id, response) {
  models.Star.findById(id, {
    include:[{
      model:models.Body,
      as:'body',
      include:[{
        model:models.BodyDetail,
        as:'details'
      }]
    }]
  }).then(function(star) {
    if (star) {
      response.send(star);
    } else {
     sendError(response, new serverErrors.ResourceNotFoundError())
   }
 }).catch(function(error) {
   sendError(response, new serverErrors.BadDBRequestError(error.message));
 });
}

dao.findAllStars = function(response) {
  models.Star.findAll({
    include:[{
      model:models.Body,
      as:'body',
      include:[{
        model:models.BodyDetail,
        as:'details'
      }]
    }]
  }).then(function(stars) {
    if (stars) {
      response.send(stars);
    } else {
      sendError(response, new serverErrors.ResourceNotFoundError())
    }
  }).catch(function(error) {
    sendError(response, new serverErrors.BadDBRequestError(error.message));
  });
}

dao.findSolarSystem = function(response) {
  models.Star.findById(SUN_ID, { include:[
    { model:models.Body, as:'body' }
  , { model:models.Planet, as:'planets', include:[
      { model:models.Body, as:'body', include:[
        { model:models.Orbit, as:'orbit' }]}
    , { model:models.Satellite, as:'satellites', include:[
        { model:models.Body, as:'body', include:[
          { model:models.Orbit, as:'orbit' }]}]}
    , { model:models.Ring, as:'rings'}]}]
  }).then(function(solarSystem) {
    if (solarSystem) {
      response.send(solarSystem);
    } else {
      sendError(response, new serverErrors.ResourceNotFoundError())
    }
  }).catch(function(error) {
    sendError(response, new serverErrors.BadDBRequestError(error.message));
  });
}

dao.findPlanetarySystem = function(id, response) {
  models.Planet.findById(id, { include:[
      { model:models.Body, as:'body', include:[
        { model:models.Orbit, as:'orbit' }]}
    , { model:models.Satellite, as:'satellites', include:[
        { model:models.Body, as:'body', include:[
          { model:models.Orbit, as:'orbit' }]}]}
    , { model:models.Ring, as:'rings'}]
  }).then(function(planetarySystem) {
    if (planetarySystem) {
      response.send(planetarySystem);
    } else {
      sendError(response, new serverErrors.ResourceNotFoundError())
    }
  }).catch(function(error) {
    sendError(response, new serverErrors.BadDBRequestError(error.message));
  });
}

var sendError = function(response, error) {
  if (error.name === 'ResourceNotFound') {
    response.status(404).send(error.message);
  } else if (error.name === 'BadDBRequest') {
    console.log(error.message);
    response.status(500).send('Request cound not be treated');
  }
}
