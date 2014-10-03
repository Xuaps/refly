/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router').Link;
var Outline = require('./outline.jsx');
var OutlineNode = React.createClass({
  render: function() {
	var item = this.props.reference;
    return (
        <li>
			<Link to='result' params={{splat: item.uri}}>{item.reference}</Link>
        </li>
    );
  }
});

module.exports = OutlineNode;

