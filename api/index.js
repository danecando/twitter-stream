'use strict';

/**
 * Exports an express application
 *
 * Basically a sequentially ordered middleware between an http request
 * and a response from the server.
 *
 * ~ Middleware does work on an http request and passes it on
 * ~ Below the middleware our routing takes the http requests and our route
 *   handlers do their work and generate a response
 * ~ Below our routing are catch all handlers to redirect 404's home
 *
 * @type {*|exports|module.exports}
 */

var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var socket = require('socket.io');
var Twit = require('twit');
var path = require('path');
var router = require('./routes');


// express app
var api = express();

// socket.io
var io = socket();
api.locals.io = io;

// twitter api
var T = new Twit({
  consumer_key: process.env.T_CONSUMER_KEY,
  consumer_secret: process.env.T_CONSUMER_SECRET,
  access_token: process.env.T_ACCESS_TOKEN,
  access_token_secret: process.env.T_ACCESS_TOKEN_SECRET,
  app_only_auth: true
});
api.locals.T = T;


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

// Middleware
api.use(bodyParser.json());
api.use(compression());


// api routes
api.use('/', router);

// web directory
api.use('/', express.static(path.dirname(require.main.filename) + '/www'));


// Redirect 404's home
api.use(function(req, res) {
  res.redirect('/');
});

module.exports = api;
