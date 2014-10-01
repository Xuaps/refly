/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <ul>
                {this.props.nodes}
            </ul>
        );
    }
});