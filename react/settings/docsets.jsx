var React = require('react')
var Docset = require('./docset.jsx');

var Docsets = React.createClass({
    render: function(){
        var docsets = this.props.docsets.map(function(doc){
            if(doc.active){
                var btnunselect =  document.getElementById('btnunselect');
                btnunselect.className = "btn btn-link";
            }
            return <Docset {...doc} key={doc.name} onClick={this.props.onClick}/>;
        }.bind(this));
        return (
            <ul className="col3">
                {docsets} 
            </ul>
            );
    },

});

module.exports = Docsets;
