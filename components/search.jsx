/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var $ = require('jquery-browserify');
var store = require('../public/js/store.js');
var Q = require('q');

module.exports = React.createClass({
	
    getInitialState: function() {
		this.props.message = "";
        return {results: []};
    },

	componentDidMount: function(){
		var search = this.props.search || '';

        this.setFocus('#txtreference', search);
		if(search==''){
			this.ToggleSearch(false);
		}else{
			this.ToggleSearch(true);
			this.loadData(search);
		}
	},

	setFocus: function(input, searchtext){
		this.refs.searchbox.getDOMNode(input).value = searchtext;
		this.refs.searchbox.getDOMNode(input).focus();
	},

    onKeyUp: function(event){
		event.persist();
		if(event.target.value==''){
			this.emptySearch(event);
		}else if(event.keyCode!=73){
			if(event.keyCode==13){
				this.loadData(event.target.value);
				this.props.onKeyUpEvent(event);
			}else{
				this.debouncedKeyUp(event.target.value).then(function (result) {
				    this.loadData(result);
					this.props.onKeyUpEvent(event);
				}.bind(this));
			}
		}
    },

	debouncedKeyUp: function (value) {
        var deferred = Q.defer();
        var timerId = this.timerId;
        var self = this;
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout((function (innerValue) {
                return function () {
                    deferred.resolve(innerValue);
                }
            })(value), 800);
        this.timerId = timerId;
        
        return deferred.promise;
    },

	loadData: function(searchtext){
		store.get('search', {'searchtext': searchtext})
    	.then(function(results){
			references = [];
	        results.forEach(function(r){
	            references.push(<SearchResultRow key={'SRR' + r.ref_uri} 
	                reference={r.reference} type={r.type} docset={r.docset} uri={r.ref_uri}/>)
	        });
			this.setState({results:references});
			this.ToggleSearch(true);
		}.bind(this));

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

    emptySearch: function(event){
        this.refs.searchbox.getDOMNode('#txtreference').value='';
        this.setState({results:[]});
		this.ToggleSearch(false);
    },

    render: function(){
		if(this.props.visibility.action=='hide'){
			cssclass = "half-height collapse";
		}else{
			cssclass = "half-height";
		}
		if(this.state.results.length>0){
        	return(
            <div id="search-view" className={cssclass}>
                <div className="search-header">
                    <fieldset>
                        <input id="txtreference" ref="searchbox" type="text" className="ry-input-text" name="reference"
                        placeholder="Reference" onKeyUp={this.onKeyUp} defaultValue={this.props.search} />
                        <span className="ry-icon fa-close" onClick={this.emptySearch}></span>
                    </fieldset>
                </div>
                <div id="results">
                    <ul id="resultlist">
                        {this.state.results}
                    </ul>
                </div>
            </div>
        	);
		}else{
			if(this.props.search!='' && this.props.message!=''){
				this.props.message = <div className="search-message">Reference not found!</div>
			}else{
				this.props.message = <div className="search-message">Loading results...</div>
			}
        	return(
            <div id="search-view" className={cssclass}>
                <div className="search-header">
                    <fieldset>
                        <input id="txtreference" ref="searchbox" type="text" className="ry-input-text" name="reference"
                        placeholder="Reference" onKeyUp={this.onKeyUp} defaultValue={this.props.search} />
                        <span className="ry-icon fa-close" onClick={this.emptySearch}></span>
                    </fieldset>
                </div>
					<div id="results">
						{this.props.message}
		            </div>
            </div>
        	);
		}
    }
});
