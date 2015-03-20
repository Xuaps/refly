/**
 * @jsx React.DOM
 */

var React = require('react');
var TreeView = require('react-treeview');

var TypeNode = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        className: React.PropTypes.string
    },
    
    getInitialState: function(){
        return {
            collapsed: true
        };
    },

    render: function(){
        var item=this.props;
        var label = 
            <span className={'type-icon type-'+item.name+' '+this.props.className} onClick={this.onClickHandler}>
                {item.name}
            </span>;
        return ( 
            <TreeView key={item.name} onClick={this.onClickHandler} nodeLabel={label} collapsed={this.state.collapsed}>
                {this.props.children}
            </TreeView>
        );
    },

    onClickHandler: function() {
        this.props.onClick(this._currentElement.key, this.props.name);
        this.setState({collapsed: !this.state.collapsed});
    },
});

module.exports = TypeNode;
