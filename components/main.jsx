/** @jsx React.DOM */
var React = require('react');
var Shell = require('./shell.js')

React.renderComponent(
  <Shell />,
  document.getElementById('container')
);

window.React = React;