var React = require('react');

module.exports = React.createClass({
    render: function(){
        return <a className={" list-group-item docset-icon docsets-" + this.props.docset.name.replace(' ','-')} onClick={this.props.onClickDocset} key={"docsetlink-" + this.props.docset.name} href={"/" + this.props.docset.name.replace(' ','-').toLowerCase() + "/"}>{this.props.docset.name}</a>;
    }
});
