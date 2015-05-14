var proxyquire = require('proxyquire');
var db_mock = require('./stubs/db.js');
var users = proxyquire('../app/users.js', {'./db': db_mock});
var manager = proxyquire('../routes/users-manager.js',{'../app/users.js': users});

describe('users manager', function(){
    beforeEach(function(){
    });

    afterEach(function(){
    });

    it('should get the user if the session exists', function(done){
        db_mock.mock.init()
            .then(function(){
               return db_mock.mock.tableInitialvalue('users',[{
                   id: 1,
                   email: '123456@anonymous',
                   }])
                .then(function(){
                            return db_mock.mock.tableInitialvalue('clients',[{
                                id:'44022900-9030-4c57-8b74-f5779ca015d4',
                                user_id: 1
                            }]);
                })
                .then(function(){
                            var req = {session: { client_id: '44022900-9030-4c57-8b74-f5779ca015d4'}};

                            manager(req, null, function(){
                                expect(req.user.email).toEqual('123456@anonymous'); 
                                done();
                            });
                       });
        }).catch(function(err){console.log(err);});
    });

    it('should create a new anonymous user if the session doesnt exist', function(done){
        db_mock.mock.init()
            .then(function(){
                var req = {session: { client_id: 'b4e147d0-a69a-4f4f-a78d-72c3962a611a'}};

                manager(req, null, function(){
                    db_mock('users').count('id as count').then(function(result){
                        expect(result[0].count).toBe(1);
                        done();
                    });
                });
            })
            .catch(function(err){console.log(err);});
    });
});
