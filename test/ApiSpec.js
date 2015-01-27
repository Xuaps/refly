var proxyquire = require('proxyquire');
var referencesMock = require('./stubs/references.js');
var slash = proxyquire('../app/slash.js', {'./references': referencesMock});
var api = proxyquire('../app/api.js', {'./slash.js': slash});

describe('Refly API', function(){
    beforeEach(function() {
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
    });
    describe('get_reference', function(){
        describe('reference doesnt exist', function(){
            it('should return null', function(done){
                api.get_reference('test','/test/test/test.html')
                    .then(function(res){
                        expect(res).toBe(null); 
                        done();
                    });
            });
        });
    });

    describe('References collection', function(){
        it('should return a max of 20 references found', function(done){
            var pattern = '';
            api.get_references(pattern)
                .then(function(references){
                    expect(references.embeds['rl:references'].length).toBeLessThan(21);
                    done();
                });
        });

        it('should return only references that contains the given pattern', function(done){
            var pattern = 'eAr';
            expect(referencesMock.prototype._collection.length).toBe(23);
            api.get_references(pattern)
                .then(function(references){
                    expect(references.embeds['rl:references'].length).toBe(3);
                    references.embeds['rl:references'].forEach(function(ref){
                        expect(ref.data.name.toLowerCase()).toContain(pattern.toLowerCase());
                    });
                    done();
                });
        });
    });
});
