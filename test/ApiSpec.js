var proxyquire = require('proxyquire');
var slash = {};
var api = proxyquire('../app/api.js', {'./slash.js': slash});
describe('API', function(){
    describe('get_reference', function(){
        describe('reference doesnt exist', function(){
            it('should return null', function(done){
                slash.get = function(id){
                    return {
                        then: function(callback){
                            return callback(null);
                        }   
                    };
                };
                res = api.get_reference('test','/test/test/test.html');
                expect(res).toBe(null); 
                done();
            });
        });
    });
});
