var Reflux = require('reflux');
var ReferencesActions = require('./actions.js');
var Data = require('../infrastructure/data.js');
var settings = require('../infrastructure/settings.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.results = [];
        this.search_history = {};
        this.docsets = [];
        this.listenTo(ReferencesActions.searchReference, this.onSearch);
        this.listenTo(ReferencesActions.markReference, this.onMarkReference);
        this.listenTo(ReferencesActions.searchDocset, this.onSearchDocset);
    },

    onMarkReference: function(uri){
       this.results.forEach(function(ref){
           ref.marked = (ref.uri === uri);
       });
       this.trigger(this._getResult());
    },

    onSearch: function(searchtext, page){
        var docsets = this._getDocsets();
        if(this.search_history.search === searchtext && this.search_history.docsets === docsets && this.search_history.pages.indexOf(page)!==-1){
            this.trigger(this._getResult());
            return;
        }
        Data.searchReference(searchtext, page, docsets)
            .then(function(results){
                var is_new_search = (this.search_history.search!==searchtext || this.search_history.docsets!==docsets);
                this.search_history = (!is_new_search)? this.search_history : {search: searchtext, docsets: docsets}; this.search_history.pages = this.search_history.pages || [];
                this.search_history.pages.push(page);
                this.search_history.reached_end = !results['_links'].next;
                this.results = (!is_new_search)?this.results: [];
                this.results = this.results
                    .concat(results['_embedded']['rl:references']
                        .map(function(ref){ return this._addUris(ref);}.bind(this)));
                this.trigger(this._getResult());}.bind(this))
            .done();
    },
    onSearchDocset: function(docsetsearch){
        if(docsetsearch!=null){
            Data.getSingleDocset(docsetsearch)
            .then(function(docset){
                if(docset.name!=undefined)
                    this.docsets = [docset]
                else
                    this.docsets = [];
                    this.trigger(this._getResult());
            }.bind(this));
        }else{
            this.docsets = [];
            this.trigger(this._getResult());
        }
    },


    _getDocsets: function(){
        if(this.docsets == []){
            return settings.getWorkingDocsets();
        }else{
            return this.docsets;
        }
    },

    _addUris: function(ref){
        if(!ref)
            return ref;
        if(ref.uri==undefined){
            return undefined;
        }
        var pos = ref.uri.indexOf('/', 1);
        ref.docset = ref.uri.substring(1,pos);
        ref.ref_uri = ref.uri.substring(pos+1,ref.uri.length);

        return ref;
    },

    _getResult: function(){
        return { results: this.results, reached_end: this.search_history.reached_end, docset: this.docsets[0] || null };
    },

});
