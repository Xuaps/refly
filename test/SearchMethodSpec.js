var slash = require('../app/slash');   
var sinon = require('sinon');
var docsets = require('../app/docsets');

describe('Slash', function() {
    
    describe('Search', function(){
    
        it('', function() {
            var results = null;

            waitsFor(function() {
                return results != null;
            });

            var expectedItem = {
                name: 'search',
                type: 'function',
                docset: 'slash',
                uri: 'slash://slash.search'
            };

            sinon.stub(docsets, 'toArray', function() {
                return [ expectedItem ];
            });

            slash.search({ reference: 'search',
                types: [ 'function' ],
                docsets: [ 'Slash' ]
            }).then(function(response) {
                results = response;
            });

            runs(function() {
                expect(results).toEqual([expectedItem]);
            });

        });
    
    });

});
