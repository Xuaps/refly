var Reflux = require('reflux');
var jQuery = require('jquery-browserify');
var DocsetsActions = require('../actions/docsetsActions.js');

var docsetsStore = Reflux.createStore({

    init: function() {
        this.docsets = [];
        this.listenTo(DocsetsActions.getActiveDocsets, this.onGetActiveDocsets);
        this.listenTo(DocsetsActions.getTypes, this.onGetTypes);
        this.listenTo(DocsetsActions.searchReferences, this.onSearchReferences);
    },

    onGetActiveDocsets: function(){
	    jQuery.ajax({
	        url:'/api/docsets?active=true',  
	        method: 'GET'
        }).then(function(results){
            this.docsets = results['_embedded']['rl:docsets'];
            this.trigger(this.docsets);
        }.bind(this)).fail(this.onFail);
    },

    onGetTypes: function(docset){
	    jQuery.ajax({
	        url:'/api/types?docset='+docset,
	        method: 'GET'
	    }).then(function(response){ 
           this.docsets
            .filter(function(doc){ return doc.name === docset; })[0]
            .types = response['_embedded']['rl:types']; 
           this.trigger(this.docsets);
        }.bind(this)).fail(this.onFail);
    },

    onSearchReferences: function(docset, type_name){
	    jQuery.ajax({
	        url:'/api/references?docsets='+docset+'&types='+type_name,
	        method: 'GET'
	    }).then(function (response){
            this.docsets
                .filter(function(doc){ return doc.name === docset;})[0]
                .types.filter(function(type){ return type.name === type_name; })[0]
                .references = response['_embedded']['rl:references'];
            this.trigger(this.docsets);    
        }.bind(this)).fail(this.onFail);
    },

    onFail: function(error){
        this.trigger(new Error(error));
    }
});

module.exports = docsetsStore;
