var Reflux = require('reflux');
var ReferencesActions = require('./actions.js');
var Data = require('../infrastructure/data.js');
var settings = require('../infrastructure/settings.js');
var NOT_FOUND = 'Reference not found!';
var Immutable = require('immutable');

module.exports = Reflux.createStore({
    
    init: function() {
        this._setInitialState();
        this.listenTo(ReferencesActions.searchReference, this.onSearch);
        this.listenTo(ReferencesActions.searchDocset, this.onSearchDocset);
        this.listenTo(ReferencesActions.init, this.onInit);
    },

    onInit: function(doc){
        this._setInitialState();
        this.state = this.state.set('docset', doc);
        this.trigger(this.state);
    },

    _setInitialState: function(){
        this.state = Immutable.Map({results: Immutable.List(), reached_end: false, docset: null, message: undefined}); 
        this.search_history = {search: null, docsets: []};
    },

    onSearch: function(searchtext, page){
        var docsets = this._getDocsets();
        if(this.search_history.search === searchtext && this.search_history.docsets === docsets && this.search_history.pages.indexOf(page)!==-1){
            this.trigger(this.state);
            return;
        }
        Data.searchReference(searchtext, page, docsets)
            .then(function(results){
                var is_new_search = (this.search_history.search!==searchtext || this.search_history.docsets!==docsets);
                if(is_new_search && results['_embedded']['rl:references'].length === 0){
                    this.state = this.state.set('message', NOT_FOUND);
                    this.trigger(this.state);
                    return;
                }
                if(is_new_search){
                    this.search_history = {search: searchtext, docsets: docsets};
                    this.search_history.pages = this.search_history.pages || [];
                }
                this.search_history.pages.push(page);
                this.search_history.reached_end = !results['_links'].next;
                var accumulated_results = (!is_new_search)?this.state.get('results'): Immutable.List();
                accumulated_results = accumulated_results
                    .concat(results['_embedded']['rl:references']
                        .map(function(ref){ return this._addUris(ref);}.bind(this)));
                this.state = this.state.set('results',accumulated_results);
                this.state = this.state.set('reached_end', this.search_history.reached_end);
                this.trigger(this.state);}.bind(this))
            .done();
    },

    _getDocsets: function(){
        if(!this.state.get('docset')){
            return settings.getWorkingDocsets();
        }else{
            return [this.state.get('docset')];
        }
    },

    _addUris: function(ref){
        if(!ref)
            return ref;
        if(ref.uri===undefined){
            return undefined;
        }
        var pos = ref.uri.indexOf('/', 1);
        ref.docset = ref.uri.substring(1,pos);
        ref.ref_uri = ref.uri.substring(pos+1,ref.uri.length);

        return ref;
    },

    onSearchDocset: function(docsetsearch){
        if(docsetsearch){
            Data.getSingleDocset(docsetsearch)
            .then(function(docset){
                if(docset.name)
                    this.state = this.state.set('docset', docset);
                else
                    this.state = this.state.set('docset', null);
                    this.trigger(this.state);
            }.bind(this));
        }else{
            this.state = this.state.set('docset', null);
            this.trigger(this.state);
        }
    },
});
