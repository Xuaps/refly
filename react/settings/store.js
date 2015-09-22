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
        this.listenTo(SettingsActions.unselectAll, this.onUnselectAll);
        this.listenTo(authentication, this.onGetSettings);
    },

    onDocsetsSelectionChanged: function(docset){
        this._loadDocsets().then(function(){
            var wkd = settings.getWorkingDocsets();
            var index;
            if(wkd.some(function(doc,i){index=i;return doc.name === docset.name}))
                wkd.splice(index,1);
            else
                wkd.push(docset);

            settings.setWorkingDocsets(wkd);
            this._setUserDocsets();
            this.settings.docsets = this._markactiveDocsets(this.settings.docsets, wkd);
            this.trigger(this.settings);
        }.bind(this)).done();
    },

    onGetSettings: function(){
        this._loadDocsets().then(function(response){
            data.getUserDocsets()
                .then(function(userresponse){
                    var mydocsets = userresponse['_embedded']['rl:docsets'];
                    if(mydocsets.length==0){
                        mydocsets = settings.getWorkingDocsets();
                    }
                    if(settings.getLocalDocsets().length === 0){
                        settings.setLocalDocsets(settings.getWorkingDocsets());
                    }
                    settings.setWorkingDocsets(mydocsets);
                    this.settings.docsets = this._markactiveDocsets(response['_embedded']['rl:docsets'],mydocsets);
                    this.trigger(this.settings);
                }.bind(this))
                .fail(function(error){
                    if(response != undefined){
                        var mydocsets = settings.getWorkingDocsets();
                        if(settings.getLocalDocsets().length > 0){
                            mydocsets = settings.getLocalDocsets();
                            settings.setLocalDocsets([]);
                        }
                        this.settings.docsets = this._markactiveDocsets(response['_embedded']['rl:docsets'],mydocsets);
                        settings.setWorkingDocsets(mydocsets);
                    }
                    this.trigger(this.settings);
                }.bind(this))
        }.bind(this)).done();
    },

    onUnselectAll: function(){
        this._loadDocsets().then(function(){
            var wkd = [];
            settings.setWorkingDocsets(wkd);
            this._setUserDocsets();
            this.settings.docsets = this._markactiveDocsets(this.settings.docsets, wkd);
            this.trigger(this.settings);
        }.bind(this)).done();
    },

    onSearchDocset: function(searchtext){
        var newdocsets = this.settings.docsets.filter(function(docset){if(docset.name.toLowerCase().indexOf(searchtext.toLowerCase()) != -1){return docset;}});
        this.trigger({docsets: newdocsets});
    },

    _loadDocsets: function(){
        if(this.settings.docsets)
            return Q.fcall(function(){return {'_embedded':{'rl:docsets': this.settings.docsets}}}.bind(this));

        return data.getActiveDocsets()
    },

    onUnSelectAll: function(){
        var workDocsets = [];
    },

    _setUserDocsets: function(){
        var workDocsets = settings.getWorkingDocsets();
        var activedocsets = workDocsets.map(function(docset){return docset.name});
        var myprom = data.setUserDocsets(activedocsets);
        myprom.then(function (user) {
             return true;
        }.bind(this));
    },

    _markactiveDocsets: function(docsets, activedocsets){        
        return docsets.map(function(docset){
            docset.active = activedocsets.some(function(work){return work.name === docset.name;});
            return docset;
        });
    },
});
