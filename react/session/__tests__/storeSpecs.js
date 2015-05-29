jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, actions, data, authentication;

describe('Session status', function(){
    beforeEach(function(){
        store = require('../store.js');
        actions = require('../actions.js');
        data = require('../../infrastructure/data.js');
        authentication = require('../../infrastructure/authentication.js');
    });

    afterEach(function(){
        jest.runAllTimers();
    });
    
    describe('initial state', function(){
        describe('no token available', function(){
            it('should be an empty object', function(){
                actions.init();  
                store.listen(function(status){
                    expect(status).toEqual({isAuthenticated: false});
                });
            });
        });

        describe('token available', function(){
            it('should be authenticated and has user data', function(){
                data.prototype._users = [{email: 'test@refly.co'}];
                authentication.getAuth = jest.genMockFunction().mockReturnValue({token:'test'});

                actions.init();  
                store.listen(function(status){
                    expect(status.isAuthenticated).toBe(true);
                    expect(status.user.email).toBe('test@refly.co');
                });
            });
        });
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
      it('should be unauthenticated and doesnt have a user defined', function(){
        var cont = 0;
        data.prototype._users = [{email: 'test@refly.co'}];
        data.deleteSession = jest.genMockFunction().mockReturnValue({fail: function(){}});
        actions.loginSuccessful('test');  
        actions.logOut();
        store.listen(function(status){
            if(cont===1){
                expect(data.deleteSession).toBeCalled();
                expect(status.isAuthenticated).toBe(false);
                expect(status.user).toBeUndefined();
            }
            cont++;
        });
      });
    });
}); 
