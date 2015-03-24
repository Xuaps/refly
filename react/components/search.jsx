/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var $ = require('jquery-browserify');
var store = require('./store.js');
var Q = require('q');
var InfiniteScroll = require('react-infinite-scroll')(React);

module.exports = React.createClass({
    getInitialState: function() {
        return {results: [], message:'', hasMore: false};
    },
    
    getDefaultProps: function() {
        return {
            search: ''
        };
      },

    render: function(){
        return(
                <div  className='search-view full-height' id='scroll_panel'>
                    <div className="search-header">
                        <fieldset>
                            <input id="txtreference" ref="searchbox" type="text" className="ry-input-text mousetrap" name="reference"
                            placeholder="Reference" onKeyUp={this.onKeyUp} />
                            <span className="ry-icon fa-close" onClick={this.emptySearch}></span>
                        </fieldset>
                    </div>
                    <InfiniteScroll className='resultlist' loadMore={this.loadData} hasMore={this.state.hasMore} container='scroll_panel' loader={<span className="search-message">Loading ...</span>}>
                        {(this.state.results.length>0)?this.state.results: <div className="search-message">Reference not found!</div>}
                    </InfiniteScroll>
                </div>
        );
    },
    componentDidMount: function(){
		var search = this.props.search || '';
        this.setFocus('#txtreference', search);
    },
    
    emptySearch: function(){
        this.refs.searchbox.getDOMNode('#txtreference').value='';
        this.props.onKeyUpEvent({target:{value: ''}});
        this.cleanResults();
    },

    cleanResults: function(){
        this.setState({results:[]});
    },

    setFocus: function(input, searchtext){
		this.refs.searchbox.getDOMNode(input).focus();
		this.refs.searchbox.getDOMNode(input).value = searchtext;
	},

    onKeyUp: function(event){
		event.persist();
        this.debouncedKeyUp().then(function () {
            this.props.onKeyUpEvent(event);
            if(!event.target.value){
                this.cleanResults();
            }else{
                this.setState({searchtext: event.target.value, results:[], hasMore:true});
            }
        }.bind(this));
    },

	debouncedKeyUp: function () {
        var deferred = Q.defer();
        var timerId = this.timerId;
        var self = this;
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(function () {
                    deferred.resolve();
                }, 800);
        this.timerId = timerId;
        
        return deferred.promise;
    },

	loadData: function(page){
        if(!this.props.search)
            return;
        store.get('search', {'searchtext': this.props.search, 'page': page})
    	.then(function(results){
			references = this.state.results;
			if(results.length>0){
                results.forEach(function(r){
                    references.push(<SearchResultRow key={'SRR' + r.docset + r.ref_uri} onClick={this.props.onClick}
	                reference={r.name} type={r.type} docset={r.docset_name} uri={r.uri}/>)
                }.bind(this));
				this.setState({results:references});
			}else{
				this.setState({hasMore: false});
			}
		}.bind(this));
	},
});
