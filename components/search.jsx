/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var $ = require('jquery-browserify');
var store = require('./store.js');
var Q = require('q');
var default_disp = {action:'show', state: 'full'};

module.exports = React.createClass({
	
    getInitialState: function() {
		this.props.message = "";
        this.props.visibility = this.props.visibility || default_disp; 
        return {results: [], currentstate: 'stopped'};
    },

	componentWillMount: function(){
		var search = this.props.search || '';

		if(search==''){
			this.ToggleSearch(false);
		}else{
			this.ToggleSearch(true);
			this.loadData(search);
		}
	},

    componentDidMount: function(){
		var search = this.props.search || '';
        this.setFocus('#txtreference', search);
    },

	componentWillReceiveProps: function (newProps) {
		if(newProps.search && newProps.search!=this.props.search){
			this.setFocus('#txtreference', newProps.search);
			this.loadData(newProps.search);
		}
	},

	setFocus: function(input, searchtext){
		this.refs.searchbox.getDOMNode(input).focus();
		this.refs.searchbox.getDOMNode(input).value = searchtext;
	},

    onKeyUp: function(event){
		event.persist();
        this.debouncedKeyUp().then(function () {
            this.processInput();
            this.props.onKeyUpEvent(event);
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

    processInput: function(){
        var data = this.refs.searchbox.getDOMNode('#txtreference').value;
		if(!data){
			this.emptySearch();
		}else{
            this.loadData(data);
        }
    },

	loadData: function(searchtext, page){
        this.setState({currentstate: 'loading'});

        var page = page || 1;
        store.get('search', {'searchtext': searchtext, 'page': page})
    	.then(function(results){
			references = page===1?[]:this.state.results;
	        results.forEach(function(r){
	            references.push(<SearchResultRow key={'SRR' + r.ref_uri} 
	                reference={r.name} type={r.type} docset={r.docset_name} uri={r.ref_uri}/>)
	        });
			if(references.length>0){
				this.setState({results:references, currentstate: 'loaded', 'page': page, lastsearch: searchtext});
			}else{
				this.setState({results:references, currentstate: 'notfound', 'page': page, lastsearh: searchtext});
			}
			this.ToggleSearch(true);
		}.bind(this));

	},

    loadNext: function(){
        this.loadData(this.state.lastsearch, this.state.page+1);
    },

	ToggleSearch: function(visible){
		if(this.props.onSetDisposition != undefined){
			if(visible){
				this.props.onSetDisposition({component: 'search', action: 'show'});
			}else{
				this.props.onSetDisposition({component: 'search', action: 'hide'});
			}
		}
	},

    emptySearch: function(){
        this.refs.searchbox.getDOMNode('#txtreference').value='';
        this.setState({results:[]});
		this.ToggleSearch(false);
    },

    render: function(){
		if(this.props.visibility.action=='hide'){
			cssclass = "half-height collapse";
		}else{
			cssclass = "half-height";
			if(this.props.visibility.state=='full')
			cssclass = "full-height";
		}
		if(this.state.results.length>0){
        	return(
            <div id="search-view" className={cssclass}  ref='wrap_panel' onScroll={this.askNext}>
                <div className="search-header">
                    <fieldset>
                        <input id="txtreference" ref="searchbox" type="text" className="ry-input-text" name="reference"
                        placeholder="Reference" onKeyUp={this.onKeyUp} defaultValue={this.props.search} />
                        <button className="ry-icon fa-close" onClick={this.emptySearch}></button>
                    </fieldset>
                </div>
                <div id="results" ref='scroll_panel'>
                    <div id="resultlist">
                        {this.state.results}
                    </div>
                </div>
            </div>
        	);
		}else{
			var message = '';
			if(this.state.currentstate=='notfound'){
				message = <div id="results"><div className="search-message">Reference not found!</div></div>
			}else if(this.state.currentstate=='loading'){
				message = <div className="search-message">Loading results...</div>
			}
        	return(
            <div id="search-view" className={cssclass}>
                <div className="search-header">
                    <fieldset>
                        <input id="txtreference" ref="searchbox" type="text" className="ry-input-text" name="reference"
                        placeholder="Reference" onKeyUp={this.onKeyUp} />
                        <span className="ry-icon fa-close" onClick={this.emptySearch}></span>
                    </fieldset>
                </div>
				{message}
            </div>
        	);
		}
    },
    componentDidUpdate: function(prevProps, prevState){
        if(!this.refs.wrap_panel)
           return;
        var wrap = this.refs.wrap_panel.getDOMNode();
        var scroll = this.refs.scroll_panel.getDOMNode();
        var free_space = wrap.scrollHeight - scroll.clientHeight;

        if(free_space>0 && this.state.currentstate==='loaded' && this.state.page === 1){
            scroll.clientHeight = wrap.scrollHeight;
            this.loadNext();
        }
    },

    askNext: function(e){
       var wrap = this.refs.wrap_panel.getDOMNode();
	   if(wrap.scrollTop + wrap.clientHeight >= wrap.scrollHeight){
			this.loadNext();
       }
    }
});
