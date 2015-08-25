var React = require('react');

module.exports = React.createClass({
    render: function(){
    	var className = '';
        if (this.isSelected()){
            className += ' selected';
        }
        return <a id={"node-" + this.props.result_index} className={"list-group-item type-icon type-" + this.props.type.name + className} onClick={this.props.onClickType} key={"typelink-"+this.props.type.name} href={"/" + this.props.type.docset.parsed_name + "?type=" + this.props.type.name} >{this.props.type.name}</a>;
    },

    isSelected: function(){
        return this.props.type.marked;
    }
});
