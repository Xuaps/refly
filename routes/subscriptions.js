var express = require('express');
var router = express.Router();
var api = require('../app/api.js');
var BearerStrategyFactory = require('../app/auth_strategies/bearer.js');
var passport = require('passport');

var maxAge = 86400;
var env = process.env.NODE_ENV || 'development';

router.get('/api/subscriptions/current', passport.authenticate(BearerStrategyFactory.name, {session: false}),
        function(req, res){
            api.getSubscription(req.user)
                .then(send.bind(null, res))
                .catch(manageErrors.bind(null, res));
        });

router.delete('/api/subscriptions/current', passport.authenticate(BearerStrategyFactory.name, {session: false}),
        function(req, res){
            api.cancelSubscription(req.user)
                .then(send.bind(null,res))
                .catch(manageErrors.bind(null, res));
        });

router.put('/api/subscriptions/form', passport.authenticate(BearerStrategyFactory.name, {session: false}),
        function(req, res){
            console.log(req.body);
            api.createSubscription(req.user, req.body.plan, req.body.token)
                .then(send.bind(null,res))
                .catch(manageErrors.bind(null, res));
        });


if ('development' == env) {
    maxAge = 0;
}
var send = function(res, hal){
    res.set('Content-Type', 'application/hal+json');
    res.cacheControl('public', {'maxAge': maxAge});
    res.hal(hal);
};

var manageErrors = function(res,err){
    if(err.name === 'InternalError'){
        res.status(500);
    }else{
        res.status(400);
    }
    res.json({error: err});
};

module.exports = router;
