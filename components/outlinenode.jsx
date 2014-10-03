/**
 * @jsx React.DOM
 */

var React = require('react');
var Link = require('react-router').Link;
var Outline = require('./outline.jsx');
var OutlineNode = React.createClass({

  reLoad: function(){
    data=[
		  {reference: "getElementById", type: "function", uri: "uri3"},
		  {reference: "null", type: "class", uri: "uri4"}
    ];
	this.setState({"data": data});

  },
  render: function() {
	var item = this.props.reference;
    return (
        <li>
			<Link to='result' params={{splat: item.uri}} onClick={this.reLoad}>{item.reference}</Link>
        </li>
    );
  }
});

module.exports = OutlineNode;

