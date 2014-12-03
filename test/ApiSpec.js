var proxyquire = require('proxyquire');
var slash = {};
var api = proxyquire('../app/api.js', {'./slash.js': slash});

describe('Refly API', function(){
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

    describe('References collection', function(){
        it('should return a max of 20 references found', function(done){
            var pattern = '';
            api.get_references(pattern)
                .then(function(references){
                    expect(references.embeds.references.length).toBeLessThan(21);
                    done();
                });
        });

        it('should return only references that contains the given pattern', function(){
            var pattern = 'is';
            api.get_references(pattern)
                .then(function(references){
                    references.embeds.references.forEach(function(ref){
                        expect(ref.data.name.toLowerCase()).toContain(pattern);
                    });
                });
        });
    });
});
