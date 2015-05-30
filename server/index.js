let express = require('express');

let app = express();

app.get('/', function(req, res) {
  res.send('hell world');
});

module.exports = app;
