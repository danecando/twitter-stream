
require('dotenv').load();

var debug = require('debug')('ts:server');
var server = require('./server');

server.listen('1338', function() {
  var port = this.address().port;
  debug('Listening at http://localhost:%s', port);
});
