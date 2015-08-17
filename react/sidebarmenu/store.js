var Reflux = require('reflux');
var MenuActions = require('./actions.js');
var data = require('../infrastructure/data.js');
var settings = require('../infrastructure/settings.js');
var PAGE_SIZE = 800;
module.exports = Reflux.createStore({

    init: function() {
        this.listenTo(MenuActions.loadDocsets, this.loadDocsets);
        this.listenTo(MenuActions.loadTypes, this.loadTypes);
        this.listenTo(MenuActions.loadReferencesByUri, this.loadReferencesByUri);
        this.listenTo(MenuActions.loadReferencesByType, this.loadReferencesByType);
        this.listenTo(settings, this.updateDocsets);
        this.menu_history = {docset:{name:undefined}};
        this.references = [];
    },

    updateDocsets: function(){
        if(this.currentpanel=="docsets")
            this.loadDocsets();
    },
    loadDocsets: function(){
        var docsets = JSON.parse(JSON.stringify(settings.getWorkingDocsets()));
        this.docsets = docsets.concat(this.docsets)
        this.currentpanel = "docsets";
        this.trigger({types: undefined, references: undefined, docsets: docsets, selected_docset: this.docset, selected_type: this.type, reached_end: this.menu_history.reached_end});
    },

    loadTypes: function(docset){
        data.getSingleDocset(docset).then(function(docsetresponse){
            this.docset = docsetresponse;
            data.getTypes(this.docset.name).then(function(response){ 
                var types = response['_embedded']['rl:types']; 
                this.currentpanel = "types";
                this.trigger({types: types, references: undefined, docsets: undefined, selected_docset: this.docset, selected_type: this.type, reached_end: this.menu_history.reached_end});
            }.bind(this)).done();
        }.bind(this));
    },

    loadReferencesByType: function(docset, type, page){
        this.type = type;
        data.getSingleDocset(docset).then(function(docsetresponse){
            this.docset = docsetresponse;
            data.getReferences(this.docset.name,type, page, PAGE_SIZE).then(function (response){
                var references = response['_embedded']['rl:references'];
                if(this.menu_history.docset.name != this.docset.name || this.menu_history.type != this.type){
                    this.menu_history.docset = this.docset;
                    this.menu_history.type = this.type;
                    this.references = [];
                }
                this.menu_history.reached_end = !response['_links'].next;
                this.references = this.references.concat(references);
                this.currentpanel = "references";
                this.trigger({types: undefined, references: this.references, docsets: undefined, selected_docset: this.docset, selected_type: this.type, reached_end: this.menu_history.reached_end});
            }.bind(this));
        }.bind(this));
    },

    loadReferencesByUri: function(docset, uri, page){
        this.uri = uri;
        data.getSingleDocset(docset).then(function(docsetresponse){
            this.docset = docsetresponse;
            data.getReference(docset, uri)
                .then(function(reference){
                    this.type = reference.type;
                    data.getReferences(this.docset.name,reference.type, page, PAGE_SIZE).then(function (response){
                        var references = response['_embedded']['rl:references'];
                        if(this.menu_history.docset.name != this.docset.name || this.menu_history.uri != this.uri){
                            this.menu_history.docset = this.docset;
                            this.menu_history.type = this.type;
                            this.menu_history.uri = this.uri;
                            this.references = [];
                        }
                        this.menu_history.reached_end = !response['_links'].next;
                        this.references = this.references.concat(references);
                        this.currentpanel = "references";
                        this.trigger({types: undefined, references: this.references, docsets: undefined, selected_docset: this.docset, selected_type: this.type, reached_end: this.menu_history.reached_end});
                    }.bind(this));
            }.bind(this));
        }.bind(this));
    }
});