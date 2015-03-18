var Reflux = require('reflux');
var DocsetsActions = require('../actions/docsetsActions.js');
var data = require('../utils/data.js');
var settings = require('../utils/settings.js');

var docsetsStore = Reflux.createStore({

    init: function() {
        this.docsets = [];
        this.listenTo(DocsetsActions.getActiveDocsets, this.onGetActiveDocsets);
        this.listenTo(DocsetsActions.getTypes, this.onGetTypes);
        this.listenTo(DocsetsActions.searchReferences, this.onSearchReferences);
    },

    onGetActiveDocsets: function(){
        this.docsets = JSON.parse(JSON.stringify(settings.getWorkingDocsets()));
        this.trigger(this.docsets);
    },

    onGetTypes: function(docset){
        var active_docset = this.docsets
            .filter(function(doc){ return doc.name === docset; })[0];
        if(active_docset.types){
            this.trigger(this.docsets);
            return;
        }
        data.getTypes(docset).then(function(response){ 
            active_docset.types = response['_embedded']['rl:types']; 
           this.trigger(this.docsets);
        }.bind(this)).fail(this.onFail);
    },

    onSearchReferences: function(docset, type_name, page){
        var node = this.docsets
            .filter(function(doc){ return doc.name === docset;})[0]
            .types.filter(function(type){ return type.name === type_name; })[0];
        if(node.references && !page){
            this.trigger(this.docsets);
            return;
        }
        
        page = page || 1;
	    data.getReferences(docset, type_name, page).then(function (response){
            
            node.references = node.references || [];
            node.references = node.references.concat(response['_embedded']['rl:references']);
            this.trigger(this.docsets);    

            return response['_links'].next?this.onSearchReferences(docset, type_name, page+1):undefined;
        }.bind(this)).fail(this.onFail);
    },

    onFail: function(error){
        this.trigger(new Error(error));
    }
});

module.exports = docsetsStore;
