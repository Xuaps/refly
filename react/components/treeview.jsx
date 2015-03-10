/**
 * @jsx React.DOM
 */

var React = require('react');
var store = require('./store.js');
var TreeView = require('react-treeview');
var DocsetNode = require('./docset-node.jsx');
var TypeNode = require('./type-node.jsx');
var ReferenceNode = require('./reference-node.jsx');

var ReferencesTreeView = React.createClass({
    getInitialState: function() {
        return {
            data: [],
			selected: undefined
        };
    },

	componentWillReceiveProps:  function(newProps) {
		if(newProps.params && newProps.params.docset)
			this.setState({selected: {uri: newProps.params.uri, docset:newProps.params.docset}});
	},

    componentWillMount: function(){
        store.get('docset_active').then(function(response){
            var docs = [];
            response.forEach(function(doc){
               docs.push(<DocsetNode key={doc.name} onClick={this.onDocsetClick} {...doc} />);
            }.bind(this));
            this.setState({data:docs});
        }.bind(this));
    },
    
    onDocsetClick: function(key, ref){
        this.props.onNodeClick(ref);
        var component = this.state.data.filter(function(doc){
            return doc.props.name === ref.docset_name;
        })[0];

        if(!component.props.children) {
            store.get('type',{activedocset: ref.docset_name}).then(function(types){
                var children = [];
                types.forEach(function(type){
                    var item = <TypeNode key={ref.docset_name+'.'+type.name} onClick={this.onTypeClick} {...type} />;
                    children.push(item);
                }.bind(this));
                component.props.children = children;
                this.forceUpdate();
            }.bind(this));
        };
    },

    onTypeClick: function(key, type_name){
        var docset_name = key.split('.')[0];
        var component = this.state.data.filter(function(doc){
            return doc.props.name === docset_name;
        })[0].props.children.filter(function(type){
            return type.props.name === type_name;
        })[0];
        
        if(!component.props.children) {
            store.get('treeviewreference',{docset: docset_name, type: type_name}).then(function(references){
                var children = [];
                references.forEach(function(ref){
                    var item = <ReferenceNode key={ref.name} onClick={this.onReferenceClick} {...ref} />;
                    children.push(item);
                }.bind(this));
                component.props.children = children;
                this.forceUpdate();
            }.bind(this));
        };
    },
    
    onReferenceClick: function(key, ref){
        this.props.onNodeClick(ref);
    },

    render: function() {
        return (
                <div id="tree-view" className="full-height">
                    {this.state.data}
                </div>
               );
    }
});

module.exports = ReferencesTreeView;
