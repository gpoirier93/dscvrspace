var express = require('express');
var pg = require('pg')

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index.ejs');
});

app.get('/db', function (request, response) {

  pg.connect("postgres://qngxbqhjmbfqjc:zJhNZhA4N7K7lsQ4KUGSgzFhpR@ec2-54-243-199-137.compute-1.amazonaws.com:5432/d509q9qjjgacnc?ssl=true", function(err, client, done) {
    if (err) {
      console.error(err); response.send("Error " + err);
    } else {
      client.query('SELECT * FROM test_table', function(err, result) {
        done();
        if (err)
        {
           console.error(err); response.send("Error " + err);
        }
        else
        {
          console.log(result.rows);
          response.render('pages/db', {results: result.rows} );
        }
      });
    }
  });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
