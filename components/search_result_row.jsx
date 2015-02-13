/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
    render: function(){
        return (
                <Link to="result" key={'RRL' + this.props.uri} className={"resultlistitem type-icon type-"+ this.props.type} params={{'docset': this.props.docset, splat: this.props.uri}}>
                    <span className={"docset-icon docsets-" + this.props.docset}></span>
                    {this.props.reference}
                </Link>
               );
    }
});
