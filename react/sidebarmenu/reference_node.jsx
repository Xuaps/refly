var React = require('react');
var URI = require('URIjs');
module.exports = React.createClass({
    render: function(){
    	var className = '';
        if (this.isSelected()){
            className += ' selected';
        }
        return <a className={"list-group-item type-icon type-" + this.props.reference.type + className} onClick={this.props.onClickReference} key={this.props.nodeKey} href={this.props.reference.uri}><span className={"docset-icon docsets-" + this.props.selected_docset.name}></span> {this.props.reference.name}</a>;
    },

    isSelected: function(){
        var baseUri=new URI(window.document.baseURI);
        var nodeuri = baseUri.protocol() + '://' + baseUri.host() + this.props.reference.uri;
        return window.document.baseURI == nodeuri;
    }

});
