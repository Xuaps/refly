/**
 * @jsx React.DOM
 */

var React = require('react');
var store = require('./store.js');
var TreeviewActions = require('./actions.js');
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

    componentWillMount: function(){
        this.unsubscribe = store.listen(this.onDocsetsChange);
        TreeviewActions.load();       
    },

    componentWillUnmount: function(){
        this.unsubscribe();
    },

    onDocsetsChange: function(state){
        var components = [];
        state.forEach(function(docset){
           components.push(<DocsetNode key={docset.name} onClick={this.onDocsetClick} {...docset} 
              className={docset.marked?'selected':''} />);
           if(docset.types) {
                   var doc_comp = components[components.length-1];
                   doc_comp.props.children = [];
                   docset.types.forEach(function(type){
                       var node = <TypeNode key={docset.name+'.'+type.name} onClick={this.onTypeClick} {...type}
                        className={type.marked?'selected':''} />;
                       doc_comp.props.children.push(node);
                       if(type.references) {
                           var type_comp = node;
                           type_comp.props.children = [];
                           type.references.forEach(function(ref){
                               var item = <ReferenceNode key={ref.uri} onClick={this.onReferenceClick} {...ref}
                                    className={ref.marked?'selected':''}/>;
                               type_comp.props.children.push(item);
                           }.bind(this));
                       };
               }.bind(this));
           };
        }.bind(this));
        this.setState({data: components});
    },
    
    onDocsetClick: function(key, ref){
        this.props.onNodeClick(ref.uri);
        TreeviewActions.selectDocset(ref.docset_name);
    },

    onTypeClick: function(key, type_name){
        TreeviewActions.selectType(key.split('.')[0], type_name);
    },
    
    onReferenceClick: function(key, ref){
        this.props.onNodeClick(ref.uri);
        TreeviewActions.selectReference(ref);
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
