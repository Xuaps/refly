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
        return (
                <a id={"result-" + this.props.result_index} onClick={this.props.onClickResult} className={"list-group-item type-icon type-"+ this.props.type + className} >
                    <span className={"docset-icon docsets-" + this.props.docset.replace(' ', '-')}></span>
                    {this.props.reference}
                </a>
               );
    },

    isLoaded: function(){
        var baseUri=new URI(window.document.baseURI);
        var nodeuri = baseUri.protocol() + '://' + baseUri.host() + encodeURI(this.props.uri);
        return window.document.baseURI == nodeuri;
    },

    isSelected: function(){
        return this.props.marked;
    }
});
