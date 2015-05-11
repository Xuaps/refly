var uuid = require('node-uuid');

module.exports = function(req, res, next){
    if(!req.session)
        throw new Error('You need to initialize some session infrastructure.');

    req.session.id= req.session.id || uuid.v4();
    req.session.timestamp = Date.now();
    if(next)
        next();
};
