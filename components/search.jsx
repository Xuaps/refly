/** @jsx React.DOM */
var React = require('react');
var SearchResult = require('./search_result.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {results: []};
    },

    onKeyUp: function(event){
        this.setState({results:[<SearchResult key="juas" type="function" docset="node" />]})
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
