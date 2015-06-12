var Reflux = require('reflux');
var actions = require('./actions.js');
var data = require('../infrastructure/data.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.status = {};
        this.listenToMany(actions);
    },

    onInit: function(){
        data.getSubscription()
            .then(function(subscription){
                this.trigger({ "subscription": subscription });
            }).fail(this.fail);
    },

    fail: function(err){
        if(err.name === 'AuthenticationRequiredError'){
            this.status.isAuthenticated = false;
        }else{
            this.status.err = err;
        }
        this.trigger(this.status);
    }
});

