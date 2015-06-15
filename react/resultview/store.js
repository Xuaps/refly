var Reflux = require('reflux');
var actions = require('./actions.js');
var PaymentRequiredError = require('../errors/payment-required.js');
var Data = require('../infrastructure/data.js');
var blocked = false;

module.exports = Reflux.createStore({
    
    init: function() {
        this.listenToMany(actions);
    },

    onLoadReference: function(docset, uri){
        if(this.blocked){
            new PaymentRequiredError();
        } else {
            Data.getReference(docset, uri)
                .then(function(reference){
                    this.trigger(reference);
                }.bind(this)).fail(this.onFail).done();
        }
    },

    onCompleteBlockingPeriod: function(){
        this.blocked = false;
    },

    onFail: function(error){
        if(error.name =='PaymentRequiredError')
            this.blocked = true;
        if(error instanceof Error){
            this.trigger(error);
        }else{
            throw error;
        }
    },
});
