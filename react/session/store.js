var Reflux = require('reflux');
var actions = require('./actions.js');
var data = require('../infrastructure/data.js');
var authentication = require('../infrastructure/authentication.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.status = {};
        this.listenToMany(actions);
    },

    onInit: function() {
        var token = authentication.getAuth();
        if(token){
           this._buildUser();
        }else{
           this._cleanStatus();
           this.trigger(this.status);
        }
    },

    onLoginSuccessful: function(token){
        authentication.setAuth(token);
        return this._buildUser();
    },
    
    onLogOut: function(){
        data.deleteSession().then(function(){
            authentication.setAuth('');
            this._cleanStatus();
            this.trigger(this.status);
        }).fail(this.onFail);
    },
    
    onFail: function(error){
        if(error instanceof Error){
            this.trigger(error);
        }else{
            throw error;
        }
    },

    _buildUser: function(){
        return data.getCurrentUser()
            .then(function(user){
                this.status.user = user;
                this.status.isAuthenticated = true;
                this.trigger(this.status);
            }.bind(this))
            .fail(this.onFail);    
    },

    _cleanStatus: function(){
      this.status = {isAuthenticated: false};
    }
});
