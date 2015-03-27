var References = require('../app/references');
var filters = require('../app/filters');
var randomstring = require('randomstring');

describe('References', function() {
    var references;

    beforeEach(function(){
        references=new References();
    });

    it('should be a different instance of references', function(){
        var references2=new References();
        expect(references).not.toBe(references2);
    })
    
    describe('filter', function() {
        
        it('should filter with op EQUALS', function() {
            var aReference = 'search';
            var results = null;

            waitsFor(function() {
                return results != null;
            });

            references.filter('reference', filters.operators.EQUALS, aReference).execute().then(function(rows) {
                results = rows;
            });

            runs(function() {
                expect(results.length).toBeGreaterThan(0);
                results.forEach(function(reference) {
                    expect(reference.reference).toEqual(aReference);
                });
            });
        });
    
        it('should filter with op IN', function() {
            var aType = 'function';
            var results = null;

            waitsFor(function() {
                return results != null;
            });

            references.filter('type', filters.operators.IN, [ aType ]).execute().then(function(rows) {
                results = rows;
            });

            runs(function() {
                expect(results.length).toBeGreaterThan(0);
                results.forEach(function(reference) {
                    expect(reference.type).toEqual(aType);
                });
            });
        });

        it('should filter with op CONTAINS', function(done){
            references.filter('reference', filters.operators.CONTAINS, 'EaRc')
                .filter('docset', filters.operators.EQUALS, 'slash')
                .execute()
                .then(function(rows){
                    expect(rows.length).toEqual(3);
                    done();
                });
        });
    
        it('should combine filters', function() {
            var results = null;

            waitsFor(function() {
                return results != null;
            });

            references.filter('reference', filters.operators.EQUALS, 'search').filter('type', filters.operators.IN, [ 'function' ]).execute().then(function(rows) {
                results = rows;
            });

            runs(function() {
                expect(results.length).toBeGreaterThan(0);
                results.forEach(function(reference) {
                    expect(reference.reference).toEqual('search');
                    expect(reference.type).toEqual('function');
                });
            });
        });
    
    });

    describe('distinct', function(){
        
    });

    describe('page', function(){
        it('should return a page of results', function(done){
            references.filter('docset', filters.operators.EQUALS, 'slash').page(2,3).execute()
                .then(function(references){
                    expect(references.length).toBe(1);     
                    done();     
                });
        });
    });
    
    describe('count', function(){
        it('should return the count of elements in the collection', function(done){
            references.filter('docset', filters.operators.EQUALS, 'slash').count('total').execute()
                .then(function(res){
                    expect(res[0].total).toBe('4');
                    done();
                });
        });
    });

    describe('execute', function(){
        it('should execute the select and clean the query', function(){
            var results = null;
            
            waitsFor(function() {
                return results != null;
            });

            references
                .filter('docset', filters.operators.EQUALS, 'java')
                .execute()
                .then(function(rows){
                    references.filter('reference', filters.operators.EQUALS, 'search')
                        .execute()
                        .then(function(rows){
                            results=rows;
                        })
                })

            runs(function() {
                expect(results.length).toEqual(2);
            });

        });
    });
}); 

