/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    onClickHandler: function(){
        this.props.onClick(this.props.uri);
    },

    render: function(){
        return (
                <a onClick={this.onClickHandler} className={"resultlistitem type-icon type-"+ this.props.type} >
                    <span className={"docset-icon docsets-" + this.props.docset}></span>
                    {this.props.reference}
                </a>
               );
    }
});