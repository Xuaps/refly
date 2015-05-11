var Toll = function (condition, message){
    this.condition = condition;
    this.message = message;
};

Toll.prototype.activate = function(){
        return function(req, res, next){
            if(!this.condition()){
                console.log('juas');
                res.status(402);
                res.set('Content-Type', 'application/hal+json');
                res.send({message: this.message});
            } else { next(); }
        }.bind(this);
};

module.exports = Toll;
