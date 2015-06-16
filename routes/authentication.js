var URI = require('URIjs');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var GithubStrategyFactory = require('../app/auth_strategies/github.js');
var GoogleStrategyFactory = require('../app/auth_strategies/google.js');

var github_auth = new GithubStrategyFactory.create('/auth/github/callback');
var google_auth = new GoogleStrategyFactory.create('/auth/google/callback');
passport.use(github_auth);
passport.use(google_auth);

var saveReferer = function(req, res, next){ req.session.redirectUrl = new URI(req.headers.referer).pathname(); next(); };
router.get('/auth/github', saveReferer, passport.authenticate(github_auth.name, {session: false, scope: github_auth.scope }));
router.get('/auth/github/callback', passport.authenticate(github_auth.name, 
            {session: false, failureRedirect: "/session", failureFlash: true}),
            function(req,res){
                var redirectUrl = req.session.redirectUrl || '/session';
                res.redirect(redirectUrl + "?access_token=" + req.user.auth_token);
            }
);

router.get('/auth/google', saveReferer, passport.authenticate(google_auth.name, {session: false, scope: google_auth.scope }));
router.get('/auth/google/callback', function(req, res, next) {
  var redirectUrl = req.session.redirectUrl || '/session';
  if(req.query.error)
    return res.redirect(redirectUrl + '?error='+req.query.error);

  passport.authenticate(google_auth.name, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect(redirectUrl); }
    return res.redirect(redirectUrl + '?access_token=' + user.auth_token);
  })(req, res, next);
});
        
        

module.exports = router;
