'use strict';

var Promise = require('bluebird');

/**
 * Fetches initial tweets
 * @param req
 * @param res
 */
exports.getTweets = function(req, res) {
  var T = req.app.locals.T;
  var tag = '#' + req.params.tag;

  T.get('search/tweets', { q: tag, count: 25 }, function(err, data) {
    if (err) throw new Error(err);
    return res.send(data.statuses);
  });
};
