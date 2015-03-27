/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var $ = require('jquery-browserify');
var store = require('./store.js');
var actions = require('./actions.js');
var InfiniteScroll = require('react-infinite-scroll')(React);
var Reflux = require('reflux');
var DbPromise = require('../utils/debounce-promise.js');

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
                    return <SearchResultRow key={'SRR' + r.docset + r.ref_uri} onClick={this.props.onClick}
	                reference={r.name} type={r.type} docset={r.docset_name} uri={r.uri}/>
                }.bind(this));
        return(
                <div  className='search-view full-height' id='scroll_panel'>
                    <div className="search-header">
                        <fieldset>
                            <input id="txtreference" ref="searchbox" type="text" className="ry-input-text mousetrap" name="reference"
                            placeholder="Reference" onKeyUp={this.onKeyUp} />
                            <span className="ry-icon fa-close" onClick={this.emptySearch}></span>
                        </fieldset>
                    </div>
                    <InfiniteScroll className='resultlist' loadMore={this.search} hasMore={this.props.search && !this.state.data.reached_end} container='scroll_panel' loader={<span className="search-message">Loading ...</span>}>
                        {(result_rows.length>0)?result_rows: <div className="search-message">Reference not found!</div>}
                    </InfiniteScroll>
                </div>
        );
    },

    componentWillMount: function(){
        this.dbpromise = new DbPromise(800);
    },

    componentDidMount: function(){
		var search = this.props.search || '';
        this.setFocus('#txtreference', search);
        if(search)
            this.search(1);
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

    setFocus: function(input, searchtext){
		this.refs.searchbox.getDOMNode(input).focus();
		this.refs.searchbox.getDOMNode(input).value = searchtext;
	},

	search: function(page){
        actions.searchReference(this.props.search,page);
	},
});
