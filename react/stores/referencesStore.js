var Reflux = require('reflux');
var jQuery = require('jquery-browserify');
var ReferencesActions = require('../actions/referencesActions.js');

var referencesStore = Reflux.createStore({
    
    init: function() {
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

    _addUrisToReferences: function(res){
        var references = res['_embedded']['rl:references']?res['_embedded']['rl:references']:res['_embedded']['rl:hierarchy'];
        if(!references)
            return references;

        return references.map(this._addUris);
    },

    onSearch: function(filters){
        jQuery.ajax({
            url:'/api/references' 
                + '?name=' + filters.searchtext
                + '&page=' + filters.page,
            method: 'GET'
        }).then(this.onComplete).fail(onFail);
    },

    onComplete: function(results){
        this.trigger(this._addUrisToReferences(results));
    },

    onFail: function(error){
        this.trigger(new Error(error));
    }
});

module.exports = referencesStore;
