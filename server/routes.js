'use strict';

var express = require('express');
var hashtag = require('./controllers/hashtag');

var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('home');
});

module.exports = router;
