var proxyquire = require('proxyquire');
var sinon = require('sinon');
var docsets = require('./stubs/docsets');

var slash = proxyquire('../app/slash', { './docsets' : docsets });

describe('Slash', function() {
    
    describe('Search', function(){
    
        it('should return the docsets collection filtered', function() {
            var results = null;

            waitsFor(function() {
                return results != null;
            });

            docsets._collection = [
                {
                    reference: 'search',
                    type: 'function',
                    docset: 'slash',
                    uri: 'slash://slash.search'
                },
                {
                    reference: 'search',
                    type: 'constant',
                    docset: 'slash',
                    uri: 'slash://slash.search'
                },
                {
                    reference: 'search',
                    type: 'function',
                    docset: 'java',
                    uri: 'slash://java.println'
                }
            ];

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
                    docset: 'slash',
                    uri: 'slash://slash.search'
                }]);
            });

        });
    
    });

});
