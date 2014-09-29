/** @jsx React.DOM */
var React = require('react')
var Search = require('./search.jsx')

module.exports = React.createClass({
    render: function(){
        return(
            <div id="left-pane">
                <Search search={this.props.search}/>
            </div>
        )
    }
});
