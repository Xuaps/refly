var React = require('react');
var Router = require('react-router');
DocsetSearch = React.createClass({

    getInitialState: function() {
        return {searchtext: ''};
    },

    render: function() {
        var content;
        content = <input type="text" id="docsetsearch" value={this.state.searchtext} />
        return (content);
    },

    onKeyUp: function(event){
        event.persist();
        this.setState({searchtext: event.target.value});
    },
});
module.exports = DocsetSearch
