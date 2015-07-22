'use strict';

var express = require('express');

var auth = require('./controllers/auth');
var hash = require('./controllers/hash');

var router = express.Router();


// get tweets for hash tag
router.get('/hash/', hash.getTweets);

router.post('/auth/signin', auth.signIn)

module.exports = router;
