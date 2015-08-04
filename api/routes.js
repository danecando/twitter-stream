'use strict';

var express = require('express');
var hash = require('./lib/hash');

var router = express.Router();


// get tweets for hash tag
router.get('/hash/:tag', hash.getTweets);


module.exports = router;
