var pathToRegexp = require('path-to-regexp');

var Toll = function (routes, condition, message){
    this.routes = routes;
    this.condition = condition;
    this.message = message;
};

Toll.prototype._isTheRoute = function(route){
    var exclusions = this.routes.exclude || [];

    return pathToRegexp(this.routes.route).test(route) &&
        !exclusions.some(function(ex){ return pathToRegexp(ex).test(route);});
};

Toll.prototype.activate = function(){
        return function(req, res, next){ 
            if(this._isTheRoute(req.originalUrl) && !this.condition()){
                res.status(402);
                res.set('Content-Type', 'application/hal+json');
                res.send({message: this.message});
            } else { next(); }
        }.bind(this);
};

module.exports = Toll;
