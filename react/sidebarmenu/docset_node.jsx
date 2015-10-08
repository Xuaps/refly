var React = require('react');

module.exports = React.createClass({
    render: function(){
    	var className = '';
        if (this.isSelected()){
            className += ' selected';
        }
        return <a id={"node-" + this.props.result_index} className={" list-group-item docset-icon docsets-" + this.props.docset.name.replace(/ /g,'-') + className} onClick={this.props.onClickDocset} key={"docsetlink-" + this.props.docset.name} href={"/" + this.props.docset.name.replace(/ /g,'-').toLowerCase() + "/"}>{this.props.docset.name}</a>;
    },

    isSelected: function(){
        return this.props.docset.marked;
    }
});
