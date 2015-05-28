var Reflux = require('reflux');
var actions = require('./actions.js');
var data = require('../infrastructure/data.js');
var authentication = require('../infrastructure/authentication.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.status = {};
        this.listenToMany(actions);
    },

    onLoginSuccessful: function(token){
        authentication.setAuth(token);
        data.getCurrentUser()
            .then(function(user){
                this.status.user = user;
                this.status.isAuthenticated = true;
                this.trigger(this.status);
            }.bind(this))
            .fail(this.onFail);    
    },
    
    onLogOut: function(){
        this.trigger();
    },
    
    onFail: function(error){
        if(error instanceof Error){
            this.trigger(error);
        }else{
            throw error;
        }
    },
});
