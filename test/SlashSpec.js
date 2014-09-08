var proxyquire = require('proxyquire');
var sinon = require('sinon');
var Docsets = require('./stubs/docsets');

var slash = proxyquire('../app/slash', { './docsets' : Docsets });

describe('Slash', function() {
    
    beforeEach(function() {
      Docsets.prototype._collection = [
                {
                    reference: 'search',
                    type: 'function',
                    docset: 'slash',
                    content: 'blablabla'
                },
                {
                    reference: 'search',
                    type: 'constant',
                    docset: 'slash',
                    content: 'blablabla'
                },
                {
                    reference: 'search',
                    type: 'function',
                    docset: 'java',
                    content: 'blablabla'
                }
            ];
    });

    describe('Search', function(){
    
        it('should return the docsets collection filtered', function() {
            var results = null;

            waitsFor(function() {
                return results != null;
            });
            
            slash.search({
                reference: 'search',
                types: [ 'function' ],
                docsets: [ 'slash' ]
            }).then(function(response) {
                results = response;
            });

            runs(function() {
                expect(results).toEqual([{
                    reference: 'search',
                    type: 'function',
                    docset: 'slash'
                }]);
            });

        });

        it('should return the docsets collection filtered with all references that contains the pattern searched', function(done) {
            slash.search({
                reference: 'aRc'
            }).then(function(response) {
                expect(response.length).toEqual(3);
            }).fin(done);
        });
    
    });

    describe('Get', function(){

        xit('should return the reference content', function(){
            var reference = null;

            waitsFor(function() {
                return reference != null;
            });

            slash.get({
                reference: 'search',
                type: 'function',
                docset: 'slash'
            }).then(function(result){
                reference=result;
            });

            runs(function() {
                expect(reference).toEqual({
                    reference: 'search',
                    type: 'function',
                    docset: 'slash',
                    content: 'blablabla'
                });
            });
        });
    });

   describe('GetDocset', function(){
       it("return all the docsets", function(done){
           var docsets = slash.get_docsets().then(function(response){
               expect(response).toEqual(['slash','java']);
           }).fin(done);
           
           
       });
       
       
   });

});
