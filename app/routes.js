'use strict';
/**
 * React Router for client side routing
 * @type {*|exports|module.exports}
 */

var React = require('react');
var Router = require('react-router');
var App = require('./components/App.react');
var Stream = require('./components/pages/Stream.react');
var Hash = require('./components/pages/Hash.react');

var Route = Router.Route;

var routes = (
    <Route handler={App}>
      <Route name="stream" path="/" handler={Stream}/>
      <Route name="hash" path=":tag" handler={Hash}/>
    </Route>
);

module.exports = routes;
