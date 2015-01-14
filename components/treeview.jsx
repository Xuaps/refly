/**
 * @jsx React.DOM
 */

var React = require('react');
var store = require('./store.js');
var TreeNode = require('./treenode.jsx');

var nodes = {
        loadData: function(config, parents){
        return store.get('docset_active').then(function(response){
            var docs = [];
            response.forEach(function(doc){
                docs.push(<TreeNode key={doc.path} path={doc.path} type='docset' name={doc.name} config={config} parents={[doc]}/>);
            });
            return docs;
        });
    },

    innerLevel: {
        loadData: function(config, parents){
            return store.get('type', {'activedocset': parents[0].name}).then(function(types){
                var treenodes = [];
                types.forEach(function(type){
                    var parents_path = parents.concat(type);
                    treenodes.push(<TreeNode key={type.name} path={type.image} type={type.name} name={type.name} 
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
                            uri={ref.ref_uri} docset={ref.docset} />);
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
            data: [],
			selected: undefined
        };
    },

    getDefaultProps: function() {
      return {
        visibility: {
            action: 'show',
            state: 'half'
        }
      };
    },

	componentWillReceiveProps:  function(newProps) {
		if(newProps.params && newProps.params.docset)
			this.setState({selected: {uri: newProps.params.uri, docset:newProps.params.docset}});
	},

    componentWillMount: function(){
        nodes.loadData(nodes.innerLevel).then(function(docs){
            this.setState({data: docs});
        }.bind(this));
    },

   render: function() {
		if(this.props.visibility.action=='hide'){
			cssclass = "half-height hide";
		}else{
			cssclass = "half-height";
			if(this.props.visibility.state=='full')
			cssclass = "full-height";
		}
		
		var data = this.state.data.map(function(d){			
			d.props.selected = this.state.selected;	
			return d;	
		}.bind(this));

        return (
            <div id="tree-view" className={cssclass}>
                <div className="component-content">
                    <ul>
                        {data}
                    </ul>
               </div>
            </div>
        );
    }
});

module.exports = TreeView;
