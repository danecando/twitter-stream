'use strict';

var React = require('react');
var Router = require('react-router');

var App = require('./components/App.react');
var Home = require('./components/pages/Home.react');
var Hash = require('./components/pages/Hash.react');

var Route = Router.Route;

var routes = (
    <Route handler={App}>
      <Route name="home" path="/" handler={Home}/>
      <Route name="hash" path=":tag" handler={Hash}/>
    </Route>
);

module.exports = routes;
