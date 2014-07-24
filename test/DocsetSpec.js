var sinon = require('sinon');
var Docsets = require('../app/docsets');
var filters = require('../app/filters');
var randomstring = require('randomstring');

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

            docsets.filter('reference', filters.operators.EQUALS, aReference).execute().then(function(rows) {
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

            docsets.filter('type', filters.operators.IN, [ aType ]).execute().then(function(rows) {
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
            docsets.filter('reference', filters.operators.CONTAINS, 'EaRc')
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

            docsets.filter('reference', filters.operators.EQUALS, 'search').filter('type', filters.operators.IN, [ 'function' ]).execute().then(function(rows) {
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
    
    describe('execute', function(){
        it('should execute the select and clean the query', function(){
            var results = null;
            
            waitsFor(function() {
                return results != null;
            });

            docsets
                .filter('docset', filters.operators.EQUALS, 'java')
                .execute()
                .then(function(rows){
                    docsets.filter('reference', filters.operators.EQUALS, 'search')
                        .execute()
                        .then(function(rows){
                            results=rows;
                        })
                })

            runs(function() {
                expect(results.length).toEqual(3);
            });

        });
    });

    describe('addRefsRange', function(){
        it('should add a bunch of objects if they arent presnts in the collections', function(){
            var ended = false;
            var name = randomstring.generate(7);
            var docs = new Docsets();
            var count_after_add = 0;
            var rows;

            waitsFor(function() {
                return ended && rows;
            });

            docs.execute().then(function(result){
                count_after_add = result.length;
                docsets.addRefsRange(
                [
                    {reference: name,
                    type: 'class',
                    docset: 'test',
                    content: 'tachan',
                    uri: 'test_' + name + '.html'
                    },
                    {reference: name,
                    type: 'function',
                    docset: 'test',
                    content: 'juas',
                    parent:'test_' + name + '.html',
                    uri: 'test_2' + name + '.html'
                    },
                    {reference: 'search',
                    type: 'function',
                    docset: 'slash',
                    content: 'This is an example\n-----\n\nexample.foo(bar)\n\n**some** descriptive *text*\n\n\t\t\t\tfunction example.foo(bar){\n\t\t\t\t\treturn bar;\n\t\t\t\t}',
                    uri: 'test_22.html'
                    }
                ]   
                ).execute().then(function(res){
                    ended=true;
                    docs.execute().then(function(result){
                        rows = result;
                    })
                });
            });

            runs(function() {
                expect(rows.length).toEqual(count_after_add+2);
            }); 
        });

        it('should update a bunch of objects if they are presents in the collections', function(){
            var ended_first = false;
            var rows;
            var content = randomstring.generate(20);
            var docs = new Docsets();

            waitsFor(function() {
                return ended_first && rows;
            });

            docsets.addRefsRange(
                [
                    {reference: 'update',
                    type: 'function',
                    docset: 'test',
                    content: content,
                    uri: 'test_23.html'
                    }
                ]   
                ).execute().then(function(res){
                    ended_first=true;
                    docs
                    .filter('reference', filters.operators.EQUALS, 'update')
                    .filter('type', filters.operators.EQUALS, 'function')
                    .filter('docset', filters.operators.EQUALS, 'test')
                    .execute().then(
                        function(result){
                            rows = result;                        
                    });
                });

            runs(function() {
                expect(rows.length).toEqual(1);
                expect(rows[0].content).toEqual(content);
            }); 
        });

        it('is overriding references with same type, name, and docset but different parent', function(done){
            var ended = false;
            var docs = new Docsets();
            var name = randomstring.generate(7);
            var count_after_add = 0;
            var rows;

            docsets.addRefsRange(
            [
                {reference: 'overriding'+name,
                type: 'function',
                docset: 'test',
                content: '',
                parent:'test_2.html',
                uri: 'test2_' + randomstring.generate(20) + '.html'
                },
                {reference: 'overriding'+name,
                type: 'function',
                docset: 'test',
                content: '',
                parent:'test_22.html',
                uri: 'test2_' + randomstring.generate(20) + '.html'
                },
            ]   
            ).execute().then(function(res){
                docs
                    .filter('reference', filters.operators.EQUALS, 'overriding'+name)
                    .filter('type', filters.operators.EQUALS, 'function')
                    .filter('docset', filters.operators.EQUALS, 'test')
                    .execute().then(
                        function(result){
                            expect(result.length).toEqual(2);
                            done();                        
                    });
            });
    
        });
    });
}); 

