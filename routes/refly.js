var express = require('express');
var router = express.Router();
var hal = require('express-hal');
var api = require('../app/api.js');
var cacheResponseDirective = require('express-cache-response-directive');
var docsets = require('./docsets');

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

router.use(hal.middleware);
router.use(cacheResponseDirective());
router.get('/api', function(req, res){
    send.bind(null,res)(api.entry());
});
router.get('/api/references/:docset/:uri(*)/c&b', function(req, res){
    api.get_children_and_brothers(req.params.docset, req.params.uri)
        .then(send.bind(null,res));
});
router.get('/api/references/:docset/:uri(*)/hierarchy', function(req, res){
    api.get_ascendants(req.params.docset, req.params.uri)
        .then(send.bind(null,res));
});
router.get('/api/references/:docset/:uri(*)', function(req, res){
    api.get_reference(req.params.docset, req.params.uri)
        .then(send.bind(null,res));
});
router.get('/api/references?', function(req, res){
    //TODO: types
    if(req.query.docsets){
        docsets.search(req,res);
    }else{ 
        api.get_references(Object.keys(req.query)[0])
            .then(send.bind(null,res));
    }
});
router.get('/api/docsets/:name', function(req, res){
    api.get_docset(req.protocol +'://' + req.get('host'), req.params.name)
        .then(send.bind(null,res));
});
router.get('/api/docsets?', function(req, res){
    api.get_docsets(req.protocol +'://' + req.get('host'), req.query.active)
        .then(send.bind(null,res));
});
router.get('/api/types?', function(req, res){
    api.get_types(req.protocol +'://' + req.get('host'), req.query.docset)
        .then(send.bind(null,res));
});

module.exports = router;
