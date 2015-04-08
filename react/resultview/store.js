var Reflux = require('reflux');
var actions = require('./actions.js');
var Data = require('../utils/data.js');
var ReferenceNotFoundError = require('../errors/reference-not-found.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.listenToMany(actions);
    },

    onLoadReference: function(docset, uri){
        Data.getReference(docset, uri)
            .then(function(reference){
                this.trigger(reference);
            }.bind(this)).fail(this.onFail);
    },
    
    onFail: function(error){
        if(error instanceof ReferenceNotFoundError){
            this.trigger(null);
        }else{
            this.trigger(new Error(error));
        }
    },
});
