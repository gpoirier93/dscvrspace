// var express = require('express');
// var todo = require('../server/models');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;
var express = require('express');
var models = require('../server/models');

module.exports.getApiRouter = function(app) {
  var apiRouter = express.Router();

  apiRouter.get('/planets/:id?', function(req, res) {
    var id = req.params.id;
    var include = req.query.full;
    if (id) {
      if(include) {
        models.Planet.findById(id, {
          include:[ {model:models.Body, as:'body'}]
        }).then(function(planet) {
          res.send({
            planet:planet
          });
        });
      } else {
        models.Planet.findById(id, {
          include:[ {model:models.Body, as:'body', include: [{model:models.BodyDetail, as:'details'}]}]
        }).then(function(planet) {
          res.send({
            planet:planet
          });
        });
      }
    } else {
      var response = 'planets';
      if(include) {
        response += ' included';
      }
      res.send(response);
    }
  });

  apiRouter.get('/stars/:id?', function(req, res) {
    var id = req.params.id;
    if (id) {
      res.send('star' + id);
    } else {
      res.send('stars');
    }
  });

  return apiRouter;
}
