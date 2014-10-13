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
        store.get('docsets').then(function(response){
            this.setState({data: response});
        }.bind(this));
    },

   render: function() {
        return (
            <div id="tree-view" className="half-height">
                <div className="component-header"><a>Treeview</a></div>
                <div className="component-content">
                    <ul>
                        {this.state.data.map(
                            function(ref){
                                return ( <TreeNode key={ref.url} type={ref.type} name={ref.name} url={ref.url}/> );
                            })
                        }
                    </ul>
               </div>
            </div>
        );
    }
});

module.exports = TreeView;
