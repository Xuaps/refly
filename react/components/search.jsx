/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var $ = require('jquery-browserify');
var store = require('./store.js');
var Q = require('q');
var TEXT_LOAD_MESSAGE='Loading...';
var TEXT_REFERENCE_NOT_FOUND_MESSAGE='Reference not found!';

module.exports = React.createClass({
    getInitialState: function() {
        return {results: [], lastResultsPage: 0, message:''};
    },
    
    getDefaultProps: function() {
        return {
            search: ''
        };
      },
	
    componentWillMount: function(){
		var search = this.props.search;

		if(search){
			this.loadData(search);
		}
	},

    componentDidMount: function(){
		var search = this.props.search || '';
        this.setFocus('#txtreference', search);
    },

    render: function(){
        var message = '';
        if(this.state.results.length>0){
            message=
                <div id="results" ref='scroll_panel'>
                    <div id="resultlist">
                        {this.state.results}
                    </div>
                </div>
        }else{
            message = <div id="results"><div className="search-message">{this.state.message}</div></div>;
        }
        return(
            <div id="search-view" className='full-height' ref='wrap_panel' onScroll={this.askNext}>
                <div className="search-header">
                    <fieldset>
                        <input id="txtreference" ref="searchbox" type="text" className="ry-input-text mousetrap" name="reference"
                        placeholder="Reference" onKeyUp={this.onKeyUp} />
                        <span className="ry-icon fa-close" onClick={this.emptySearch}></span>
                    </fieldset>
                </div>
				{message}
            </div>
        );
    },
    
    componentWillReceiveProps: function (newProps) {
		if(newProps.search && newProps.search!=this.props.search){
			this.setFocus('#txtreference', newProps.search);
			this.loadData(newProps.search);
		}
    },

    componentDidUpdate: function(prevProps, prevState){
        if(!this.refs.wrap_panel || !this.refs.scroll_panel)
           return;
        var wrap = this.refs.wrap_panel.getDOMNode();
        var scroll = (wrap.scrollHeight) > wrap.clientHeight;

        if(!scroll && this.state.lastResultsPage===this.state.page){
            this.loadNext();
        }
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
                this.loadData(event.target.value);
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

	loadData: function(searchtext, page){
        var page = page || 1;
        this.setState({message: TEXT_LOAD_MESSAGE, 'page': page});
        store.get('search', {'searchtext': searchtext, 'page': page})
    	.then(function(results){
			references = page===1?[]:this.state.results;
	        results.forEach(function(r){
	            references.push(<SearchResultRow key={'SRR' + r.ref_uri} onClick={this.props.onClick}
	                reference={r.name} type={r.type} docset={r.docset_name} uri={r.uri}/>)
	        }.bind(this));
			if(results.length>0){
				this.setState({results:references, lastResultsPage: page, lastsearch: searchtext});
			}else{
				this.setState({results:references, lastsearh: searchtext});
			}
            this.setState({message:results.length>0?'':TEXT_REFERENCE_NOT_FOUND_MESSAGE});
		}.bind(this));

	},

    loadNext: function(){
        this.loadData(this.state.lastsearch, this.state.page+1);
    },

    askNext: function(e){
       var wrap = this.refs.wrap_panel.getDOMNode();
	   var scroll = wrap.scrollTop + wrap.clientHeight + 5 >= wrap.scrollHeight;
       if(scroll && this.state.lastResultsPage===this.state.page){
           console.log(this.state.lastResultsPage +' '+this.state.page);
			this.loadNext();
       }
    }
});
