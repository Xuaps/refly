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
                    uri: 'searchconstant',
                    parent_uri: 'search',
                    type: 'constant',
                    docset: {name: 'slash',active: true},
                    content: 'blablabla'
                },
                {
                    reference: 'search',
                    uri: 'searchconstant',
                    parent_uri: 'search',
                    type: 'method',
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
                    reference: 'prueba',
                    uri: 'pruebas',
                    parent_uri: null,
                    type: 'function',
                    docset: {name: 'require',active: true},
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

    describe('Search references', function(){
    
        it('should return the references collection filtered', function() {
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
                expect(results.items).toEqual([{
                    reference: 'search',
                    type: 'function',
                    docset: {name: 'slash', active: true},
					uri: 'search',
                    total: 1 //TODO: the stub has its own implementation we have to change all that.
                }]);
            });
        });

        it('should return the references collection filtered with all references that contains the pattern searched', function(done) {
            slash.search({
                name: 'aRc'
            }).then(function(response) {
                expect(response.items.length).toEqual(4);
            }).fin(done);
        });
        
        it('should return page x of size y if page and pagesize are indicated', function(done){
            slash.search({
                page: 2,
                name: 'aRc',
                pagesize: 3}).then(function(response){
                    expect(response.items.length).toEqual(1);
                    done();
                });
        });     

        it('should return total of references that meet the conditions', function(done){
            slash.search({
                name:'aRc'}).then(function(response){
                    expect(response.total).toEqual(4);
                    done();
                });
        });

        it('should return total equal to 0 if any reference meets the conditions', function(done){
            slash.search({
                name:'rtrrrraRc'}).then(function(response){
                    expect(response.total).toEqual(0);
                    done();
                });
        });

        it('should return only active`s docset references', function(done){
            slash.search({
                    name: 'search'
            }).then(function(response){
                expect(response.items.length).toEqual(4);
            }).fin(done);
        });

        it('should return only references in indicated docsets', function(done){
            slash.search({ docsets: ['require', 'javascript'] })
                .then(function(response){
                    expect(response.items.length).toEqual(2);
                    done();
                });
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
               expect(response.length).toEqual(3);
               expect(response).toContain('function');
               expect(response).toContain('constant');
               done();
           }).fail(function(err){ console.log(err);});     
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
