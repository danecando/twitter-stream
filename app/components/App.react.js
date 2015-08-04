'use strict';
/**
 * App top level component
 * Serves as a layout component for the app
 * @type {*|exports|module.exports}
 */

var React = require('react');
var Router = require('react-router');

// components
var Header = require('./Header.react');

var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function() {
    return (
        <div id="app">
          <Header/>
          <RouteHandler/>
        </div>
    );
  }
});

module.exports = App;
