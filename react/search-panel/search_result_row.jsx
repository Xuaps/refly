var React = require('react');
var URI = require('URIjs');
module.exports = React.createClass({

    render: function(){
        return (
                <a id={"result-" + this.props.result_index} onClick={this.props.onClickResult} className={"list-group-item type-icon type-"+ this.props.type} >
                    <span className={"docset-icon docsets-" + this.props.docset.replace(' ', '-')}></span>
                    {this.props.reference}
                </a>
               );
    },
});
