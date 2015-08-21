var React = require('react');

module.exports = React.createClass({
    render: function(){
        return <a className={"list-group-item type-icon type-" + this.props.type.name} onClick={this.props.onClickType} key={"typelink-"+this.props.type.name} href={"/" + this.props.selected_docset.parsed_name + "?type=" + this.props.type.name} >{this.props.type.name}</a>;
    }
});
