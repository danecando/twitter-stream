'use strict';

var React = require('react');

var Feed = React.createClass({

  getTweets: function() {

    var location = window.location.href;

    this.setState({ tweets: [location] });

  },

  getInitialState: function() {
    return { tweets: [] };
  },

  componentDidMount: function() {
    this.getTweets();
  },

  render: function() {
    return (
        <div className="tweet-feed">
          <h1>{this.props.tag}</h1>
        </div>
    );
  }

});

module.exports = Feed;
