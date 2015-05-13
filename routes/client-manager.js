var uuid = require('node-uuid');

module.exports = function(req, res, next){
    if(!req.session)
        throw new Error('You need to initialize some session infrastructure.');

    req.session.client_id= req.session.client_id || uuid.v4();
    if(next)
        next();
};
