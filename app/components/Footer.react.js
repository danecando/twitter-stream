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
        <header id="app-footer">
          <div className="contain">
            <h2>Site Footer</h2>
          </div>
        </header>
    );
  }

});

module.exports = Footer;
