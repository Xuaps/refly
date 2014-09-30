/** @jsx React.DOM */
var React = require('react');
var SearchResultRow = require('./search_result_row.jsx');
var $ = require('jquery-browserify');

module.exports = React.createClass({
    getInitialState: function() {
        return {results: []};
    },

    onKeyUp: function(event){
        //TODO:
        references = [];
        $.ajax({
            context: this,
            url: '/api/search?reference=' + event.target.value,
            method: 'get'
        }).done(function(results) {
            results.forEach(function(r){
                references.push(<SearchResultRow key={r.reference} 
                    type={r.type} docset={r.docset} uri={r.uri.substring(1, r.uri.length)}/>)
            });
            this.setState({results:references})
        });
    },

    render: function(){
        return(
            <div id="search-view">
                <fieldset>
                    <div id="ry-search">
                        <input id="txtreference" type="text" className="ry-input-text" name="reference"
                        placeholder="Reference" autoFocus onKeyUp={this.onKeyUp} defaultValue={this.props.search} />
                        <span className="ry-icon fa-close"></span>
                    </div>
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
