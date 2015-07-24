var mandrill = require('mandrill-api/mandrill');
var config = require('config');
var airbrake = require('airbrake').createClient(config.airbrake.key);

module.exports.sendMailTemplated = function(email, template_config){
    var mandrill_client = new mandrill.Mandrill(config.mandrillapp.API_KEY);
    var message = {
        "subject": template_config.subject,
        "from_email": template_config.from_email,
        "from_name": template_config.from_name,
        "to": [{
                "email": email,
                "name": "refly.xyz administrator",
                "type": "to"
            }],
    };
    var async = false;
    return mandrill_client.messages.sendTemplate({"template_name": template_config.template_name, "template_content": template_config.template_content, "message": message, "async": async},
        function(result) {
            return true;
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        airbrake.notify('A mandrill error occurred: ' + e.name + ' - ' + e.message + 'from: ' + email + ' message: #' + message +'#');
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        return false;
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
};

module.exports.sendMail = function(name, email, subject, body){
    var mandrill_client = new mandrill.Mandrill(config.mandrillapp.API_KEY);
    re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(email == '' || !re.test(email))
        email = 'anonymous-contact@refly.xyz'
    var message = {
        "text": body,
        "subject": subject,
        "from_email": email,
        "from_name": name,
        "to": [{
                "email": config.contact.recipient,
                "name": "refly.xyz administrator",
                "type": "to"
            }],
    };
    var async = false;
    return mandrill_client.messages.send({"message": message, "async": async},
        function(result) {
            return true;
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        airbrake.notify('A mandrill error occurred: ' + e.name + ' - ' + e.message + 'from: ' + email + ' message: #' + message +'#');
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        return false;
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
};