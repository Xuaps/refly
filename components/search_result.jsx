/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    render: function(){
        return (
            <li>
                <img src={"/img/type-" + this.props.type + ".png"} title={this.props.type} className="ry-type-source"/>
                <a href="#" className="resultlistitem">{this.props.key}</a>
                <br/>
                <span className="cursive">{this.props.docset}</span>
            </li>
        )
    }
});