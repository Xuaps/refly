/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var store = require('./store.js');
var actions = require('./actions.js');
var InfiniteScroll = require('react-infinite-scroll')(React);
var Reflux = require('reflux');
var DbPromise = require('../utils/debounce-promise.js');
var Mousetrap = require('mousetrap');
var NOT_FOUND = 'Reference not found!', LOADING = 'Loading...';

module.exports = React.createClass({
    getInitialState: function() {
        return {data: {results: [], reached_end:true}, message:''};
    },
    
    getDefaultProps: function() {
        return {
            search: ''
        };
      },

    render: function(){
       var result_rows = this.state.data.results.map(function(r){
                    return <SearchResultRow key={'SRR' + r.docset + r.ref_uri} onClick={this.onClickHandler}
	                reference={r.name} marked={r.marked} type={r.type} docset={r.docset_name} uri={r.uri}/>
                }.bind(this));
       var content;
       if(result_rows.length>0){
           content = <InfiniteScroll pageStart={1} className='list-group' loadMore={this.search} hasMore={this._hasMore()} container='search-results' loader={<span className="alert alert-info" role="alert">{LOADING}</span>}>
                        {result_rows}
                    </InfiniteScroll>;
        }else{
            content = this.state.message?<div className="alert alert-info" role="alert">{this.state.message}</div>:undefined;
        }
        return(
                <div>
                    <div className="input-group">
                      <span className="input-group-addon" id="basic-addon1">
                        <span className="glyphicon glyphicon-search" aria-hidden="true"/>
                      </span>
                      <input id="txtreference" ref="searchbox" type="text" className="form-control" placeholder="Search for..." onKeyUp={this.onKeyUp} aria-describedby="basic-addon1" />
                    </div>
                    <div id="search-results" ref='search-results'>
                        {content}
                    </div>
                </div>
        );
    },
    
    onClickHandler: function(uri){
        actions.markReference(uri);
        this.props.onClick(uri);
    },

    _hasMore: function(){
        return this.pattern && !this.state.data.reached_end;
    },

    componentWillMount: function(){
        this.dbpromise = new DbPromise(800);
        this.mousetrap = new Mousetrap(document.documentElement);
        this.unsubscribe = store.listen(this.storeUpdated);
    },

    componentWillUnmount: function(){
        window.removeEventListener('resize', this.calculateHeight, false);
        this.unsubscribe();
    },

    componentDidMount: function(){
        window.addEventListener('resize', this.calculateHeight, false);
        this.calculateHeight();

        this.pattern = this.props.search;
		var search_box = this.refs.searchbox.getDOMNode('#txtreference');
        var default_handler = Mousetrap.handleKey;

        search_box.value = this.props.search;
        this.mousetrap.handleKey = function(character, modifiers, e){
            search_box.focus();
            default_handler(character, modifiers, e);
        };
        if(this.pattern)
            this.search(1);
    },

    calculateHeight: function(){
        this.refs['search-results'].getDOMNode().style['max-height'] = window.document.body.clientHeight - 125 +'px';        
    },

    storeUpdated: function(data){
        var message = '';
        if(data.results.length === 0){
            message = NOT_FOUND;
        }

        this.setState({'data': data, 'message': message});
    },

    emptySearch: function(){
        this.refs.searchbox.getDOMNode('#txtreference').value='';
        this.props.onKeyUpEvent({target:{value: ''}});
        this.cleanResults();
    },

    onKeyUp: function(event){
		event.persist();
        this.dbpromise.debounce().then(function () {
            this.props.onKeyUpEvent(event);
            if(!event.target.value){
                this.cleanResults();
            }else{
                this.pattern = event.target.value;
                this.search(1);
            }
        }.bind(this)).done();
    },

    cleanResults: function(){
        this.setState({data:{results:[], reached_end:true}, message: ''});
    },

	search: function(page){
        if(page===1)
            this.setState({message: LOADING});
        actions.searchReference(this.pattern, page);
	},
});
