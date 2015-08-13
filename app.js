require('newrelic');
var express = require('express')
  , bodyParser = require('body-parser')
  , favicon = require('serve-favicon')
  , subscription_router = require('./routes/subscriptions.js')
  , users_router = require('./routes/users.js')
  , references_router = require('./routes/references.js')
  , authentication_router = require('./routes/authentication.js')
  , feedback_router = require('./routes/feedback.js')
  , http = require('http')
  , path = require('path')
  , morgan = require('morgan')
  , errorhandler = require('errorhandler')
  , staticAsset = require('static-asset')
  , config = require('config')
  , passport = require('passport')
  , AnonymousStrategy = require('passport-anonymous')
  , BearerStrategyFactory = require('./app/auth_strategies/bearer.js')
  , hal = require('express-hal')
  , session = require('cookie-session')  
  , canonicalRedirect = require('./routes/canonical-redirect.js')
  , SSLRedirect = require('./routes/ssl-redirect.js')
  , cacheResponseDirective = require('express-cache-response-directive');

var app = express();
var env = process.env.NODE_ENV || 'development';

if ('development' == env) {
  app.use(morgan('dev'));
}
app.set('port', config.serverConfig.port);
app.set('ipaddr', config.serverConfig.ip);
app.set('views', './views');
app.set('view engine', 'jade');

/*** static resources ***/
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public','img','favicon.ico')));

/** redircetion to canonical name **/
app.use(canonicalRedirect);
/** redirect to https **/
if('development' != env) {
    app.use(new SSLRedirect().https_redirect());
}

/* middlewares */
app.use(session({name: 'rl', secret: config.cookies.secret, maxAge: 2419200000}));
app.use(bodyParser.json());
app.use(passport.initialize());
var bearer_auth = BearerStrategyFactory.create();
passport.use(bearer_auth);
passport.use(new AnonymousStrategy());
app.use(hal.middleware);
app.use(cacheResponseDirective());

/* routes */
app.use(authentication_router);
app.use(references_router);
app.use(users_router);
app.use(subscription_router);
app.use(feedback_router);

/* general */
app.use('/imprint', function(req, res){
    res.render('imprint');
});   
app.use('/info', function(req, res){
    res.render('info');
});   
app.use('/cookies', function(req, res){
    res.render('cookies');
});   
app.use('/terms', function(req, res){
    res.render('terms');
});   
app.use('/privacy', function(req, res){
    res.render('privacy');
});   
app.use('/', function(req, res){
    res.render('index', {environment: env, stripe_pk: config.stripe.public_key});
});   

/*errors*/
if ('development' == env) {
    app.use(errorhandler());
}else{
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('errors/500', {
            message: err.message,
            error: {}
        });
    });
}

http.createServer(app).listen(app.get('port'), app.get('ipaddr'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

