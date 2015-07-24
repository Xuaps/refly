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
            this.status = {isAuthenticated: true, sent: false, errors: []};
            this.trigger(this.status);
        }else{
            this.status = {isAuthenticated: false, sent: false, errors: []};
            this.trigger(this.status);
        }
    },

    validate: function(email, message){
        var errors = [];
        var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(message==''){
            errors.push('emptymessage');
        }
        if((email == '' || !re.test(email)) && !this.status.isAuthenticated){
          errors.push('notvalidemail');
        }
        return errors;
    },
    onSendMail: function(name, email, message){
        var errors = this.validate(email, message);
        if(errors.length==0){
            if(!this.blocked){
                this.blocked = true;
                data.mailSending(name, email, message).then(function(response){
                    if(response.message == 'message sent'){
                        this.status = {isAuthenticated: this.status.isAuthenticated, sent: true, errors: []};
                        this.trigger(this.status);
                        this.blocked = false;
                        this._cleanStatus();
                    }
                }.bind(this))
                .fail(this.onFail);
            }
        }else{
            this.status = {isAuthenticated: this.status.isAuthenticated, sent: false, errors: errors};
            this.trigger(this.status);
            this.blocked = false;
        }
    },

    _cleanStatus: function(){
      this.status = {isAuthenticated: false, sent: false, errors: []};
    },

    onFail: function(error){
        this.blocked = true;
    },
});
