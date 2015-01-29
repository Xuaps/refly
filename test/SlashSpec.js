var proxyquire = require('proxyquire');
var sinon = require('sinon');
var References = require('./stubs/references');
var Docsets = require('./stubs/docsets');

var slash = proxyquire('../app/slash', { './references' : References, './docsets': Docsets });

describe('Slash', function() {
    
    beforeEach(function() {
      References.prototype._collection = [
                {
                    reference: 'search',
                    uri: 'search',
                    parent_uri: null,
                    type: 'function',
                    docset: {name: 'slash',active: true},
                    content: 'blablabla'
                },
                {
                    reference: 'search',
                    uri: 'searchconstant',
                    parent_uri: 'search',
                    type: 'constant',
                    docset: {name: 'slash',active: true},
                    content: 'blablabla'
                },
                {
                    reference: 'search',
                    uri: 'searchfunction',
                    parent_uri: 'searchconstant',
                    type: 'function',
                    docset: {name: 'java',active: false},
                    content: 'blablabla'
                },
                {
                    reference: 'json',
                    uri: 'json.parse',
                    parent_uri: 'JSON',
                    type: 'function',
                    docset: {name: 'javascript',active: true},
                    content: 'blablabla'
                }
            ];
        Docsets.prototype._collection = [
            {},{},{}
        ];
    });

    describe('Search', function(){
    
        it('should return the docsets collection filtered', function() {
            var results = null;

            waitsFor(function() {
                return results != null;
            });
            
            slash.search({
                name: 'search',
                types: [ 'function' ],
                docsets: [ 'slash' ]
            }).then(function(response) {
                results = response;
            });

            runs(function() {
                expect(results).toEqual([{
                    reference: 'search',
                    type: 'function',
                    docset: {name: 'slash', active: true},
					uri: 'search'
                }]);
            });
        });

        it('should return only active`s docset references', function(done){
            slash.search({
                    name: 'json'
            }).then(function(response){
                expect(response.length).toEqual(1);
            }).fin(done);
        });

        it('should return the docsets collection filtered with all references that contains the pattern searched', function(done) {
            slash.search({
                name: 'aRc'
            }).then(function(response) {
                expect(response.length).toEqual(2);
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
					uri: 'searchfunction2',
                    docset: 'slash',
                    content: 'blablabla',
                    parent_uri: 'searchconstant'
                });
            });
        });
    });
 
   describe('GetDocset', function(){
       it("return all the docsets", function(done){
           var docsets = slash.get_docsets().then(function(response){
               expect(response.length).toEqual(3);
           }).fin(done);
       });
   });

   describe('GetTypes', function(){
       it("return all the types of a given docsets", function(done){
           var docsets = slash.get_types(['slash']).then(function(response){
               expect(response.length).toEqual(2);
               expect(response).toContain('function');
               expect(response).toContain('constant');
           }).fin(done);           
       });

   });

   describe('Breadcrumbs', function(){
       xit("return the complete path of a given docsets", function(done){
           var docsets = slash.breadcrumbs('searchconstant').then(function(response){
               expect(response.length).toEqual(3);
           }).fin(done);
       });

   });

   describe('Branch', function(){

       xit("return all reference from the same branch of a specific reference", function(done){
           var docsets = slash.branch('searchconstant').then(function(response){
               expect(response.length).toEqual(3);
           }).fin(done); 
       });       
   });
});
