/**
 * @jsx React.DOM
 */

var React = require('react');
var store = require('../public/js/store.js');
var TreeNode = require('./treenode.jsx');

var nodes = {
    loadData: function(config, parents){
        return store.get('docset').then(function(response){
            var docs = [];
            response.forEach(function(doc){
                docs.push(<TreeNode key={doc} type='docset' name={doc} config={config} parents={[doc]}/>);
            });
            return docs;
        });
    },

    innerLevel: {
        loadData: function(config, parents){
            return store.get('type', {'docset': parents[0]}).then(function(types){
                var treenodes = [];
                types.forEach(function(type){
                    var parents_path=parents.concat(type);
                    treenodes.push(<TreeNode key={type} type={type} name={type} 
                        config={config} parents={parents_path}/>);
                });
                return treenodes;
            });
        },

        innerLevel: {
            loadData: function(config, parents){
                return store.get('reference', {'docset': parents[0], 'type': parents[1]})
                .then(function(references){
                    var treenodes = [];
                    //TODO
                    references.forEach(function(ref){
                        treenodes.push(<TreeNode key={ref.reference} type={ref.type} name={ref.reference} 
                            uri={ref.ref_uri} docset={ref.docset}/>);
                    });
                    return treenodes;
                });
            }
        }
    }
};

var TreeView = React.createClass({
    getInitialState: function() {
        return {
            data: []
        };
    },
    
    componentWillMount: function(){
        nodes.loadData(nodes.innerLevel).then(function(docs){
            this.setState({data: docs});
        }.bind(this));
    },

   render: function() {
		if(this.props.visibility=='hide'){
			cssclass = "half-height hide";
		}else{
			cssclass = "half-height";
		}
        return (
            <div id="tree-view" className={cssclass}>
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
