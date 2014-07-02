var sinon = require('sinon');
var Docsets = require('../app/docsets');
var filters = require('../app/filters');

describe('Docset', function() {
    var docsets;

    beforeEach(function(){
        docsets=new Docsets();
    });

    it('should be a different instance of docsets', function(){
        var docsets2=new Docsets();
        expect(docsets).not.toBe(docsets2);
    })
    
    describe('filter', function() {
        
        it('should filter with op EQUALS', function() {
            var aReference = 'search';
            var results = null;

            waitsFor(function() {
                return results != null;
            });

            docsets.filter('reference', filters.operators.EQUALS, aReference).then(function(rows) {
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

            docsets.filter('type', filters.operators.IN, [ aType ]).then(function(rows) {
                results = rows;
            });

            runs(function() {
                expect(results.length).toBeGreaterThan(0);
                results.forEach(function(reference) {
                    expect(reference.type).toEqual(aType);
                });
            });
        });
    
        it('should combine filters', function() {
            var results = null;

            waitsFor(function() {
                return results != null;
            });

            docsets.filter('reference', filters.operators.EQUALS, 'search').filter('type', filters.operators.IN, [ 'function' ]).then(function(rows) {
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
    
    describe('then', function(){
        xit('should execute the select and clean the query', function(){

        });
    });

    describe('addRefsRange', function(){
        xit('should add a bunch of objects if they arent presnts in the collections', function(){
             var ended = false;

            waitsFor(function() {
                return ended;
            });

            docsets.addRefsRange(
                [
                    {reference: 'a',
                    type: 'class',
                    docset: 'test'
                    },
                    {reference: 'a',
                    type: 'function',
                    docset: 'test'
                    }
                ]   
                ).then(function(){
                    ended=true;
                });

            runs(function() {
                var docs = new Docsets();
                docs.filter('reference', filters.operator.EQUALS, 'a').then(function(result){
                    expect(result.length).toEqual(2);
                })
            }); 
        });

        xit('should update a bunch of objects if they are presents in the collections', function(){

        });
    })
}); 

