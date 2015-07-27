var React = require('react');
var URI = require('URIjs');
module.exports = React.createClass({
    render: function(){
    	var className = '';
        if (this.isLoaded()){
            className += ' loaded';
        }
        if (this.isSelected()){
            className += ' selected';
        }
        return <a id={"node-" + this.props.result_index} className={"list-group-item wrap-text type-icon type-" + this.props.reference.type + className} onClick={this.onClickHandler} key={this.props.nodeKey} href={this.props.reference.uri}><span className={"docset-icon docsets-" + this.props.selected_docset.name}></span> {this.props.reference.name}</a>;
    },

    isLoaded: function(){
        var baseUri=new URI(window.document.baseURI);
        var nodeuri = baseUri.protocol() + '://' + baseUri.host() + encodeURI(this.props.reference.uri);
        return encodeURI(window.document.baseURI) == nodeuri;
    },

    isSelected: function(){
        return this.props.reference.marked;
    },

    onClickHandler: function(e) {
        this.props.onClickReference(e);
        dataLayer.push({'event': 'treeview', 'docset': this.docset_name});
    },
});
