var express = require('express');
var router = express.Router();
var config = require('config');
var mandrillappMailer = require('../app/mandrillapp-mailer.js');
var BearerStrategyFactory = require('../app/auth_strategies/bearer.js');
var passport = require('passport');

router.post('/message/send', passport.authenticate([BearerStrategyFactory.name, 'anonymous'], {session: false}), function(req, res){
    if(req.user){
        name = "refly user"
        email = req.user.email;
    }else{
        name = req.get('name');
        email = req.get('email');
    } 
    mandrillappMailer.sendMail(name, email, config.contact.subject, req.get('message'));
    res.status(200);
    res.set('Content-Type', 'application/hal+json');
    res.send({message: "message sent"});
});

module.exports = router;