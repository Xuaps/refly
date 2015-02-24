var jQuery = require('jquery-browserify');

var SimpleForm = function(key){
    this.apiKey = key;
};

SimpleForm.prototype.sendMail = function (mail, name, message){
    return jQuery.ajax({
	        dataType: 'jsonp',
	        url: "http://getsimpleform.com/messages/ajax?form_api_token=" + this.apiKey,
	        data: data
	    });
},

module.exports = SimpleForm;
