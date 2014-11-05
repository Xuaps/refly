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
                docs.push(<TreeNode key={doc.path} path={doc.path} type='docset' name={doc.name} config={config} parents={[doc]}/>);
            });
            return docs;
        });
    },

    innerLevel: {
        loadData: function(config, parents){
            return store.get('type', {'docset': parents[0].name}).then(function(types){
                var treenodes = [];
                types.forEach(function(type){
                    var parents_path = parents.concat(type);
                    treenodes.push(<TreeNode key={type.path} path={type.path} type={type.name} name={type.name} 
                        config={config} parents={parents_path}/>);
                });
                return treenodes;
            });
        },

        innerLevel: {
            loadData: function(config, parents){
                return store.get('treeviewreference', {'docset': parents[0].name, 'type': parents[1].name})
                .then(function(references){
                    var treenodes = [];
                    //TODO
                    references.forEach(function(ref){
                        treenodes.push(<TreeNode key={'TVT' + ref.reference} type={ref.type} name={ref.reference} path={ref.reference.toLowerCase()}
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
