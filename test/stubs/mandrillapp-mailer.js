var Q = require('q');

function Mandrill(){

}
module.exports.sendMail = function(name, email, subject, body) {
  re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
  if(email == '' || !re.test(email))
      return false;
  else
  	  return true;
};