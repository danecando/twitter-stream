require('babel/register');

var app = require('./server');

var server = app.listen('1338', function() {
  var port = server.address().port;
  console.log('Listening at http://localhost:%s', port);
});
