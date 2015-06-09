var proxyquire = require('proxyquire');
var referencesMock = require('./stubs/references.js');
var slash = proxyquire('../app/slash.js', {'./references': referencesMock});
var stripeMock = require('./stubs/stripe.js');
var dbMock = require('./stubs/db.js');
var Users = proxyquire('../app/users.js', {'./db': dbMock});
var api = proxyquire('../app/api.js', {'./slash.js': slash, './users.js': Users, 'stripe': stripeMock});

describe('Refly API', function(){
    var fake_users = [
        {id:123, profile_id:3456, profile_provider:'google', auth_token:'aaaa', email:'test@refly.co'},
        {id:123, profile_id:3345, profile_provider:'google', auth_token:'bbbb', email:'test_2@refly.co', stripe_id: 'cus_12345'}
    ];

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
        xit('should recover the customer if it exists', function(){
        });

        it('should create a new customer if it doesnt exist', function(done){
            var token = 'token';
            var plan = 'anual';
            stripeMock.mock.customer = { id: 'new_customer' };

            api.createSubscription(user, token, plan)
                .then(function(subscription){
                    return new dbMock('users').select()
                        .then(function(users){
                            expect(users[0].stripe_id).toBe('new_customer');
                            done();
                        });
                });
        });

        xit('should update payment data if their have changed and customer exists', function(){
        });

        xit('should create subscription', function(){
        });
    });
});
