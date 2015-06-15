var React = require('react');
var Reference = require('../../app/reference_vo.js');
var URI = require('URIjs');
var MAX_WORD_LENGTH = 29;
var ReferenceNode = React.createClass({
    propTypes: {
        className: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        uri: React.PropTypes.string,
        type: React.PropTypes.string,
        docset_name: React.PropTypes.string,
    },
    
    render: function(){
        var item=this.props;
        this.props.className = this.props.className.replace('selected', '');
        if (this.isSelected()){
            this.props.className += ' selected';
        }
        return ( 
            <div className={'type-icon type-'+item.type+' '+this.props.className} onClick={this.onClickHandler}>
                {this.wordWrapping(item.name)}
            </div>
        );
    },

    wordWrapping: function(word){
        return word.replace(".", ". ").replace("::", ":: ").replace("#", "# ");
    },

    isSelected: function(elementuri){
        var baseUri=new URI(window.document.baseURI);
        var nodeuri = baseUri.protocol() + '://' + baseUri.host() + this.props.uri;
        return window.document.baseURI == nodeuri;
    },

    onClickHandler: function() {
        this.props.onClick(this._reactInternalInstance._currentElement.key, new Reference(this.props));
    },
});

module.exports = ReferenceNode;
