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
                return <div key={"type"+type.name}><a className="list-group-item" onClick={this.onClickType.bind(this,type.name, this.state.selected_docset.name)} key={"typelink-"+type.name} href={"/" + this.state.selected_docset.name.toLowerCase() + "?type=" + type.name} >{type.name}</a></div>
            }.bind(this));
            return (<div  className="list-group"><a className="list-group-item active" onClick={this.onClickHome} href="/"> &lt; All docsets</a>
                    <div>{groupoftypelinks}</div></div>);
        }else if(this.state.references!= undefined){
            var referencelinks = this.state.references.map(function(ref){
                return <a className="list-group-item" onClick={this.onClickReference.bind(this,ref.uri, this.state.selected_docset.name)} key={"refbytypelink-"+ref.type + ref.uri} href={ref.uri}>{ref.name}</a>
            }.bind(this));
            return (<div className="list-group"><a className="list-group-item active" onClick={this.onClickDocset.bind(this,this.state.selected_docset.name)} href={'/' + this.state.selected_docset.name.toLowerCase()}> &lt; All Types</a>
                    <div>{referencelinks}</div></div>);
        }else if(this.state.docsets!= undefined){
            var docsetslinks = this.state.docsets.map(function(docset){
                return <div  key={"docsetitem-"+docset.name} className={"docset-icon docsets-" + docset.name.replace(' ','-')}><a className="list-group-item" onClick={this.onClickDocset.bind(this,docset.name)} key={"docsetlink-"+docset.name} href={"/" + docset.name.replace(' ','-').toLowerCase() + "/"}>{docset.name}</a></div>
            }.bind(this));
            return (<div className="list-group"><div>{docsetslinks}</div></div>);
        }else {
            return <div></div>;
        }
    },

    onClickDocset: function(docset, e){
        e.preventDefault();
        MenuActions.loadTypes(docset);
        // this.transitionTo(e.currentTarget.attributes.href.nodeValue);
    },


    onClickType: function(type, docset, e){
        e.preventDefault();
        MenuActions.loadReferencesByType(docset, type);
        // this.transitionTo(e.currentTarget.attributes.href.nodeValue);
    },
    onClickReference: function(reference, docset, e){
        e.preventDefault();
        $('.row-offcanvas').toggleClass('active');
        this.transitionTo(reference);
    },

    onClickHome: function(e){
        e.preventDefault();
        MenuActions.loadDocsets();
        // this.transitionTo(e.currentTarget.attributes.href.nodeValue);
    }
});
