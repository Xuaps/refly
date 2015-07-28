var React = require('react');

module.exports = React.createClass({
    onClickHandler: function(){
        this.props.onClick(this.props.uri);
    },

    render: function(){
        return (
                <a id={"result-" + this.props.result_index} onClick={this.onClickHandler} className={"list-group-item type-icon type-"+ this.props.type + ((this.props.marked)?' selected':'')} >
                    <span className={"docset-icon docsets-" + this.props.docset.replace(' ', '-')}></span>
                    {this.props.reference}
                </a>
               );
    }
});
