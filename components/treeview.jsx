/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div id="tree-view" className="half-height">
                <div className="component-header"><a>Treeview</a></div>
                <div className="component-content">
                    <ul>
                        {this.props.nodes}
                    </ul>
                </div>
            </div>
        );
    }
});
