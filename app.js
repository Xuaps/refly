
/**
 * Module dependencies.
 */

var express = require('express')
  , docsets = require('./routes/docsets')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.render('index', {});
});
app.get('/css/:path(*)', function(req, res) {
  res.sendfile('public/css/' + req.params.path);
});
app.get('/js/:path(*)', function(req, res) {
  res.sendfile('public/js/' + req.params.path);
});
app.get('/api/search', docsets.search);
app.get('/api/get/:uri(*)', docsets.get);
app.get('/api/children/:uri(*)', docsets.children);
app.get('/:uri(*)', function(req, res) {
  res.render('index', { uri: '/' + req.params.uri });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
