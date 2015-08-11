var express = require('express');
var router = express.Router();
var api = require('../app/api.js');
var passport = require('passport');
var BearerStrategyFactory = require('../app/auth_strategies/bearer.js');
var toll = require('./express-toll.js');
var random_values = require('../app/random-values.js');

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
router.get('/api', function(req, res){
    send.bind(null,res)(api.entry());
});
router.get('/api/references/:docset/:uri(*)/c&b', function(req, res){
    api.get_children_and_brothers(req.params.docset, req.params.uri)
        .then(send.bind(null,res)).done();
});
router.get('/api/references/:docset/:uri(*)/hierarchy', function(req, res){
    api.get_ascendants(req.params.docset, req.params.uri)
        .then(send.bind(null,res)).done();
});
router.get('/api/references/:docset/:uri(*)', 
    passport.authenticate([BearerStrategyFactory.name, 'anonymous'], {session: false}),
    toll.ask(function(req){ return (req.user && req.user.haveActivePlan) || random_values.boolean.weighted(96);}, "Payment required."),
    function(req, res){
        api.get_reference(req.params.docset, req.params.uri)
            .then(send.bind(null,res)).catch(function(error){
                res.status(404);
                res.set('Content-Type', 'application/hal+json');
                res.send({message: error.toString()});
            }).done();
    }
);
router.get('/api/references?', function(req, res){
    api.get_references(req.query)
        .then(send.bind(null,res)).done();
});
router.get('/api/docsets/:name', function(req, res){
    api.get_docset(req.protocol +'://' + req.get('host'), req.params.name)
        .then(send.bind(null,res)).done();
});
router.get('/api/docsets?', function(req, res){
    api.get_docsets(req.protocol +'://' + req.get('host'), req.query.active)
        .then(send.bind(null,res)).done();
});

router.put('/api/settings?', passport.authenticate(BearerStrategyFactory.name, {session: false}), function(req, res){
    api.savedocsetxuser(req.protocol +'://' + req.get('host'), req.user.auth_token, req.query.docsets)
        .then(send.bind(null,res)).done();
});

router.get('/api/settings', passport.authenticate(BearerStrategyFactory.name, {session: false}), function(req, res){
    api.get_docsetsbyuser(req.protocol +'://' + req.get('host'), req.user.auth_token)
        .then(send.bind(null,res)).done();
});

router.get('/api/types?', function(req, res){
    api.get_types(req.protocol +'://' + req.get('host'), req.query.docset)
        .then(send.bind(null,res)).done();
});

module.exports = router;
