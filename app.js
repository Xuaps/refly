var express = require('express')
  , favicon = require('serve-favicon')
  , docsets = require('./routes/docsets')
  , http = require('http')
  , path = require('path')
  , config = require('config');

var app = express();

app.configure(function(){
  app.set('port', config.serverConfig.port);
  app.set('ipaddr', config.serverConfig.ip);
  app.set('view engine', 'jade');
  app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/api/references?', docsets.search);
app.get('/api/docsets', docsets.get_docsets);
app.get('/api/types', docsets.get_types);
app.get('/api/reference/:uri(*)', docsets.get);
app.get('/api/references/:uri(*)', docsets.children);
app.get('/api/referencesbranch/:uri(*)', docsets.branch);


http.createServer(app).listen(app.get('port'), app.get('ipaddr'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

// Functions for Jade
app.locals.jqSelector;
