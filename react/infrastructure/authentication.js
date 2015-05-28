var AUTH = 'auth';
var defaultAuth = 
    {
        token: ''
    };

var Reflux = require('reflux');
var Configry = require('configry');
var Authentication = Reflux.createStore({
    init: function() {
        this.config = new Configry(defaultAuth, [AUTH]);
    },
    
    getAuth:  function(){
        return this.config.get(AUTH);
    },

    setAuth:  function(token){
        var auth = {'token': token};
        this.config.set(AUTH, auth, true);
        this.trigger(auth);
    }
});

module.exports = Authentication;

