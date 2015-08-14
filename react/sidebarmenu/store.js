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
        this.reached_end = true;
    },

    loadDocsets: function(docset){
        var docsets = JSON.parse(JSON.stringify(settings.getWorkingDocsets()));
        this.trigger({types: undefined, references: undefined, docsets: docsets, selected_docset: this.docset, selected_type: this.type, reached_end: this.reached_end});
    },

    loadTypes: function(docset){
        data.getSingleDocset(docset).then(function(docsetresponse){
            this.docset = docsetresponse;
            data.getTypes(this.docset.name).then(function(response){ 
                var types = response['_embedded']['rl:types']; 
                this.trigger({types: types, references: undefined, docsets: undefined, selected_docset: this.docset, selected_type: this.type, reached_end: this.reached_end});
            }.bind(this)).done();
        }.bind(this));
    },

    loadReferencesByType: function(docset, type, page){
        this.type = type;
        data.getSingleDocset(docset).then(function(docsetresponse){
            this.docset = docsetresponse;
            data.getReferences(this.docset.name,type, page, PAGE_SIZE).then(function (response){
                var references = response['_embedded']['rl:references'];
                this.reached_end = !response['_links'].next;
                this.trigger({types: undefined, references: references, docsets: undefined, selected_docset: this.docset, selected_type: this.type, reached_end: this.reached_end});
            }.bind(this));
        }.bind(this));
    },

    loadReferencesByUri: function(docset, uri, page){
        data.getSingleDocset(docset).then(function(docsetresponse){
            this.docset = docsetresponse;
            data.getReference(docset, uri)
                .then(function(reference){
                    this.type = reference.type;
                    data.getReferences(this.docset.name,reference.type, page, PAGE_SIZE).then(function (response){
                        var references = response['_embedded']['rl:references'];
                        this.reached_end = !response['_links'].next;
                        this.trigger({types: undefined, references: references, docsets: undefined, selected_docset: this.docset, selected_type: this.type, reached_end: this.reached_end});
                    }.bind(this));
            }.bind(this));
        }.bind(this));
    }
});