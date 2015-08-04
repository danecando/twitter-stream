'use strict';
/**
 * Footer Component
 * @since 1.0.0
 * @type {*|exports|module.exports}
 */

var React = require('react');


var Footer = React.createClass({

  /**
   * Renders site header
   * @returns {jsx}
   */
  render: function() {
    return (
        <footer id="app-footer">
          <div className="contain">
            <div className="site-info">
              A site by <a href="https://twitter.com/danecando">@danecando</a> for my Node4U! presentation at <a href="http://www.meetup.com/Boca-JS">BocaJS</a>
            </div>
          </div>
        </footer>
    );
  }

});

module.exports = Footer;
