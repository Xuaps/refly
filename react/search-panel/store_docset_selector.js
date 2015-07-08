var Reflux = require('reflux');
var DocsetsActions = require('./actions_docset_selector.js');
var Data = require('../infrastructure/data.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.docsets = [];
        this.listenTo(DocsetsActions.searchDocset, this.onSearchDocset);
    },

    onSearchDocset: function(docsetsearch){
        if(docsetsearch != null){
            Data.getSingleDocset(docsetsearch)
            .then(function(docset){
                this.trigger(docset);
            }.bind(this))
            .fail(function(error){
                var p = error;
                console.log(error);
            });
        }else{
            this.trigger(null);
        }
    }
});
