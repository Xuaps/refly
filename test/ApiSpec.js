var proxyquire = require('proxyquire');
var referencesMock = require('./stubs/references.js');
var slash = proxyquire('../app/slash.js', {'./references': referencesMock});
var stripeMock = require('./stubs/stripe.js');
var dbMock = require('./stubs/db.js');
var Users = proxyquire('../app/users.js', {'./db': dbMock});
var api = proxyquire('../app/api.js', {'./slash.js': slash, './users.js': Users, 'stripe': stripeMock});

describe('Refly API', function(){
    var fake_users;

    beforeEach(function(done) {
      referencesMock.prototype._collection = [
                {
                    reference: 'search',
                    uri: 'search',
                    parent_uri: null,
                    type: 'function',
                    docset: {name: 'slash', active: true},
                    content: 'blablabla'
                },
                {
                    reference: 'search',
                    uri: 'searchconstant',
                    parent_uri: 'search',
                    type: 'constant',
                    docset: {name: 'slash', active: true},
                    content: 'blablabla'
                },
                {
                    reference: 'search',
                    uri: 'searchfunction',
                    parent_uri: 'searchconstant',
                    type: 'function',
                    docset: {name: 'java', active: true},
                    content: 'blablabla'
                }
            ];
        for(i=0;i<20;i++)
        {
            referencesMock.prototype._collection.push({
                reference: 'test',
                uri: 'test',
                parent_uri: 'test',
                type: 'test',
                docset: {name:'test', active: true},
                content: 'test'
            });
        }
        fake_users = [
            {id:123, profile_id:3456, profile_provider:'google', auth_token:'aaaa', email:'test@refly.co'},
            {id:124, profile_id:3345, profile_provider:'google', auth_token:'bbbb', email:'test_2@refly.co', stripe_id: 'cus_12345'}
        ];
        dbMock.mock.init()
            .then(function(){
               return dbMock.mock.tableInitialvalue('users', fake_users);
            }).then(function(){ done(); });
    });

    describe('get_reference', function(){
        describe('reference doesnt exist', function(){
            it('should fail with a message error', function(done){
                api.get_reference('test','/test/test/test.html')
                    .fail(function(res){
                        expect(res.message).toBeDefined(); 
                        done();
                    });
            });
        });
    });

    describe('References collection', function(){
        it('should return a max of `pagesize` references found', function(done){
            var pattern = '';
            var pagesize = 15;
            api.get_references({name: pattern, 'pagesize': pagesize})
                .then(function(references){
                    expect(references.embeds['rl:references'].length).toBeLessThan(pagesize+1);
                    done();
                });
        });

        it('should return only references that contains the given pattern', function(done){
            var pattern = 'eAr';
            expect(referencesMock.prototype._collection.length).toBe(23);
            api.get_references({name: pattern})
                .then(function(references){
                    expect(references.embeds['rl:references'].length).toBe(3);
                    references.embeds['rl:references'].forEach(function(ref){
                        expect(ref.data.name.toLowerCase()).toContain(pattern.toLowerCase());
                    });
                    done();
                });
        });
    });

    describe('Create subscription', function(){
        it('should recover the customer if it exists', function(done){
            var token = 'token';
            var plan = 'anual';
            stripeMock.mock.customer = { id: 'cus_12345' , sources:{data:[{last4:"4444", brand:"visa"}]}};

            api.createSubscription(fake_users[1], plan, token)
                .then(function(subscription){
                    return new dbMock('users').select()
                        .then(function(users){
                            expect(users[1].stripe_id).toBe('cus_12345');
                            done();
                        });
                });
        });

        it('should create a new customer if it doesnt exist', function(done){
            var token = 'token';
            var plan = 'anual';
            stripeMock.mock.customer = { id: 'new_customer' , sources:{data:[{last4:"4444", brand:"visa"}]}};

            api.createSubscription(fake_users[0], plan, token)
                .then(function(subscription){
                    return new dbMock('users').select()
                        .then(function(users){
                            expect(users[0].stripe_id).toBe('new_customer');
                            done();
                        });
                });
        });
        
        it('should retunr payment data', function(done){
            var token = 'token';
            var plan = 'anual';
            stripeMock.mock.customer = { id: 'new_customer', sources:{data:[{last4:"4444", brand:"visa"}]}};

            api.createSubscription(fake_users[0], plan, token)
                .then(function(subscription){
                    expect(subscription.data.payment_data.last4).toBe("4444");
                    expect(subscription.data.payment_data.brand).toBe("visa");
                    done();
                }).fail(done);
        });

        it('should create subscription', function(done){
            var token = 'token';
            var plan = 'anual';
            stripeMock.mock.customer = { id: 'new_customer', sources:{data:[{last4:"4444", brand:"visa"}]}};
            stripeMock.mock.subscription = { plan:{id:'annual', name: 'Yearly'}, status: 'active'};

            api.createSubscription(fake_users[0], plan, token)
                .then(function(subscription){
                    expect(subscription.data.plan).toBe("Yearly");
                    expect(subscription.data.status).toBe("active");
                    done();
                }).fail(done);

        });
    });

    describe('Cancel subscription', function(){
        it('should cancel the subscription', function(done){
            var subscription = { plan:{id:'annual'}, status: 'active'};
            stripeMock.mock.subscription = { plan:{id:'annual'}, status: 'active', cancel_at_period_end: true,
                current_period_start: 1434008506, current_period_end: 1436600506 };
            stripeMock.mock.customer = { id: 'new_customer', sources:{data:[{last4:"4444", brand:"visa"}]}, 
                subscriptions:{data: [subscription]}};
            
            api.cancelSubscription(fake_users[0])
                .then(function(canceled_subscription){
                    expect(canceled_subscription.data.status).toBe('active');
                    expect(canceled_subscription.data.cancel_at_period_end).toBe(true);
                    expect(canceled_subscription.data.current_period_start).toBe(1434008506);
                    expect(canceled_subscription.data.current_period_end).toBe(1436600506);
                    done();
                });
        });
    });

    describe('Get subscription', function(){
        it('should return the active subscription', function(done){
            var subscription = { plan:{id:'annual', name: 'Yearly'}, status: 'active'};
            stripeMock.mock.subscription = subscription;
            stripeMock.mock.customer = { id: 'new_customer', sources:{data:[{last4:"4444", brand:"visa"}]}, 
                subscriptions:{data: [subscription]}};

            api.getSubscription(fake_users[1])
                .then(function(subscription){
                    expect(subscription.data).toEqual({ payment_data : { last4 : '4444', brand : 'visa' }, plan : 'Yearly', cancel_at_period_end : undefined, current_period_end : undefined, current_period_start : undefined, status : 'active' });
                    done();
                }).fail(done);
        });
    });
});
