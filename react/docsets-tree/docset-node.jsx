var React = require('react');
var TreeView = require('react-treeview');
var Reference = require('../../app/reference_vo.js');

var DocsetNode = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        start_uri: React.PropTypes.string,
        latest_version_date: React.PropTypes.string,
        description: React.PropTypes.string,
        is_active: React.PropTypes.bool,
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
            <div className={"docset-icon docsets-" + item.name +' '+this.props.className} onClick={this.onClickHandler}>
                {item.name}
            </div>;
        return ( 
            <TreeView key={item.name} onClick={this.onClickHandler} nodeLabel={label} collapsed={this.state.collapsed}>
                {this.props.children}
            </TreeView>
        );
    },

    onClickHandler: function() {
        var ref = new Reference({docset_name: this.props.name, uri: this.props.start_uri});
        this.props.onClick(this._currentElement.key, ref);
        this.setState({collapsed: !this.state.collapsed});
    },
});

module.exports = DocsetNode;
