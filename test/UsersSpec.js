var proxyquire = require('proxyquire');
var db_mock = require('./stubs/db.js');
var Users = proxyquire('../app/users.js', {'./db': db_mock});

describe('users repository', function(){
    describe('find or create user', function(){
        it('should create and return a new user if it doesnt exist', function(done){
            db_mock.mock.init()
                .then(function(){
                   return db_mock.mock.tableInitialvalue('users', [
                        {id:123, profile_id:3456, profile_provider:'google', auth_token:'aaaa', email:'email@refly.co'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();        
                    users
                        .findOrCreate({profile_id:3456, profile_provider:'github', auth_token:'abbb', email:'email@refly.co'})
                        .then(function(user){
                            expect(user.id).toBeDefined();
                            db_mock('users').count('id as count').then(function(result){
                                expect(result[0].count).toBe(2);
                                done();
                            });
                        });
                }).catch(function(err){console.log(err);});
        });
        
        it('should return a user if it exists', function(done){
            db_mock.mock.init()
                .then(function(){
                   return db_mock.mock.tableInitialvalue('users', [
                        {id:123, profile_id:2345, profile_provider:'github', auth_token:'aaaa', email:'email@refly.co'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();        
                    users
                        .findOrCreate({profile_id:2345, profile_provider:'github', auth_token:'aaaa', email:'email@refly.co'})
                        .then(function(user){
                            expect(user.id).toBe(123);
                            done();
                        });
                });
        });

        it('should update user data if user exist and they are changed', function(done){
            db_mock.mock.init()
                .then(function(){
                   return db_mock.mock.tableInitialvalue('users', [
                        {id:123, profile_id:2345, profile_provider:'google', auth_token:'aabb', email:'old_email@refly.co'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();        
                    users
                        .findOrCreate({profile_id:2345, profile_provider: 'google', auth_token:'aaaa', email:'email@refly.co'})
                        .then(function(user){
                            expect(user.id).toBe(123);
                            expect(user.auth_token).toBe('aaaa');
                            expect(user.email).toBe('email@refly.co');
                            done();
                        });
                });

        });
    });

    describe('find', function(){
        it('should find a user by auth token', function(done){
            db_mock.mock.init()
                .then(function(){
                    return db_mock.mock.tableInitialvalue('users', [
                        {id: 123, profile_id: 1234, auth_token: 'swert', email: 'email@refly.co'}
                        ]);
                })
                .then(function(){
                    new Users().find({auth_token: 'swert'})
                    .then(function(users){
                        expect(users[0].profile_id).toBe(1234);
                        done();
                    });
                });
        });
    });
});