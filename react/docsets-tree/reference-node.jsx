var React = require('react');
var Reference = require('../../app/reference_vo.js');
var URI = require('URIjs');
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
        var selected = '';
        if (this.isSelected()){ selected = ' selected';}
        return ( 
            <div className={'type-icon type-'+item.type+' '+this.props.className + selected} onClick={this.onClickHandler}>
                {item.name}
            </div>
        );
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
