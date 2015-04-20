/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var store = require('./store.js');
var actions = require('./actions.js');
var InfiniteScroll = require('react-infinite-scroll')(React);
var Reflux = require('reflux');
var DbPromise = require('../utils/debounce-promise.js');
var Mousetrap = require('mousetrap');

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
        return(
                <div  className='search-view full-height' id='scroll_panel'>
                    <div className="search-header">
                        <fieldset>
                            <input id="txtreference" ref="searchbox" type="text" className="ry-input-text" name="reference"
                            placeholder="Reference" onKeyUp={this.onKeyUp} />
                            <span className="ry-icon fa-close" onClick={this.emptySearch}></span>
                        </fieldset>
                    </div>
                    <InfiniteScroll pageStart={1} className='resultlist' loadMore={this.search} hasMore={this._hasMore()} container='scroll_panel' loader={<span className="search-message">Loading ...</span>}>
                        {this.state.message?<div className="search-message">{this.state.message}</div>:''}
                        {result_rows}
                    </InfiniteScroll>
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
        this.unsubscribe();
    },

    componentDidMount: function(){
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

    storeUpdated: function(data){
        var message = '';
        if(data.results.length === 0){
            message = 'Reference not found!';
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
        actions.searchReference(this.pattern, page);
	},
});
