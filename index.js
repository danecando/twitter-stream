'use strict';

require('dotenv').load();

var debug = require('debug')('ts:api');
var api = require('./api');

api.listen('1338', function() {
  var port = this.address().port;
  debug('Listening at http://localhost:%s', port);
});
