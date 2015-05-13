var proxyquire = require('proxyquire');

var db_mock = function(){
   var mock = {};
   mock.innerJoin = function(){return mock;};
   mock.where = function(){return mock;};
   mock.then = function(){ return { then: function(callback){ return callback(db_mock.users);}}};

   return mock;
};
var users = proxyquire('../app/users.js', {'./db': db_mock});
var manager = proxyquire('../routes/users-manager.js',{'../app/users.js': users});

describe('users manager', function(){
    beforeEach(function(){
    });

    afterEach(function(){
    });

    it('should get the user if the session exists', function(){
       db_mock.users = [{
                       id: 1,
                       email: '123456@anonymous',
                       clients: [{id: '12345'}]
                   }];
        var req = {session: { client_id: '12345'}};

        manager(req);
        expect(req.user.email).toEqual('123456@anonymous'); 
    });

    xit('should create a new anonymous user if the session doesnt exist', function(){
        var req = {session: { id: 'ae4567'}};

        users(req);
        expect(users_repo.length).toBe(4); 
    });
});
