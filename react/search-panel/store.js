var Reflux = require('reflux');
var ReferencesActions = require('./actions.js');
var Data = require('../utils/data.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.results = [];
        this.search_history = {};
        this.listenTo(ReferencesActions.searchReference, this.onSearch);
        this.listenTo(ReferencesActions.markReference, this.onMarkReference);
    },

    onMarkReference: function(uri){
       this.results.forEach(function(ref){
           ref.marked = (ref.uri === uri);
       });
       this.trigger(this._getResult());
    },

    onSearch: function(searchtext, page){
        if(this.search_history.search === searchtext && this.search_history.pages.indexOf(page)!==-1){
            this.trigger(this._getResult());
            return;
        }

        Data.searchReference(searchtext, page)
            .then(function(results){
                var is_new_search = this.search_history.search!==searchtext;
                this.search_history = (!is_new_search)? this.search_history : {search: searchtext}; this.search_history.pages = this.search_history.pages || [];
                this.search_history.pages.push(page);
                this.search_history.reached_end = !results['_links'].next;
                this.results = (!is_new_search)?this.results: [];
                this.results = this.results
                    .concat(results['_embedded']['rl:references']
                        .map(function(ref){ return this._addUris(ref);}.bind(this)));
                this.trigger(this._getResult());}.bind(this))
            .done();
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
        return { results: this.results, reached_end: this.search_history.reached_end };
    },

});
