var Users = require('../app/users.js');

module.exports = function(req, res, next){
    var users = new Users();
    users.getBySessionId(req.session.client_id)
        .then(function(user){
                if(user){ req.user = user; }
                else{ return users.createNewAnonymousUser(req.session.client_id).then(function(user){req.user = user;}); }
        }).then(function(){
            if(next)
                next();
        });
};

