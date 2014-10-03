/** @jsx React.DOM */
var React = require('react');
var OutlineNode = require('./outlinenode.jsx');
var Outline = React.createClass({
  render: function() {
		var references = this.props.data.map(function (item) {
      return (
        <OutlineNode reference={item} />
      );
    });
    return (
      <div className="outlineBox">
        <h1>Outline</h1>
		<ul>
        {references}
		</ul>
      </div>
    );
  }
});

module.exports = Outline;
