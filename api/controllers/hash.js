'use strict';

/**
 * Renders the hash tag page
 * @param req
 * @param res
 */
exports.view = function(req, res) {
  res.render('hash', { hashtag: req.params.tag });
};

exports.getTweets = function(req, res) {

  var T = req.app.locals.T;
  var tag = '#' + req.params.tag;

  T.get('search/tweets', { q: tag, count: 25 }, function(err, data, response) {
    console.log(response);
    res.send(response);
  });

};

