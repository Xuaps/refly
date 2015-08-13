var canonLib = require('canonical-host');
var config = require('config');
var canon = canonLib(config.serverConfig.canonicalHost, statusCode=301);

module.exports = function(req,res,next){
    if(!canon(req,res)) next();
};
