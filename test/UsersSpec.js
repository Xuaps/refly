var proxyquire = require('proxyquire');
var db_mock = require('./stubs/db.js');
var mockMailer = require('./stubs/mailer.js');
var Users = proxyquire('../app/users.js', {'./db': db_mock, './mailer.js': mockMailer});


describe('users repository', function(){
    describe('find or create user', function(){
        it('should create and return a new user if it doesnt exist', function(done){
            db_mock.mock.init()
                .then(function(){
                   return db_mock.mock.tableInitialvalue('users', [
                        {id:123, profile_id:3456, profile_provider:'google', auth_token:'aaaa', email:'email@refly.xyz'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();        
                    users
                        .findOrCreate({profile_id:3456, profile_provider:'github', auth_token:'abbb', email:'email@refly.xyz'})
                        .then(function(user){
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
                        {id:123, profile_id:2345, profile_provider:'github', auth_token:'aaaa', email:'email@refly.xyz'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();     
                    users
                        .findOrCreate({profile_id:2345, profile_provider:'github', auth_token:'aaaa', email:'email@refly.xyz'})
                        .then(function(user){
                            expect(user.profile_id).toBe(2345);
                            expect(user.profile_provider).toBe('github');
                            done();
                        });
                });
        });

        it('should not update email with an invalid email', function(done){
            db_mock.mock.init()
                .then(function(){
                   return db_mock.mock.tableInitialvalue('users', [
                        {id:123, profile_id:2345, profile_provider:'github', auth_token:'aaaa', email:'previousemail@refly.xyz'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();     
                    users
                        .findOrCreate({profile_id:2345, profile_provider:'github', auth_token:'aaaa', email:'invalid'})
                        .then(function(user){
                            expect(user.profile_id).toBe(2345);
                            expect(user.email).toBe('previousemail@refly.xyz');
                            expect(user.profile_provider).toBe('github');
                            done();
                        });
                });
        });

        it('should have a generated email if the email is not valid', function(done){
            db_mock.mock.init()
                .then(function(){
                   return db_mock.mock.tableInitialvalue('users', [
                        {id:123, profile_id:3456, profile_provider:'google', auth_token:'aaaa', email:'email@refly.xyz'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();
                    users
                        .findOrCreate({profile_id:2345, profile_provider:'github', auth_token:'aaaa', email:'notvalidemail'})
                        .then(function(user){
                            expect(user.email.substring(0, 11)).toBe('github-user');
                            done();
                        });
                });
        });
        it('should send a welcome email', function(done){
            db_mock.mock.init()
                .then(function(){
                   return db_mock.mock.tableInitialvalue('users', [
                        {id:123, profile_id:3456, profile_provider:'google', auth_token:'aaaa', email:'email@refly.xyz'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();
                    users
                        .findOrCreate({profile_id:2345, profile_provider:'github', auth_token:'aaaa', email:'email@refly.xyz'})
                        .then(function(user){
                            expect(mockMailer.message).toBe('success');
                            done();
                        });
                });
        });
        it('should return a user with a valid email', function(done){
            var users = new Users();
            users
                .findOrCreate({profile_id:6345, profile_provider:'github', auth_token:'aaaa', email:''})
                .then(function(user){
                    expect(user.profile_id).toBe(6345);
                    expect(user.profile_provider).toBe('github');
                    expect(user.email.substring(0, 11)).toBe('github-user');
                    done();
                });
        });

        it('should update user data if user exist and they are changed', function(done){
            db_mock.mock.init()
                .then(function(){
                   return db_mock.mock.tableInitialvalue('users', [
                        {id:123, profile_id:2345, profile_provider:'google', auth_token:'aabb', email:'old_email@refly.xyz'} 
                       ]);
                })
                .then(function(){
                    var users = new Users();
                    users
                        .findOrCreate({profile_id:2345, profile_provider: 'google', auth_token:'aaaa', email:'email@refly.xyz'})
                        .then(function(user){
                            expect(user.auth_token).toBe('aaaa');
                            expect(user.email).toBe('email@refly.xyz');
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
                        {id: 123, profile_id: 1234, auth_token: 'swert', email: 'email@refly.xyz'}
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

    describe('revokeAccessToken', function(){
        it('should remove users token', function(done){
            db_mock.mock.init()
                .then(function(){
                    return db_mock.mock.tableInitialvalue('users', [
                        {id: 123, profile_id: 1234, auth_token: 'swert', email: 'email@refly.xyz'}
                        ]);
                })
                .then(function(){
                    new Users().revokeAccessToken({auth_token: 'swert'})
                    .then(function(){
                        new Users().find({auth_token: 'swert'})
                        .then(function(users){
                            expect(users.length).toBe(0);
                            done();
                        });
                    });
                });
        });
    });
});
