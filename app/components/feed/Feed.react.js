'use strict';

/**
 * Feed Component displays lists of tweets
 * @type {*|exports|module.exports}
 */

var React = require('react');
var Tweet = require('./Tweet.react');

var Feed = React.createClass({

  /**
   * Re-render when new tweets arrive
   *
   * @param nextProps
   */
  componentWillReceiveProps: function(nextProps) {
    var tweets = nextProps.tweets;
    this.setState({ tweets: tweets });
  },

  getInitialState: function() {
    return { tweets: this.props.tweets };
  },

  render: function() {

    var tweetNodes = this.state.tweets.map(function(tweet) {
      return (
          <li className="tweet" key={tweet.id}>
            <Tweet tweet={tweet} />
          </li>
      );
    });

    return (
        <div id="tweet-feed">
          <ol className="tweets">
            {tweetNodes}
          </ol>
        </div>
    );
  }

});

module.exports = Feed;
