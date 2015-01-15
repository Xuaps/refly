var express = require('express')
  , favicon = require('serve-favicon')
  , docsets = require('./routes/docsets')
  , api = require('./app/api.js')
  , http = require('http')
  , path = require('path')
  , config = require('config')
  , hal = require('express-hal');

var app = express();

app.configure(function(){
  app.set('port', config.serverConfig.port);
  app.set('ipaddr', config.serverConfig.ip);
  app.set('view engine', 'jade');
  app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(hal.middleware);
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res){
        res.set('Content-Type', 'text/html');
        res.sendfile('public/index.html');
    });   
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/api', function(req, res){
    res.set('Content-Type', 'application/hal+json');
    res.hal(api.entry());
});
app.get('/api/references/:docset/:uri(*)/c&b', function(req, res){
    api.get_children_and_brothers(req.params.docset, req.params.uri)
        .then(function(hal){
            res.set('Content-Type', 'application/hal+json');
            res.hal(hal);
        });
});
app.get('/api/references/:docset/:uri(*)/hierarchy', function(req, res){
    api.get_ascendants(req.params.docset, req.params.uri)
        .then(function(hal){
            res.set('Content-Type', 'application/hal+json');
            res.hal(hal);
        });
});
app.get('/api/references/:docset/:uri(*)', function(req, res){
    api.get_reference(req.params.docset, req.params.uri)
        .then(function(hal){
            res.set('Content-Type', 'application/hal+json');
            res.hal(hal);
        });
});
app.get('/api/references?', function(req, res){
    //TODO: types
    if(req.query.docsets){
        docsets.search(req,res);
    }else{
        api.get_references(Object.keys(req.query)[0])
            .then(function(hal){
                res.set('Content-Type', 'application/hal+json');
                res.hal(hal);
            });
    }
});
app.get('/api/docsets/:name', function(req, res){
    api.get_docset(req.protocol +'://' + req.get('host'), req.params.name)
        .then(function(hal){
            res.set('Content-Type', 'application/hal+json');
            res.hal(hal);
    });
});
app.get('/api/docsets?', function(req, res){
    api.get_docsets(req.protocol +'://' + req.get('host'), req.query.active)
        .then(function(hal){
            res.set('Content-Type', 'application/hal+json');
            res.hal(hal);
    });
});
app.get('/api/types?', function(req, res){
    api.get_types(req.protocol +'://' + req.get('host'), req.query.docset)
        .then(function(hal){
            res.set('Content-Type', 'application/hal+json');
            res.hal(hal);
        });
});

http.createServer(app).listen(app.get('port'), app.get('ipaddr'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

