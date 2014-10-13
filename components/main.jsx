/** @jsx React.DOM */
var React = require('react');
var routes = require('./routes.jsx');

React.renderComponent(routes, document.getElementById('container'));

window.React = React;
