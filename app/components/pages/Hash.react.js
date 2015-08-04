'use strict';

/**
 * Hash Page Component (Controller-View-Esque)
 *
 * This page component renders the latest tweets for a hash tag based on the
 * client side url param. It collects incoming tweet data through a socket
 * connection and passes it down to child components via props.
 *
 * @type {*|exports|module.exports}
 */

var React = require('react');
var request = require('superagent');
var Promise = require('bluebird');
var Feed = require('../feed/Feed.react');
var Footer = require('../Footer.react');

var Hash = React.createClass({

  /**
   * Makes an http request to our server api
   * to request tweets for the matching tag
   *
   * @param tag
   * @returns {bluebird|exports|module.exports}
   */
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

  /**
   * Initial state for the Component
   *
   * @returns {{tweets: Array}}
   */
  getInitialState: function() {
    var tag = this.props.params.tag;

    // page title
    document.title = 'Tweets via: #' + tag + ' - BocaJS';

    return {
      tweets: []
    };
  },

  /**
   * Update data when the url param prop changes
   *
   * @param nextProps
   */
  componentWillReceiveProps: function(nextProps) {
    var self = this;
    var tag = nextProps.params.tag;

    // update title if pages changes
    document.title = 'Tweets via: #' + tag + ' - BocaJS';

    self.getTweets(tag)
        .then(function(tweets) {
          self.setState({ tweets: tweets });
        })
        .catch(function(err) {
          console.log(err);
        });
  },

  /**
   * Fetch tweets on initial render
   */
  componentDidMount: function() {
    var self = this;
    var tag = this.props.params.tag;

    // get initial tweets
    self.getTweets(tag)
        .then(function(tweets) {
          self.setState({ tweets: tweets });
        })
        .catch(function(err) {
          console.log(err);
        });
  },

  /**
   * Renders our Hash Page Component
   * Pass along tweets to feed Component
   *
   * @returns {XML}
   */
  render: function() {
    return (
        <section id="app-main">
          <div className="contain">
            <h2 className="page-title">Recent <span className="hash">#{this.props.params.tag}</span> Tweets <small>(25)</small></h2>
            <Feed tweets={this.state.tweets}/>
          </div>
          <Footer/>
        </section>
    );
  }

});

module.exports = Hash;
