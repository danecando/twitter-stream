var express = require('express');
var hbs = require('hbs');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var debug = require('debug')('ts:server');
var path = require('path');

var db = require('./db');
var router = require('./routes');

var app = express();


// Views
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');


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


// Routes
app.use('/', express.static(path.dirname(require.main.filename) + '/public'));
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
