var React = require('react');
var Router = require('react-router');
var InfiniteScroll = require('react-infinite-scroll')(React);
var MenuActions = require('./actions.js');
var DocsetNode = require('./docset_node.jsx')
var TypeNode = require('./type_node.jsx')
var ReferenceNode = require('./reference_node.jsx')
var Mousetrap = require('mousetrap');
var store = require('./store.js');
var LOADING = 'loading...';
var PANEL_RELATIONS = {'docsets': {forward: 'types', backward: 'types'}, 'types': {forward:'references', backward: 'docsets'}, 'references':{forward: 'references', backward: 'types'}};
module.exports = React.createClass({
    mixins: [ Router.State, Router.Navigation ],

    getInitialState: function(){
       return {data: {results: [], selected_docset: undefined, selected_type: undefined, reached_end: false, currentpanel: 'docsets'}, current_index: -1};
    },

    // componentWillReceiveProps: function (newProps) {
    //     if(newProps.type){
    //         MenuActions.loadReferencesByType(newProps.docset,newProps.type, 1);
    //     }else if(newProps.docset){
    //         if(newProps.reference && this.state.data.selected_type)
    //             MenuActions.loadReferencesByType(newProps.docset,this.state.data.selected_type, 1);
    //         else
    //             MenuActions.loadTypes(newProps.docset);
    //     }else{
    //         MenuActions.loadDocsets();
    //     }
    // },

    componentWillMount: function(){
        this.unsubscribe = store.listen(this.storeUpdated);
        this.mousetrap = new Mousetrap(document.documentElement);
        if(this.props.type){
            MenuActions.loadReferencesByType(this.props.docset,this.props.type, 1);
        }else if(this.props.docset){
            if(this.props.reference){
                if(this.state.data.selected_type)
                    MenuActions.loadReferencesByType(this.props.docset,this.state.data.selected_type, 1);
                else
                    MenuActions.loadReferencesByUri(this.props.docset, this.props.reference, 1);
            }else{
                MenuActions.loadTypes(this.props.docset);
            }
        }else{
            MenuActions.loadDocsets();
        }
    },

    componentWillUnmount: function(){
        this.mousetrap.unbind('left');
        this.mousetrap.unbind(['enter', 'right']);
        this.mousetrap.unbind('down');
        this.mousetrap.unbind('up');
        window.removeEventListener('resize', this.calculateHeight, false);
    },

    componentDidMount: function(){
        window.addEventListener('resize', this.calculateHeight, false);
        this.calculateHeight();
        this.bindKeys();
    },
    
    bindKeys: function(){
        this.mousetrap.bind('down',function(e){
            e.preventDefault();
            this.goDown();
        }.bind(this));
        this.mousetrap.bind('up',function(e){
            e.preventDefault();
            this.goUp();
        }.bind(this));
        this.mousetrap.bind(['enter', 'right'],function(e){
            e.preventDefault();
            this.selectResult();
        }.bind(this));
        this.mousetrap.bind('left',function(e){
            e.preventDefault();
            this.goBackwards();
        }.bind(this));
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
        var item_rows = this.state.data.results.map(function(item, index){
            return this.buildRows(item,index,this.state.data.currentpanel);
        }.bind(this));

        var content = (<div  id="menu-bar" ref="menu-bar">
                          <div id="menu-results" ref="menu-results"></div>
                      </div>);

        if(this.state.data.currentpanel == "types"){
            panelHeader = (<div id="node--1" className={"list-group-item panel-heading header-menu" + ((this.state.current_index==-1)?' selected':'')}>
                               <span className="left-arrow">
                                 <a title="All Docsets" className="left-arrow" onClick={this.onClickHome} href="/"><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span></a>
                               </span>
                               <span className="menu-title">
                                 {this.state.data.selected_docset.name}
                               </span>
                           </div>);
        }else if(this.state.data.currentpanel == "references"){
            item_rows = (<InfiniteScroll pageStart={1} className='list-group' loadMore={this.loadMoreReferences} hasMore={this._hasMore()} container='menu-results' loader={<span className="alert alert-info" role="alert">{LOADING}</span>}>
                             {item_rows}
                         </InfiniteScroll>);
            panelHeader = (<div id="node--1" ref="panelHeader" className={"list-group-item panel-heading header-menu" + ((this.state.current_index==-1)?' selected':'')}>
                               <a className="back-link" title="All Types" onClick={this.onClickDocset.bind(this,this.state.data.selected_docset.name)} href={'/' + this.state.data.selected_docset.name.toLowerCase()}><span className="left-arrow"><span className="glyphicon glyphicon-menu-left" aria-hidden="true"></span></span></a>
                               <span className="menu-title">{this.state.data.selected_docset.name} / {this.state.data.selected_type}</span>
                           </div>);
        }else if(this.state.data.currentpanel == "docsets"){
            if(this.state.data.selected_docset)
                var panelHeader = (<div id="node--1" className={"list-group-item panel-heading header-menu" + ((this.state.current_index==-1)?' selected':'')}>
                                       <a className="back-link" title={"back to " + this.state.data.selected_docset.name} onClick={this.onClickDocset.bind(this,this.state.data.selected_docset.name)} href={'/' + this.state.data.selected_docset.parsed_name}><span className="right-arrow"><span className="glyphicon glyphicon-menu-right" aria-hidden="true"></span></span></a>
                                   </div>);
        }
        content = (<div id="menu-bar" ref="menu-bar" className="menu-list">
                       {panelHeader}
                       <div id="menu-results" ref="menu-results">{item_rows}</div>
                   </div>);
        return content;
    },

    buildRows: function(item, index, panel){
        if(this.state.current_index==index)
            item.marked = true;
        else
            item.marked = false;
        if(panel=="types"){
            item.docset = this.state.data.selected_docset;
            return <TypeNode result_index={index} type={item} onClickType={this.onClickType.bind(this,item.name, item.docset.name)} key={"typelink-"+item.name} href={"/" + this.state.data.selected_docset.parsed_name + "?type=" + item.name}></TypeNode>;
        }else if(panel=="docsets"){
            return <DocsetNode result_index={index} docset={item} key={"docsetnode" + item.parsed_name + "-" + index} onClickDocset={this.onClickDocset.bind(this,item.name)}></DocsetNode>;
        }else if(panel=="references"){
            return <ReferenceNode result_index={index} reference={item} key={"refnode" + item.type + "-" + index} onClickReference={this.onClickReference.bind(this,item.uri, this.state.data.selected_docset.name, index)} selected_docset={this.state.data.selected_docset}></ReferenceNode>;
        }
    },

    onClickDocset: function(docset, e){
        e.preventDefault();
        this.loadDocset(docset);
    },

    onClickType: function(type, docset, e){
        e.preventDefault();
        this.loadType(docset, type);

    },
    onClickReference: function(reference, docset, index, e){
        e.preventDefault();
        this.loadReference(reference);
        this.setState({current_index: index});
        this.markSelected(index);
    },
    loadDocset: function(docset){
        this.setState({current_index: -1});
        MenuActions.loadTypes(docset);
    },
    loadType: function(docset, type){
        this.setState({current_index: -1});
        MenuActions.loadReferencesByType(docset, type, 1);
    },
    loadReference: function(uri){
        $('.row-offcanvas').toggleClass('active');
        this.transitionTo(uri);
    },
    loadDocsets: function(){
        MenuActions.loadDocsets();
    },
    onClickHome: function(e){
        e.preventDefault();
        this.loadDocsets();
    },
    selectResult: function(){
        if(this.state.current_index==-1){
            var ref = {docset: this.state.data.selected_docset, type: this.state.data.selected_type};
            this.showPanel(ref, PANEL_RELATIONS[this.state.data.currentpanel].backward);
        }else if(this.state.data.results[this.state.current_index]!= undefined){
            var ref = this.state.data.results[this.state.current_index];
            this.showPanel(ref, PANEL_RELATIONS[this.state.data.currentpanel].forward);
            this.markSelected(this.state.current_index);
        }
    },
    markSelected: function(index){
        $(".loaded").toggleClass('loaded');
        $("#node-"+ index).toggleClass('loaded selected');
    },
    goUp: function(){
        if(this.state.current_index>-1){
            var current_index = this.state.current_index - 1;
            this.setState({current_index: current_index});
            $(".selected").toggleClass('selected');
            $("#node-"+ this.state.current_index).toggleClass('selected');
            this.updateScroll();
        }
    },
    goDown: function(){
        if(this.state.current_index<this.state.data.results.length){
            var current_index = this.state.current_index + 1;
            this.setState({current_index: current_index});
            $(".selected").toggleClass('selected');
            $("#node-"+ this.state.current_index).toggleClass('selected');
            this.updateScroll();
        }
    },
    goBackwards: function(){
        if(this.state.data.currentpanel!='docsets'){
            var ref = {docset: this.state.data.selected_docset, type: this.state.data.selected_type};
            this.showPanel(ref, PANEL_RELATIONS[this.state.data.currentpanel].backward);
        }
    },
    showPanel: function(item, panel){
        if(panel=="types"){
            this.loadDocset(item.name || item.docset.name);
        }else if(panel=="docsets"){
            this.loadDocsets();
        }else if(panel=="references"){
            if(item.uri)
                this.loadReference(item.uri);
            else
                this.loadType(item.docset.name, item.name || item.type);
        }
    },

    updateScroll: function(){
        if(this.state.data.results.length>0 && this.state.current_index<this.state.data.results.length && this.state.current_index>-1)
            $("#menu-results").scrollTop($("#node-"+ this.state.current_index).offset().top - $("#node-0").offset().top - 40);

    },

    calculateHeight: function(){
        var panelHeader = 0;
        if(this.refs['panelHeader'])
            panelHeader = 40;
        var search = (window.document.body.clientWidth<768?44:0);
        this.refs['menu-results'].getDOMNode().style['max-height'] = window.document.body.clientHeight - search - panelHeader - 108 +'px';
    },

    loadMoreReferences: function(page){
        if(this.state.data.selected_type)
            MenuActions.loadReferencesByType(this.state.data.selected_docset.name,this.state.data.selected_type, page);
        else
            MenuActions.loadReferencesByUri(this.state.data.selected_docset.name, this.props.reference, page);
    },
    _hasMore: function(){
        return !this.state.data.reached_end;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
      return nextState.current_index === this.state.current_index;
    }
});
