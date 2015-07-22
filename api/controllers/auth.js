'use strict';

var Promise = require('bluebird');
var request = require('superagent');

var auth = module.exports = {};

auth.signIn = function signin(req, res) {

  var self = this;
  var cbUrl = req.body.cbUrl;
  var token = req.session.token;

  self.getRequestToken(cbUrl, token)
    .then(self.redirect.bind(null, token));
};


auth.getRequestToken = function getRequestToken(cbUrl, token) {
  if (token) return Promise.resolve(token);

  return new Promise(function(resolve, reject) {
    request
      .post('https://api.twitter.com/oauth/request_token?oauth_callback=' + cbUrl)
      .end(function(err, res) {
        if (err || res.status !== 200 || !res.body['oauth_callback_confirmed']) {
          return reject(res.status);
        }

        var reqToken = {
          token: res.body['oauth_token'],
          tokenSecret: res.body['oauth_token_secret']
        };

        return resolve(reqToken);
      });
  });
};

auth.redirect = function redirect(token) {
  res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' + token.token);
};

auth.getAccesstoken = function getAccessToken() {

}
