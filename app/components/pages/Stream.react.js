'use strict';

/**
 * Stream component gets initial tweets and listens for incoming
 * tweets from the socket connection
 *
 * @type {*|exports|module.exports}
 */

var React = require('react');
var request = require('superagent');
var Promise = require('bluebird');
var Feed = require('../feed/Feed.react');
var Footer = require('../Footer.react');


var Stream = React.createClass({

  getTweets: function(tag) {
    return new Promise(function(resolve, reject) {
      request
          .get('/hash/' + tag)
          .end(function(err, res) {
            if (err) return reject(err);
            return resolve(res.body);
          });
    });
  },

  getInitialState: function() {
    return {
      tweets: [],
      count: 0
    };
  },

  componentDidMount: function() {
    var self = this;

    // page title
    document.title = 'Streaming tweets via: #BocaJS';

    var socket = io.connect('http://localhost:3100');

    socket.on('newTweet', function(tweet) {
      var tweets = self.state.tweets;
      var count = self.state.count + 1;
      tweets.unshift(tweet);
      self.setState({
        tweets: tweets,
        count: count
      });
    });

    // get initial tweets
    self.getTweets('bocajs')
        .then(function(tweets) {
          self.setState({ tweets: tweets });
        })
        .catch(function(err) {
          console.log(err);
        });
  },

  render: function() {
    return (
        <section id="app-main">
          <div className="contain">
            <h2 className="page-title"><span className="hash">#BocaJS</span> Live Streaming Tweets <small>({this.state.count} new)</small></h2>
            <Feed tweets={this.state.tweets}/>
          </div>
          <Footer/>
        </section>
    );
  }

});

module.exports = Stream;
