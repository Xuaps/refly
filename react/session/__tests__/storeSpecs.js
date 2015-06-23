jest.dontMock('../store.js');
jest.dontMock('../actions.js');
jest.dontMock('q');
var Q = require('q');

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
        data.deleteSession = jest.genMockFunction().mockReturnValue(Q.fcall(function(){return;}));
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

    describe('cache', function(){
        describe('on init', function(){
            it("shouldn't load the user if the token dind't change", function(){
                var cont = 0;
                authentication.getAuth = jest.genMockFunction().mockReturnValue({token:'test'});
                data.getCurrentUser = jest.genMockFunction().mockReturnValue(
                    {
                        then:function(c){ c(); return {fail: function(){}}}
                    });
                actions.init();  
                actions.init();
                store.listen(function(status){
                    if(cont===1){
                        expect(data.getCurrentUser.mock.calls.length).toEqual(1);
                    }
                    cont++;
                });
            });
        });

        describe('on login successful', function(){
            it("shouldn't load the user if the token dind't change", function(){
                var cont = 0;
                data.getCurrentUser = jest.genMockFunction().mockReturnValue(
                    {
                        then:function(c){ c(); return {fail: function(){}}}
                    });
                actions.loginSuccessful('refly');  
                actions.loginSuccessful('refly');
                store.listen(function(status){
                    if(cont===1){
                        expect(data.getCurrentUser.mock.calls.length).toEqual(1);
                    }
                    cont++;
                });
            });
        });
    });
}); 
