Mandrill = {
    sent_template: false,
    template: '',
  	sendMailTemplated: function(email, template) {
        this.sent_template = true;
        this.template = template;
    }
}

module.exports = Mandrill;