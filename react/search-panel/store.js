var Reflux = require('reflux');
var jQuery = require('jquery-browserify');
var ReferencesActions = require('./actions.js');
var Data = require('../utils/data.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.results = [];
        this.search_history = [];
        this.listenTo(ReferencesActions.searchReference, this.onSearch);
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

    onSearch: function(searchtext, page){
        if(this.search_history[searchtext] && this.search_history[searchtext].pages.indexOf(page)!==-1){
            this.trigger(this._getResult(searchtext));
            return;
        }

        Data.searchReference(searchtext, page)
            .then(function(results){
                this.search_history[searchtext] = this.search_history[searchtext] || {};
                this.search_history[searchtext].pages = this.search_history[searchtext].pages || [];
                this.search_history[searchtext].pages.push(page);
                this.search_history[searchtext].reached_end = !results['_links'].next;

                this.results[searchtext] = this.results[searchtext] || [];
                this.results[searchtext] = this.results[searchtext]
                    .concat(results['_embedded']['rl:references']
                        .map(function(ref){ return this._addUris(ref);}.bind(this)));
                this.trigger(this._getResult(searchtext));}.bind(this))
            .fail(this.onFail);
    },

    _getResult: function(pattern){
        return { results: this.results[pattern], reached_end: this.search_history[pattern].reached_end };
    },

    onFail: function(error){
        this.trigger(new Error(error));
    }
});
