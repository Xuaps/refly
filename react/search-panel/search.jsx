/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var $ = require('jquery-browserify');
var store = require('./store.js');
var actions = require('./actions.js');
var InfiniteScroll = require('react-infinite-scroll')(React);
var Reflux = require('reflux');
var DbPromise = require('../utils/debounce-promise.js');
var Mousetrap = require('mousetrap');

module.exports = React.createClass({
    mixins: [Reflux.connect(store,"data")],

    getInitialState: function() {
        return {data: {results: [], reached_end:true}};
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
                    <InfiniteScroll className='resultlist' loadMore={this.search} hasMore={this._hasMore()} container='scroll_panel' loader={<span className="search-message">Loading ...</span>}>
                        {(result_rows.length===0 && !this._hasMore())? <div className="search-message">Reference not found!</div>: result_rows}
                    </InfiniteScroll>
                </div>
        );
    },
    
    onClickHandler: function(uri){
        actions.markReference(uri);
        this.props.onClick(uri);
    },

    _hasMore: function(){
        return this.props.search && !this.state.data.reached_end;
    },

    componentWillMount: function(){
        this.dbpromise = new DbPromise(800);
        this.mousetrap = new Mousetrap(document.documentElement);
    },

    componentDidMount: function(){
		var search = this.props.search || '';
		var search_box = this.refs.searchbox.getDOMNode('#txtreference');
        var default_handler = Mousetrap.handleKey;

        search_box.value = search;
        this.mousetrap.handleKey = function(character, modifiers, e){
            search_box.focus();
            default_handler(character, modifiers, e);
        };
        if(search)
            this.search(1);
    },

    componentWillUnmount: function(){
        //Mousetrap.handleKey = this.default_handler;
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
                this.search(1);
            }
        }.bind(this));
    },

    cleanResults: function(){
        this.setState({data:{results:[], reached_end:true}});
    },

	search: function(page){
        actions.searchReference(this.props.search,page);
	},
});
