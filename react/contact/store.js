var Reflux = require('reflux');
var actions = require('./actions.js');
var data = require('../infrastructure/data.js');
var authentication = require('../infrastructure/authentication.js');


module.exports = Reflux.createStore({

    init: function() {
        this.status = {};
        this.listenToMany(actions);
        var token = authentication.getAuth();
        if(token!='' && token!=null){
            this.status.isAuthenticated = true;
            this.trigger(this.status);
        }else{
            this.status.isAuthenticated = false;
            this.trigger(this.status);
        }
    },

    onSendMail: function(name, email, message){
        if(!this.blocked){
            this.blocked = true;
            data.mailSending(name, email, message).then(function(response){
                if(response.message == 'message sent'){
                    this.status.sent = true;
                    this.trigger(this.status);
                    this.blocked = false;
                }
            }.bind(this))
            .fail(this.onFail);
        }
    },

    _cleanStatus: function(){
      this.status = {isAuthenticated: false};
      this.trigger(this.status);
    },

    onFail: function(error){
        this.blocked = true;
    },
});
