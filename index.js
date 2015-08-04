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
  var T = api.locals.T;

  port = this.address().port;
  debug('Listening at http://localhost:%s', port);

  // stream of #bocajs tweets
  var stream = T.stream('statuses/filter', { track: '#bocajs' });

  // listen for tweet events
  stream.on('tweet', function(tweet) {
    io.emit('newTweet', tweet);
  });

  // catch error events
  stream.on('error', function(err) {
    console.error(err);
  });
});
