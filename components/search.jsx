/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var $ = require('jquery-browserify');
var store = require('../public/js/store.js');

module.exports = React.createClass({
	
    getInitialState: function() {
        return {results: []};
    },

	componentDidMount: function(){
		this.setFocus('#txtreference',this.props.search);
		if(this.props.search==''){
			this.ToggleSearch(false);
		}else{
			this.ToggleSearch(true);
			this.loadData(this.props.search);
		}
	},

	setFocus: function(input, searchtext){
		this.refs.searchbox.getDOMNode(input).value = searchtext;
		this.refs.searchbox.getDOMNode(input).focus();
	},

    onKeyUp: function(event){

		if(event.target.value==''){
			this.emptySearch(event);
		}else{
		    //TODO:
			this.loadData(event.target.value);
			this.ToggleSearch(true);
		}
    },

	loadData: function(searchtext){
		store.get('search', {'searchtext': searchtext})
    	.then(function(results){
			references = [];
	        results.forEach(function(r){

	            references.push(<SearchResultRow key={r.reference} 
	                type={r.type} docset={r.docset} uri={r.ref_uri}/>)
	        });
			this.setState({results:references});
		}.bind(this));

	},

	ToggleSearch: function(visible){
	// TODO: Refactorizar y pasar la visuañlizacion del triview a dashboard
		if(visible){
			this.props.onSetDisposition({component: 'treeview', action: 'hide'});
			this.props.onSetDisposition({component: 'search', action: 'show'});
		}else{
			this.props.onSetDisposition({component: 'treeview', action: 'show'});
			this.props.onSetDisposition({component: 'search', action: 'hide'});
		}
	},

    emptySearch: function(event){
        this.refs.searchbox.getDOMNode('#txtreference').value='';
        this.setState({results:[]});
		this.ToggleSearch(false);
    },

    render: function(){
		if(this.props.visibility=='hide'){
			cssclass = "half-height collapse";
		}else{
			cssclass = "half-height";
		}

        return(
            <div id="search-view" className={cssclass}>
                <fieldset>
                    <input id="txtreference" ref="searchbox" type="text" className="ry-input-text" name="reference"
                    placeholder="Reference" onKeyUp={this.onKeyUp} defaultValue={this.props.search} />
                    <span className="ry-icon fa-close" onClick={this.emptySearch}></span>
                </fieldset>
					<div id="results">
		                <ul id="resultlist">
		                    {this.state.results}
		                </ul>
		            </div>
            </div>
        )
    }
});
