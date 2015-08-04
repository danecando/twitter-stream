'use strict';

/**
 * Single Tweet Component
 * @type {*|exports|module.exports}
 */

var React = require('react');

var Tweet = React.createClass({

  render: function() {
    var tweet = this.props.tweet;
    var link = 'https://twitter.com/' + tweet.user.screen_name;
    return (
        <div className="tweet-container">
          <div className="profile-pic">
            <a href={link}>
              <img src={tweet.user.profile_image_url} alt=""/>
            </a>
          </div>
          <div className="content-box">
            <div className="tweet-meta">
              <h2 className="user-name">{tweet.user.name} <small><a href={link}>@{tweet.user.screen_name}</a></small></h2>
              <div className="content">{tweet.text}</div>
            </div>
          </div>
        </div>
    );
  }

});

module.exports = Tweet;
