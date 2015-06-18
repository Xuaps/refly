module.exports.ask = function(condition, message){
        return function(req, res, next){ 
            if(!condition(req)){
                res.status(402);
                res.set('Content-Type', 'application/hal+json');
                res.send({"message": message});
            } else { next(); }
        };
};
