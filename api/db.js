'use strict';

var mongoose = require('mongoose');
var debug = require('debug')('ts:db');

mongoose.connect(process.env.MONGO_URL);

var db = mongoose.connection;

db.on('error', function(err) {
  debug(err);
});

db.once('open', function() {
  debug('Connected to database');
});

module.exports = db;
