var Reflux = require('reflux');
var SettingsActions = require('./actions.js');
var data = require('../infrastructure/data.js');
var settings = require('../infrastructure/settings.js');
var authentication = require('../infrastructure/authentication.js');
var Q = require('q');

module.exports = Reflux.createStore({

    init: function() {
        this.settings = {};
        this.listenTo(SettingsActions.getSettings, this.onGetSettings);
        this.listenTo(SettingsActions.docsetSelectionChanged, this.onDocsetsSelectionChanged);
        this.listenTo(SettingsActions.searchDocset, this.onSearchDocset);
    },

    onDocsetsSelectionChanged: function(docset){
        this._loadDocsets().then(function(){
            var wkd = settings.getWorkingDocsets();
            var index;
            if(wkd.some(function(doc,i){index=i;return doc.name === docset.name}))
                wkd.splice(index,1);
            else
                wkd.push(docset);
            this._setUserDocsets(this.settings.docsets);
            settings.setWorkingDocsets(wkd);
            this._marklocalDocsets(this.settings.docsets);
            this.trigger(this.settings);
        }.bind(this)).done();
    },

    onGetSettings: function(){
        this._loadDocsets().then(function(response){
            this._loadMyDocsets()
                .then(function(userresponse){
                    this.settings.docsets = this._markactiveDocsets(response['_embedded']['rl:docsets'],userresponse['_embedded']['rl:docsets']);
                    settings.setWorkingDocsets(userresponse['_embedded']['rl:docsets']);
                    this.trigger(this.settings);
                }.bind(this))
                .catch(function(error){
                    this.settings.docsets = this._marklocalDocsets(response['_embedded']['rl:docsets']);
                    this.trigger(this.settings);
                }.bind(this))
        }.bind(this)).done();
    },

    onSearchDocset: function(searchtext){
        var newdocsets = this.settings.docsets.filter(function(docset){if(docset.name.toLowerCase().indexOf(searchtext.toLowerCase()) != -1){return docset;}});
        this.trigger({docsets: newdocsets});

    },

    _loadDocsets: function(){
        if(this.settings.docsets)
            return Q.fcall(function(){});

        return data.getActiveDocsets()
    },

    _loadMyDocsets: function(){
        return data.getCurrentUser()
        .then(function (user) {
             return data.getUserDocsets(user.email);
        }.bind(this));
    },

    _setUserDocsets: function(docsets){
        var activedocsets = [];
        return data.getCurrentUser()
        .then(function (user) {
            activedocsets = docsets.filter(function(docset){
                if(docset.active){
                    return true;
                }else{
                    return false;
                }
            }).map(function(docset){return docset.name});
             return data.setUserDocsets(activedocsets);
        }.bind(this));
    },
    _marklocalDocsets: function(docsets){
        var workDocsets = settings.getWorkingDocsets();
        return this._markactiveDocsets(docsets, workDocsets);
    },

    _markactiveDocsets: function(docsets, activedocsets){
        
        return docsets.map(function(docset){
            docset.active = activedocsets.some(function(work){return work.name === docset.name;});
            return docset;
        });
    },
});
