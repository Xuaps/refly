var Reflux = require('reflux');
var jQuery = require('jquery-browserify');
var DocsetsActions = require('../actions/docsetsActions.js');
var proxy = require('../utils/proxy.js');
var local = require('store2');

var docsetsStore = Reflux.createStore({

    init: function() {
        this.docsets = [];
        this.listenTo(DocsetsActions.getActiveDocsets, this.onGetActiveDocsets);
        this.listenTo(DocsetsActions.getTypes, this.onGetTypes);
        this.listenTo(DocsetsActions.searchReferences, this.onSearchReferences);
    },

    onGetActiveDocsets: function(){
        if(this.docsets.length>0){
            this.trigger(this.docsets);
            return;
        }

        var setted_docsets = local.get('setted_docsets');
        if(setted_docsets){
            this.docsets = setted_docsets;
            this.trigger(this.docsets);
        }else{
            proxy.getDefaultDocsets().then(function(results){
                this.docsets = results['_embedded']['rl:docsets'];
                local.set('setted_docsets', this.docsets);
                this.trigger(this.docsets);
            }.bind(this)).fail(this.onFail);
        }
    },

    onGetTypes: function(docset){
        var active_docset = this.docsets
            .filter(function(doc){ return doc.name === docset; })[0];
        if(active_docset.types){
            this.trigger(this.docsets);
            return;
        }
        proxy.getTypes(docset).then(function(response){ 
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
	    proxy.getReferences(docset, type_name, page).then(function (response){
            
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
