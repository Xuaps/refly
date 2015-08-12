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
    },

    loadDocsets: function(docset){
        var docsets = JSON.parse(JSON.stringify(settings.getWorkingDocsets()));
        this.trigger({types: undefined, references: undefined, docsets: docsets, selected_docset: this.docset, selected_type: this.type});
    },

    getSingleDocsetByUri: function(docset_uri){
        var docsets = JSON.parse(JSON.stringify(settings.getWorkingDocsets()));
        return docsets.filter(function(doc){ return doc.name.toLowerCase() === docset_uri.toLowerCase().replace(' ', '-');})[0];
    },

    loadTypes: function(docset){
        this.docset = this.getSingleDocsetByUri(docset);
        data.getTypes(this.getSingleDocsetByUri(docset).name).then(function(response){ 
            var types = response['_embedded']['rl:types']; 
            this.trigger({types: types, references: undefined, docsets: undefined, selected_docset: this.docset, selected_type: this.type});
        }.bind(this)).done();
    },

    loadReferencesByType: function(docset, type){
        this.type = type;
        this.docset = this.getSingleDocsetByUri(docset);
        data.getReferences(this.getSingleDocsetByUri(docset).name,type, 1, PAGE_SIZE).then(function (response){
            var references = response['_embedded']['rl:references'];
            this.trigger({types: undefined, references: references, docsets: undefined, selected_docset: this.docset, selected_type: this.type});
        }.bind(this));
    },
    loadReferencesByUri: function(docset, uri){
        this.docset = this.getSingleDocsetByUri(docset);
        data.getReference(docset, uri)
            .then(function(reference){
                this.type = reference.type;
                data.getReferences(this.docset.name,reference.type, 1, PAGE_SIZE).then(function (response){
                    var references = response['_embedded']['rl:references'];
                    this.trigger({types: undefined, references: references, docsets: undefined, selected_docset: this.docset, selected_type: this.type});
                }.bind(this));
        }.bind(this));
    }
});