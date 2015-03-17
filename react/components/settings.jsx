
/** @jsx React.DOM */

var React = require('react')
var store = require('../stores/settingsStore.js');
var actions = require('../actions/settingsActions.js');
var Reflux = require('reflux');
var Docsets = require('./docsets.jsx');

var Settings = React.createClass({
    mixins: [Reflux.connect(store,"settings")],
    
    getInitialState: function() {
        return {settings: {docsets: []}};
    },

    componentWillMount: function(){
        actions.getSettings();
    },

    render: function(){
        return (
            <Docsets key={'docsets-list'} docsets={this.state.settings.docsets} onClick={this.onDocsetSelectionChanged} />
            );
    },

    onDocsetSelectionChanged: function(docset){
        actions.docsetSelectionChanged(docset);
    }

});

module.exports = Settings;

