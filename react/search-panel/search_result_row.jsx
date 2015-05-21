var React = require('react');

module.exports = React.createClass({
    onClickHandler: function(){
        this.props.onClick(this.props.uri);
    },

    render: function(){
        return (
                <a onClick={this.onClickHandler} className={"list-group-item type-icon type-"+ this.props.type + ((this.props.marked)?' selected':'')} >
                    <span className={"docset-icon docsets-" + this.props.docset}></span>
                    {this.props.reference}
                </a>
               );
    }
});
