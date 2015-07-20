var mandrillappMailer = require('./stubs/mandrillapp-mailer.js');
describe('contact email', function(){

    it('should test that the mail was sent', function(){
    	var result = mandrillappMailer.sendMail('name', 'test@test.com', 'a@a.a', 'test');
        expect(result).toBe(true);
    });

    it('should test that the mail fails if a not valid email is given', function(){
    	var result = mandrillappMailer.sendMail('name', 'xtest', 'test@test.com', 'test');
        expect(result).toBe(false);
    });
});