var React = require('react');
var Router = require('react-router');
var MenuActions = require('./actions.js');
var store = require('./store.js');
module.exports = React.createClass({
    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
       return {types: undefined, references: undefined, docsets: undefined, selected_docset: undefined, selected_type: undefined};
    },

    componentWillReceiveProps: function (newProps) {
        if(newProps.type){
            MenuActions.loadReferencesByType(newProps.docset,newProps.type);
        }else if(newProps.docset){
            if(newProps.reference && this.state.selected_type)
                MenuActions.loadReferencesByType(newProps.docset,this.state.selected_type);
            else
                MenuActions.loadTypes(newProps.docset);
        }else{
            MenuActions.loadDocsets();
        }
    },

    componentWillMount: function(){
        this.unsubscribe = store.listen(this.storeUpdated);
        if(this.props.type){
            MenuActions.loadReferencesByType(this.props.docset,this.props.type);
        }else if(this.props.docset){
            if(this.props.reference){
                if(this.state.selected_type)
                    MenuActions.loadReferencesByType(this.props.docset,this.state.selected_type);
                else
                    MenuActions.loadReferencesByUri(this.props.docset, this.props.reference);
            }else{
                MenuActions.loadTypes(this.props.docset);
            }
        }else{
            MenuActions.loadDocsets();
        }
    },

    storeUpdated: function(data){
        this.setState(data);
    },

    render: function(){
        if(this.state.types != undefined){
            var groupoftypelinks = this.state.types.map(function(type){
                return <div key={"type"+type.name}><a onClick={this.ClickHandler} key={"typelink"+type.name} href={"/" + this.props.docset.toLowerCase() + "?type=" + type.name} >{type.name}</a></div>
            }.bind(this));
            return (<div><a onClick={this.ClickHandler} href="/"> &lt; All docsets</a>
                    <div>{groupoftypelinks}</div></div>);
        }else if(this.state.references!= undefined){
            var referencelinks = this.state.references.map(function(ref){
                return <div className="" key={"refbytype-"+ref.type + ref.uri}><a onClick={this.ClickHandler} key={"refbytypelink-"+ref.type + ref.uri} href={ref.uri}>{ref.name}</a></div>
            }.bind(this));
            return (<div><a onClick={this.ClickHandler} href={'/' + this.props.docset}> &lt; All Types</a>
                    <div>{referencelinks}</div></div>);
        }else if(this.state.docsets!= undefined){
            var docsetslinks = this.state.docsets.map(function(docset){
                return <div className="" key={"docset-"+docset.name}><a onClick={this.ClickHandler} key={"docset-"+docset.name} href={"/" + docset.name.toLowerCase() + "/"}>{docset.name}</a></div>
            }.bind(this));
            return (<div>{docsetslinks}</div>);
        }else {
            return <div></div>;
        }
    },

    ClickHandler: function(e){
        e.preventDefault();
        this.transitionTo(e.currentTarget.attributes.href.nodeValue);
    }
});
