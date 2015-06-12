jest.dontMock('../store.js');
jest.dontMock('../actions.js');
jest.dontMock('q');
jest.dontMock('../../errors/authentication-required.js');
var AuthenticationError = require('../../errors/authentication-required.js');

var store, actions, data, authentication;

describe('Payment status', function(){
    beforeEach(function(){
        store = require('../store.js');
        actions = require('../actions.js');
        data = require('../../infrastructure/data.js');
    });

    afterEach(function(){
        jest.runAllTimers();
    });
    
    describe('initial state', function(){
        describe('user no logged', function(){
            it('should trhow an error', function(){
                data.getSubscription = jest.genMockFunction()
                    .mockReturnValue({then: function(){ return { fail: function(callback){ callback(new AuthenticationError());}};}});
                store.listen(function(status){
                    expect(status.isAuthenticated).toBe(false);
                });
                actions.init();  
            });
        });
    });
});

