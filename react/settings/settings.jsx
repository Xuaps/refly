
/** @jsx React.DOM */

var React = require('react')
var store = require('./store.js');
var actions = require('./actions.js');
var Reflux = require('reflux');
var Docsets = require('./docsets.jsx');
var SearchBox = require('./searchbox.jsx');

var Settings = React.createClass({
    mixins: [Reflux.connect(store,"settings")],
    
    getInitialState: function() {
        return {settings: {docsets: []}};
    },

    componentWillMount: function(){
        actions.getSettings();
    },

    render: function(){
        return (<div className="_settings panel panel-default">
            <div className="panel-heading">
            <div className="input-container">
                <SearchBox key="csearchbox" onKeyUp={this.onSearchDocset}/>
            </div>
            </div>
            <div className="clear"></div>
            <div className="panel-body">
                <Docsets key={'docsets-list'} docsets={this.state.settings.docsets} onClick={this.onDocsetSelectionChanged} />
            </div>
            <div className="clear"></div>
            </div>);
    },

    onDocsetSelectionChanged: function(docset){
        actions.docsetSelectionChanged(docset);
    },

    onSearchDocset: function(searchtext){
        actions.searchDocset(searchtext);
    }

});

module.exports = Settings;

