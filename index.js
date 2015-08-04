'use strict';

//require('dotenv').load();

var http = require('http');
var api = require('./api');
var debug = require('debug')('ts:server');

// http server
var port = process.env.PORT || '3100';
var server = http.createServer(api);

var io = api.locals.io;
io.attach(server);

server.listen(port, function() {
  port = this.address().port;
  debug('Listening at http://localhost:%s', port);
});
