jest.dontMock('../store.js');
jest.dontMock('../actions.js');
jest.dontMock('q');
jest.dontMock('../../errors/authentication-required.js');
var AuthenticationError = require('../../errors/authentication-required.js');

var store, actions, data, authentication, subscription;
var mockCall = function(data){
    return jest.genMockFunction()
                .mockReturnValue({then: function(f){ f.bind(store)(data); return { fail: function(){}};}});
};

describe('Payment state', function(){
    beforeEach(function(){
        store = require('../store.js');
        actions = require('../actions.js');
        data = require('../../infrastructure/data.js');
        subscription = {
                payment_data: {  
                last4: 3243,  
                brand: "visa"
            },  
            plan: "monthly",  
            status: "active",  
            cancel_at_period_end: false,  
            current_period_start: 1434020626,  
            current_period_end: 1436612626  
        };
    });

    afterEach(function(){
        jest.runAllTimers();
    });
    
    describe('initial state', function(){
        describe('user no logged', function(){
            it('should trhow an error', function(){
                data.getSubscription = jest.genMockFunction()
                    .mockReturnValue({then: function(){ return { fail: function(callback){ callback(new AuthenticationError());}};}});
                store.listen(function(state){
                    expect(state.isAuthenticated).toBe(false);
                });
                actions.init();  
            });
        });
        describe('user logged', function(){
            describe('without subscription', function(){
                it('shouldnt return a subscription', function(){
                data.getSubscription = mockCall({});
                    
                    actions.init();
                    store.listen(function(state){
                        expect(state.isAuthenticated).toBe(true);
                        expect(state.status).toBe(undefined);
                        expect(state.subscription).not.toBeDefined();
                    });
                });
            });
            describe('with subscription', function(){
                it('should return the subscription', function(){
                    data.getSubscription = mockCall(subscription);
                    actions.init();
                    store.listen(function(state){
                        expect(state.subscription).toBe(subscription);
                    });
                });
            });
        });
    });

    describe('create subscription', function(){
        describe('giving all payment data', function(){
            it('should create a new subscription', function(){
                var number, cvc, month, year;
                var plan = 'monthly';
                window.Stripe = {card:{}};
                window.Stripe.card.createToken = function(data, callback){
                    callback(undefined, {id: '' });
                };
                data.createSubscription = mockCall(subscription);
                actions.createSubscription(plan, number, cvc, month, year);
                store.listen(function(state){
                    expect(state.subscription).toBe(subscription);
                    window.Stripe = undefined;
                });
            });
        });

        describe('using existing payment data', function(){
            it('should create a new subscription', function(){
                var plan = 'monthly';
                data.createSubscription = mockCall(subscription);
                actions.addSubscription(plan);
                store.listen(function(state){
                    expect(state.subscription).toBe(subscription);
                });
            });
        });
    });

    describe('cancel subscription', function(){
        it('should cancel current subscription', function(){
            subscription.cancel_at_period_end = true;
            data.cancelSubscription = mockCall(subscription);
            actions.cancelSubscription();
            store.listen(function(state){
                expect(state.subscription).toBe(subscription);
            });
        });
    });
});

