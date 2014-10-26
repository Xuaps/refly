/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({
    render: function(){
        return (
            <li>
                <img src={'/img/languages/' + this.props.docset + '-logo.png'} title={this.props.docset} className="ry-language-source"/>
                <img src={"/img/type-" + this.props.type + ".png"} title={this.props.type} className="ry-type-source"/>
                <Link to="result" key={'RRL' + this.props.uri} className="resultlistitem" params={{'docset': this.props.docset, splat: this.props.uri}}>{this.props.reference}</Link>
                <br/>
                <span className="cursive">{this.props.docset}</span>
            </li>
        );
    }
});
