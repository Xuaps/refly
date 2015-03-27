
/** @jsx React.DOM */

var React = require('react')
var Docset = require('./docset.jsx');

var Docsets = React.createClass({
    render: function(){
        var docsets = this.props.docsets.map(function(doc){
            return <Docset {...doc} key={doc.name} onClick={this.props.onClick}/>;
        }.bind(this));
        return (
            <div>
                {docsets} 
            </div>
            );
    },

});

module.exports = Docsets;
