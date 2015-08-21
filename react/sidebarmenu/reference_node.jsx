var React = require('react');

module.exports = React.createClass({
    render: function(){
        return <a className={"list-group-item type-icon type-" + this.props.reference.type} onClick={this.props.onClickReference} key={this.props.nodeKey} href={this.props.reference.uri}><span className={"docset-icon docsets-" + this.props.selected_docset.name}></span> {this.props.reference.name}</a>;
    }
});
