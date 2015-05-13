var Users = require('../app/users.js');

module.exports = function(req, res, next){
    var users = new Users();
    var user = users.getBySessionId(req.session.client_id);
    if(user){ req.user = user; }
    else{ req.user = users.createNewAnonymousUser(req.session.client_id); }

    if(next)
        next();
};

