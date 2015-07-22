var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var Twit = require('twit');
var debug = require('debug')('ts:server');
var path = require('path');

var db = require('./db');
var router = require('./routes');

var app = express();


// Setup & store twitter on application
var T = new Twit({
  consumer_key: 'C7jS0gKtt8atFsvJN0ulRm6te',
  consumer_secret: 'SFNNPSgJ3r7M3NwNyg2qt2K5Ro2uy1Na7dPmdHU6UlIcH4c5sg',
  access_token: '1093412383-8AAsPvpoH2fs6Cl8lr5QUMYp4ClQEMIBBpvVxW9',
  access_token_secret: 'yo1LBDvFMBg2GqjA9a773mgjGKwIFCG0lxi013oW0h9LL'
});

app.locals.T = T;


// Middleware
app.use(session({
  secret: '27z8kiIEkrsz4tPj2vyFvUx3e42RNCpX',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    expires: (1000 * 60 * 60 * 24 * 30)
  },
  store: new MongoStore({ mongooseConnection: db })
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// web directory
app.use('/', express.static(path.dirname(require.main.filename) + '/www'));

// api routes
app.use('/', router);


// Error handlers
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
