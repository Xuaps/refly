var express = require('express');
var router = express.Router();
var passport = require('passport');
var GithubStrategyFactory = require('../app/auth_strategies/github.js');
var GoogleStrategyFactory = require('../app/auth_strategies/google.js');

var github_auth = new GithubStrategyFactory.create('/auth/github/callback');
var google_auth = new GoogleStrategyFactory.create('/auth/google/callback');
passport.use(github_auth);
passport.use(google_auth);

router.get('/auth/github', passport.authenticate(github_auth.name, {session: false, scope: github_auth.scope }));
router.get('/auth/github/callback', passport.authenticate(github_auth.name, 
            {session: false, failureRedirect: "/session", failureFlash: true}),
            function(req,res){
                res.redirect("/session?access_token=" + req.user.auth_token);
            }
);

router.get('/auth/google', passport.authenticate(google_auth.name, {session: false, scope: google_auth.scope }));
router.get('/auth/google/callback', function(req, res, next) {
  if(req.query.error)
    return res.redirect('/session?error='+req.query.error);

  passport.authenticate(google_auth.name, function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/session'); }
    return res.redirect('/session?access_token=' + user.auth_token);
  })(req, res, next);
});
        
        

module.exports = router;
