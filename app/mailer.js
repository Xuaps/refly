var config = require('config');
var sendgrid  = require('sendgrid')(config.mailer.API_KEY);

module.exports.sendMailTemplated = function(email, template_config){
    var SGEmail = new sendgrid.Email({
        to:         email,
        fromname:   template_config.from_name,
        from:       template_config.from_email,
        subject:    template_config.subject,
        text:       '\n'
    });
    SGEmail.setFilters({
        "templates": {
            "settings": {
                "enable": "1",
                "template_id": template_config.template_id
            }
        }
    });
    return sendgrid.send(SGEmail, function(err, json) {
      if (err) {
        console.log('A sendgrid error occurred: ' + err);
        return false;
      }else{
        return true;
      }
    });
};

module.exports.sendMail = function(name, email, subject, body){
    re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(email == '' || !re.test(email))
        email = 'anonymous-contact@refly.xyz'
    var SGemail  = new sendgrid.Email({
      to:       config.contact.recipient,
      from:     email,
      subject:  subject,
      text:     body
    });
    return sendgrid.send(SGemail, function(err, json) {
      if (err) {
        console.log('A mandrill error occurred: ' + err);
        return false;
      }else{
        return true;
      }
      // console.log(json);
    });
};
