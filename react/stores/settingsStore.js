var Reflux = require('reflux');
var SettingsActions = require('../actions/settingsActions.js');
var data = require('../utils/data.js');
var Q = require('q');

var settingsStore = Reflux.createStore({

    init: function() {
        this.settings = {};
        this.listenTo(SettingsActions.getSettings, this.onGetSettings);
        this.listenTo(SettingsActions.docsetSelectionChanged, this.onDocsetsSelectionChanged);
    },

    onDocsetsSelectionChanged: function(docset){
        this._loadDocsets().then(function(){
            var wkd = data.getWorkingDocsets();
            var index;
            if(wkd.some(function(doc,i){index=i;return doc.name === docset.name}))
                wkd.splice(index,1);
            else
                wkd.push(docset);
            data.setWorkingDocsets(wkd);
            this._reviewDocsets(this.settings.docsets);
            this.trigger(this.settings);
        }.bind(this)).fail(this.onFail);
    },

    onGetSettings: function(){
        this._loadDocsets().then(function(){this.trigger(this.settings);}.bind(this)).fail(this.onFail);
    },

    onFail: function(error){
        this.trigger(new Error(error));
    },

    _loadDocsets: function(){
        if(this.settings.docsets)
            return Q.fcall(function(){});

        return data.getActiveDocsets()
            .then(function(response){this._reviewDocsets(response['_embedded']['rl:docsets']);}.bind(this));
    },

    _reviewDocsets: function(docsets){
        var workDocsets = data.getWorkingDocsets();
        this.settings.docsets = docsets.map(function(docset){
            docset.active = workDocsets.some(function(work){return work.name === docset.name;});
            return docset;
        });
    }

});

module.exports = settingsStore;

