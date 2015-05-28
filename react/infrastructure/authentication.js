var AUTH = 'token';
var defaultAuth = '';

var Reflux = require('reflux');
var ls = require('local-storage');
var Authentication = Reflux.createStore({
    init: function() {
        if(ls.get(AUTH)===null){
            ls.set(AUTH, defaultAuth);
        }
    },
    
    getAuth:  function(){
        return ls.get(AUTH);
    },

    setAuth:  function(token){
        ls.set(AUTH, token);
        this.trigger(token);
    }
});

module.exports = Authentication;

