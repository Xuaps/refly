/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
    render: function(){
        return (
            <li>
                <img src={"/img/type-" + this.props.type + ".png"} title={this.props.type} className="ry-type-source"/>
                <Link to="result" className="resultlistitem" params={{splat: this.props.uri}}>{this.props.key}</Link>
                <br/>
                <span className="cursive">{this.props.docset}</span>
            </li>
        )
    }
});