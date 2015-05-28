var Reflux = require('reflux');
var actions = require('./actions.js');
var Data = require('../infrastructure/data.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.listenToMany(actions);
    },

    onLoadReference: function(docset, uri){
        Data.getReference(docset, uri)
            .then(function(reference){
                this.trigger(reference);
            }.bind(this)).fail(this.onFail).done();
    },
    
    onFail: function(error){
        if(error instanceof Error){
            this.trigger(error);
        }else{
            throw error;
        }
    },
});
