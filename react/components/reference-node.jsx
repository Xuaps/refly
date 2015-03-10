/**
 * @jsx React.DOM
 */

var React = require('react');
var Reference = require('../../app/reference_vo.js');

var ReferenceNode = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        uri: React.PropTypes.string,
        type: React.PropTypes.string,
        docset_name: React.PropTypes.string,
    },
    
    render: function(){
        var item=this.props;
        return ( 
            <div className={'type-icon type-'+item.type} onClick={this.onClickHandler}>
                {item.name}
            </div>
        );
    },

    onClickHandler: function() {
        this.props.onClick(this._currentElement.key, new Reference(this.props));
    },
});

module.exports = ReferenceNode;
