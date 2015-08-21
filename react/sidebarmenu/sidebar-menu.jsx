var React = require('react');
var Router = require('react-router');
var InfiniteScroll = require('react-infinite-scroll')(React);
var MenuActions = require('./actions.js');
var DocsetNode = require('./docset_node.jsx')
var TypeNode = require('./type_node.jsx')
var ReferenceNode = require('./reference_node.jsx')
var store = require('./store.js');
var LOADING = 'loading...';
module.exports = React.createClass({
    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
       return {types: [], references: [], docsets: [], selected_docset: undefined, selected_type: undefined, reached_end: false};
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
            MenuActions.loadReferencesByType(this.props.docset,this.props.type, 1);
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
        var item_rows = [];
        var panelHeader = "";
        var typelink_rows = this.state.types.map(function(type, index){
            return <TypeNode selected_docset={this.state.selected_docset} type={type} onClickType={this.onClickType.bind(this,type.name, this.state.selected_docset.name)} key={"typelink-"+type.name} href={"/" + this.state.selected_docset.parsed_name + "?type=" + type.name}></TypeNode>
        }.bind(this));
        
        var reference_link_rows = this.state.references.map(function(ref,index){
            return <ReferenceNode reference={ref} key={"refnode" + ref.type + "-" + index} onClickReference={this.onClickReference.bind(this,ref.uri, this.state.selected_docset.name)} selected_docset={this.state.selected_docset}></ReferenceNode>
        }.bind(this));

        var docset_link_rows = this.state.docsets.map(function(docset, index){
            return <DocsetNode docset={docset} key={"docsetnode" + docset.parsed_name + "-" + index} onClickDocset={this.onClickDocset.bind(this,docset.name)}></DocsetNode>
        }.bind(this));

        var content = (<div  id="menu-bar" ref="menu-bar">
                          <div id="menu-results" ref="menu-results"></div>
                      </div>);

        if(typelink_rows.length>0){
            var item_rows = typelink_rows;
            panelHeader = (<div className="list-group-item panel-heading header-menu">
                               <span className="left-arrow">
                                 <a title="All Docsets" className="left-arrow" onClick={this.onClickHome} href="/"><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span></a>
                               </span>
                               <span className="menu-title">
                                 {this.state.selected_docset.name}
                               </span>
                           </div>);
        }else if(reference_link_rows.length>0){
            item_rows = (<InfiniteScroll pageStart={1} className='list-group' loadMore={this.loadMoreReferences} hasMore={this._hasMore()} container='menu-results' loader={<span className="alert alert-info" role="alert">{LOADING}</span>}>
                             {reference_link_rows}
                         </InfiniteScroll>);
            panelHeader = (<div ref="panelHeader" className="list-group-item panel-heading header-menu">
                               <a className="back-link" title="All Types" onClick={this.onClickDocset.bind(this,this.state.selected_docset.name)} href={'/' + this.state.selected_docset.name.toLowerCase()}><span className="left-arrow"><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span></span></a>
                               <span className="menu-title">{this.state.selected_docset.name} / {this.state.selected_type}</span>
                           </div>);
        }else if(docset_link_rows.length>0){
            item_rows = docset_link_rows;
            if(this.state.selected_docset)
                var panelHeader = (<div className="list-group-item panel-heading header-menu">
                                       <a className="back-link" title={"back to " + this.state.selected_docset.name} onClick={this.onClickDocset.bind(this,this.state.selected_docset.name)} href={'/' + this.state.selected_docset.parsed_name}><span className="right-arrow"><span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></span></a>
                                   </div>);
        }
        content = (<div id="menu-bar" ref="menu-bar" className="menu-list">
                       {panelHeader}
                       <div id="menu-results" ref="menu-results">{item_rows}</div>
                   </div>);
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
        var panelHeader = 0;
        if(this.refs['panelHeader'])
            panelHeader = 40;
        var search = (window.document.body.clientWidth<768?44:0);
        this.refs['menu-results'].getDOMNode().style['max-height'] = window.document.body.clientHeight - search - panelHeader - 108 +'px';
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
