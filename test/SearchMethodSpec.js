var slash = require('../app/slash');   
var sinon = require('sinon');
var docsets = require('../app/docsets');

describe('Slash', function() {
    
    describe('Search', function(){
    
        it('should return a ', function() {
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
                    reference: 'println',
                    type: 'function',
                    docset: 'java',
                    uri: 'slash://java.println'
                }
            ];

            slash.search({
                reference: 'search',
                types: [ 'function' ],
                docsets: [ 'Slash' ]
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
