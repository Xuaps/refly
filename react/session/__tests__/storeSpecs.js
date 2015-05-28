jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, actions, data;

describe('Session status', function(){
    beforeEach(function(){
        store = require('../store.js');
        actions = require('../actions.js');
        data = require('../../infrastructure/data.js');
    });

    afterEach(function(){
        jest.runAllTimers();
    });

    describe('after successful login', function(){
      it('should be authenticated and has user data', function(){
        var token = '12345-12222-112222-12233';
        data.prototype._users = [{email: 'test@refly.co'}];
        actions.loginSuccessful(token);  
        store.listen(function(status){
            expect(status.isAuthenticated).toBe(true);
            expect(status.user.email).toBe('test@refly.co');
        });
      });
    });
    
    describe('after logout', function(){
      xit('should be unauthenticated and doesnt have a user defined', function(){
      });
    });
}); 
