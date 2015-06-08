var express = require('express');
var router = express.Router();
var api = require('../app/api.js');
var BearerStrategyFactory = require('../app/auth_strategies/bearer.js');
var passport = require('passport');

var maxAge = 86400;
var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
    maxAge = 0;
}
var send = function(res, hal){
    res.set('Content-Type', 'application/hal+json');
    res.cacheControl('public', {'maxAge': maxAge});
    res.hal(hal);
};

router.get('/api/subscription/current', passport.authenticate(BearerStrategyFactory.name, {session: false}),
        function(req, res){
        });

router.put('/api/subscription/form', passport.authenticate(BearerStrategyFactory.name, {session: false}),
        function(req, res){
            api.createSubscription(req.token, req.plan)
                .then(send.bind(null,res)).done();
        });

module.exports = router;
