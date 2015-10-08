var React = require('react')

var Docset = React.createClass({
    render: function(){
        var item = this.props;
        return (
            <li>
                <div className="_settings item">
                <input type='checkbox' className="docset-checkbox" name={item.name.replace(/ /g, '-')} id={item.name.replace(/ /g, '-')} value={item.name.replace(/ /g, '-')} defaultChecked={item.active} onClick={this.onClickHandler} />
                <label className={"docset-icon docsets-" + item.name.replace(/ /g, '-')} htmlFor={item.name.replace(/ /g, '-')}>{item.name}</label>
                </div>
            </li>
            );
    },

    onClickHandler: function(event){
        this.props.onClick(this.props);
    }
});

module.exports = Docset;
