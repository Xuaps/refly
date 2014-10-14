/**
 * @jsx React.DOM
 */

var React = require('react');
var store = require('../public/js/store.js');
var TreeNode = require('./treenode.jsx');

var TreeView = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    
    componentWillMount: function(){
        store.get('docset').then(function(response){
            var docs = [];
            response.forEach(function(doc){
                docs.push(<TreeNode key={doc} type='docset' name={doc}/>);
            });
            this.setState({data: docs});
        }.bind(this));
    },

   render: function() {
        return (
            <div id="tree-view" className="half-height">
                <div className="component-header"><a>Treeview</a></div>
                <div className="component-content">
                    <ul>
                        {this.state.data}
                    </ul>
               </div>
            </div>
        );
    }
});

module.exports = TreeView;
