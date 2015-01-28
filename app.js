var express = require('express')
  , favicon = require('serve-favicon')
  , refly_router = require('./routes/refly')
  , http = require('http')
  , path = require('path')
  , morgan = require('morgan')
  , errorhandler = require('errorhandler')
  , config = require('config');

var app = express();

app.set('port', config.serverConfig.port);
app.set('ipaddr', config.serverConfig.ip);
app.set('view engine', 'jade');
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));
app.use(morgan('dev'));
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.use(express.methodOverride());
app.use(refly_router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res){
    res.set('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});   

var env = process.env.NODE_ENV || 'development';
if ('development' == env) {
  app.use(errorhandler());
}

http.createServer(app).listen(app.get('port'), app.get('ipaddr'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

