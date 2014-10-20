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
            url: '/api/references?reference=' + event.target.value,
            method: 'get'
        }).done(function(results) {
            results.forEach(function(r){
                var pos = r.uri.indexOf('/', 1);
                var docset = r.uri.substring(1,pos);
                var ref = r.uri.substring(pos+1,r.uri.length);

                references.push(<SearchResultRow key={r.reference} 
                    type={r.type} docset={docset} uri={ref}/>)
            });
            this.setState({results:references})
        });
    },

    emptySearch: function(event){
        this.refs.search_box.getDOMNode('#txtreference').value='';
        this.setState({results:[]})
    },

    render: function(){
        return(
            <div id="search-view" className="half-height">
                <fieldset>
                    <input id="txtreference" ref="search_box" type="text" className="ry-input-text" name="reference"
                    placeholder="Reference" autoFocus onKeyUp={this.onKeyUp} defaultValue={this.props.search} />
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
