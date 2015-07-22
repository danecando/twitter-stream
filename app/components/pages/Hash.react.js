'use strict';

var React = require('react');

var Feed = require('../feed/Feed.react');

var Hash = React.createClass({

  componentDidMount: function() {

    // update the page title
    document.title = 'Streaming tweets via: #' + this.props.params.tag + ' - BocaJS';
  },

  render: function() {
    return (
      <Feed tag={this.props.params.tag}/>
    );
  }
});

module.exports = Hash;
