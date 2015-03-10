/**
 * @jsx React.DOM
 */

var React = require('react');
var TreeView = require('react-treeview');

var TypeNode = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
    },
    
    render: function(){
        var item=this.props;
        var label = 
            <span className={'type-icon type-'+item.name}>
                {item.name}
            </span>;
        return ( 
            <TreeView key={item.name} onClick={this.onClickHandler} nodeLabel={label} defaultCollapsed={true}>
                {this.props.children}
            </TreeView>
        );
    },

    onClickHandler: function() {
        this.props.onClick(this._currentElement.key, this.props.name);
    },
});

module.exports = TypeNode;
