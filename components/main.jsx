/** @jsx React.DOM */
var React = require('react');
var Shell = require('./shell.jsx')

React.renderComponent(
  <Shell />,
  document.getElementById('container')
);

window.React = React;