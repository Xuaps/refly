
/** @jsx React.DOM */

var React = require('react')

var Docset = React.createClass({
    render: function(){
        var item = this.props;
        return (
            <li>
                <label htmlFor="checkbox">{item.name}</label>
                <input type='checkbox' name={item.name} value={item.name} defaultChecked={item.active} onClick={this.onClickHandler} />
            </li>
            );
    },

    onClickHandler: function(event){
        this.props.onClick(this.props);
    }
});

module.exports = Docset;
