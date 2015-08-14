var React = require('react');
var Router = require('react-router');
var InfiniteScroll = require('react-infinite-scroll')(React);
var MenuActions = require('./actions.js');
var store = require('./store.js');
var LOADING = 'loading...';
module.exports = React.createClass({
    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
       return {types: undefined, references: undefined, docsets: undefined, selected_docset: undefined, selected_type: undefined, reached_end: false};
    },

    componentWillReceiveProps: function (newProps) {
        if(newProps.type){
            MenuActions.loadReferencesByType(newProps.docset,newProps.type, 1);
        }else if(newProps.docset){
            if(newProps.reference && this.state.selected_type)
                MenuActions.loadReferencesByType(newProps.docset,this.state.selected_type, 1);
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
                    MenuActions.loadReferencesByType(this.props.docset,this.state.selected_type, 1);
                else
                    MenuActions.loadReferencesByUri(this.props.docset, this.props.reference, 1);
            }else{
                MenuActions.loadTypes(this.props.docset);
            }
        }else{
            MenuActions.loadDocsets();
        }
    },

    componentDidMount: function(){
        window.addEventListener('resize', this.calculateHeight, false);
        this.calculateHeight();
    },
    
    componentDidUpdate: function(){
        this.calculateHeight();
    },
    storeUpdated: function(data){
        this.setState(data);
    },

    render: function(){
        var content = (<div  id="menu-bar" ref="menu-bar">
                          <div id="menu-results" ref="menu-results"></div>
                      </div>);
        if(this.state.types != undefined){
            var groupoftypelinks = this.state.types.map(function(type){
                return <a className={"list-group-item type-icon type-" + type.name} onClick={this.onClickType.bind(this,type.name, this.state.selected_docset.name)} key={"typelink-"+type.name} href={"/" + this.state.selected_docset.name.toLowerCase() + "?type=" + type.name} >{type.name}</a>
            }.bind(this));
            content = (<div id="menu-bar" ref="menu-bar" className="panel panel-default">
                           <div className="panel-heading"><a className="back-link" onClick={this.onClickHome} href="/"> <span className="left-arrow"><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span></span> All Docsets</a></div>
                           <div className="list-group-item panel-heading header-menu">{this.state.selected_docset.name}</div>
                           <div id="menu-results" ref="menu-results">{groupoftypelinks}</div>
                       </div>);
        }else if(this.state.references!= undefined){
            var referencelinks = this.state.references.map(function(ref){
                return <a className={"list-group-item type-icon type-" + ref.type} onClick={this.onClickReference.bind(this,ref.uri, this.state.selected_docset.name)} key={"refbytypelink-"+ref.type + ref.uri} href={ref.uri}><span className={"docset-icon docsets-" + this.state.selected_docset.name}></span> {ref.name}</a>
            }.bind(this));

            content = <InfiniteScroll pageStart={1} className='list-group' loadMore={this.loadMoreReferences} hasMore={this._hasMore()} container='menu-results' loader={<span className="alert alert-info" role="alert">{LOADING}</span>}>
                        {referencelinks}
                      </InfiniteScroll>;
            return (<div id='menu-bar' ref='menu-bar' className="panel panel-default menu-list">
                        <div className="panel-heading"><a className="back-link" onClick={this.onClickDocset.bind(this,this.state.selected_docset.name)} href={'/' + this.state.selected_docset.name.toLowerCase()}><span className="left-arrow"><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span></span> All Types</a></div>
                        <div className="list-group-item panel-heading header-menu">{this.state.selected_docset.name} / {this.state.selected_type}</div>
                        <div id="menu-results" ref="menu-results">{content}</div>
                    </div>);
        }else if(this.state.docsets!= undefined){
            var docsetslinks = this.state.docsets.map(function(docset){
                return <a className={" list-group-item docset-icon docsets-" + docset.name.replace(' ','-')} onClick={this.onClickDocset.bind(this,docset.name)} key={"docsetlink-"+docset.name} href={"/" + docset.name.replace(' ','-').toLowerCase() + "/"}>{docset.name}</a>
            }.bind(this));
            if(this.state.selected_docset)
                var lastdocset_visited = <div className="panel-heading"><a className="back-link" onClick={this.onClickDocset.bind(this,this.state.selected_docset.name)} href={'/' + this.state.selected_docset.name.toLowerCase()}> {this.state.selected_docset.name} <span className="right-arrow"><span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></span></a></div>;
            else
                var lastdocset_visited = <div className="panel-heading"></div>;
            content = (<div id="menu-bar" ref="menu-bar" className="panel panel-default menu-list">
                           {lastdocset_visited}
                           <div className="list-group-item panel-heading header-menu">Docsets</div>
                           <div id="menu-results" ref="menu-results" className="panel panel-default">{docsetslinks}</div>
                       </div>);
        }
        return content;
    },

    onClickDocset: function(docset, e){
        e.preventDefault();
        MenuActions.loadTypes(docset);
    },

    onClickType: function(type, docset, e){
        e.preventDefault();
        MenuActions.loadReferencesByType(docset, type, 1);
    },

    onClickReference: function(reference, docset, e){
        e.preventDefault();
        $('.row-offcanvas').toggleClass('active');
        this.transitionTo(reference);
    },

    onClickHome: function(e){
        e.preventDefault();
        MenuActions.loadDocsets();
    },

    calculateHeight: function(){
        var header = (window.document.body.clientWidth<768?84:0);
        this.refs['menu-results'].getDOMNode().style['max-height'] = window.document.body.clientHeight - header - 208 +'px';
    },

    loadMoreReferences: function(page){
        if(this.state.selected_type)
            MenuActions.loadReferencesByType(this.state.selected_docset.name,this.state.selected_type, page);
        else
            MenuActions.loadReferencesByUri(this.state.selected_docset.name, this.props.reference, page);
    },
    _hasMore: function(){
        return !this.state.reached_end;
    }
});
