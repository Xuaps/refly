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

    getUserDocsets: function(){
        return data.getCurrentUser()
        .then(function (user) {
             return data.getUserDocsets(user.email);
        }.bind(this));
    },

    onGetSettings: function(){
        this._loadDocsets().then(function(response){
            this.getUserDocsets()
                .then(function(userresponse){
                    var mydocsets = userresponse['_embedded']['rl:docsets'];
                    if(mydocsets.length==0){
                        mydocsets = settings.getWorkingDocsets();
                    }
                    settings.setWorkingDocsets(mydocsets);
                    this.settings.docsets = this._markactiveDocsets(response['_embedded']['rl:docsets'],mydocsets);
                    this.trigger(this.settings);
                }.bind(this))
                .catch(function(error){
                    if(response != undefined){
                        var mydocsets = settings.getLocalDocsets();
                        this.settings.docsets = this._markactiveDocsets(response['_embedded']['rl:docsets'],mydocsets);
                        settings.setWorkingDocsets(mydocsets);
                    }
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
            return Q.fcall(function(){return {'_embedded':{'rl:docsets': this.settings.docsets}}}.bind(this));

        return data.getActiveDocsets()
    },

    _setUserDocsets: function(){
        return data.getCurrentUser()
        .then(function (user) {
             var workDocsets = settings.getWorkingDocsets();
             settings.setWorkingDocsets(workDocsets);
             var activedocsets = workDocsets.map(function(docset){return docset.name});
             return data.setUserDocset(activedocsets);
        }.bind(this))
        .catch(function(error){
            var workDocsets = settings.getWorkingDocsets();
            settings.setLocalDocsets(workDocsets);
        }.bind(this));

    },

    _markactiveDocsets: function(docsets, activedocsets){        
        return docsets.map(function(docset){
            docset.active = activedocsets.some(function(work){return work.name === docset.name;});
            return docset;
        });
    },
});
