jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, actions, data, count;
describe('Contact Form', function(){
        beforeEach(function(){
            data = require('../../infrastructure/data.js');
            actions = require('../actions.js');
            store = require('../store.js');
            count = 0;
        });

        afterEach(function(){
            jest.runAllTimers();
        });
        
        describe('check emailData', function(){
            it('should send an email', function(){
                var name='Yo';
                var email='test@test.es';
                var content = 'a';
                actions.sendMail(name, email, content);
                store.listen(function(state){
                	if(count==0){
                        expect(state.sent).toBe(true);
                        expect(state.errors.length).toBe(0);
                        count++;
                	}
                });
                actions.init();  
            });

            it('should fail at validating email and content', function(){
                var name='Yo';
                var email='aaa@aa';
                var content  = '';
                actions.sendMail(name, email, content);
                store.listen(function(state){
                	if(count>0){
                        expect(state.sent).toBe(false);
                        expect(state.errors.length).toBe(2);
                	}
                });
                actions.init();  
            });
        });
});

