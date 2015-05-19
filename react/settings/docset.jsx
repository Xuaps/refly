
/** @jsx React.DOM */

var React = require('react')

var Docset = React.createClass({
    render: function(){
        var item = this.props;
        return (
            <li>
                <div>
                <label htmlFor={item.name}>{item.name}</label>
                <input type='checkbox' name={item.name} id={item.name} value={item.name} defaultChecked={item.active} onClick={this.onClickHandler} />
                </div>
            </li>
            );
    },

    onClickHandler: function(event){
        this.props.onClick(this.props);
    }
});

module.exports = Docset;
