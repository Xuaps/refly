var Reflux = require('reflux');
var actions = require('./actions.js');
var data = require('../infrastructure/data.js');
var authentication = require('../infrastructure/authentication.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.status = {isAuthenticated: false};
        this.listenToMany(actions);
    },

    onInit: function() {
        var token = authentication.getAuth();
        if(token){
           this._buildUser(token);
        }else{
           this._cleanStatus();
           this.trigger(this.status);
        }
    },

    onLoginSuccessful: function(token){
        authentication.setAuth(token);
        return this._buildUser(token);
    },
    
    onLogOut: function(){
       data.deleteSession().then(function(){
           authentication.setAuth('');
           this._cleanStatus();
           this.trigger(this.status);
       }.bind(this)).fail(this.onFail);
    },
    
    onFail: function(error){
        if(error.name === 'AuthenticationRequiredError'){
            this.status.isAuthenticated = false;
        }else{
            this.status.error = error;
        }
        this.trigger(this.status);
    },

    _buildUser: function(token){
        if(token === this.token){
            this.trigger(this.status);
            return;
        }

        return data.getCurrentUser()
            .then(function(user){
                this.status.user = user;
                this.status.isAuthenticated = true;
                this.token = token;
                this.trigger(this.status);
            }.bind(this))
            .fail(this.onFail);    
    },

    _cleanStatus: function(){
      this.token = undefined;
      this.status.error = undefined;
      this.status.isAuthenticated = false;
      this.status.user = undefined;
    }
});
