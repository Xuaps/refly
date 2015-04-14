jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, data, ReferenceNotFoundError;

describe('Resultview status', function(){
    beforeEach(function(){
        store = require('../store.js');
        actions = require('../actions.js');
        data = require('../../utils/data.js');
        ReferenceNotFoundError = require('../../errors/reference-not-found.js');
    });
    
    afterEach(function(){
        jest.runAllTimers();
    });

    describe('state after load', function(){
        it('should be a reference', function(){
            var docset = 'test';
            var uri = 'test_uri/uri';
            var mock_ref = { name: 'test'};
            data.prototype._references = [mock_ref];

            actions.loadReference(docset, uri);
            store.listen(function(status){
                expect(status).toBe(mock_ref);
            });
        });
    });

    describe('state after dont found a reference', function(){
        it('should be null', function(){
            var docset = 'test';
            var uri = 'test_uri/uri';
            var mock_ref = { name: 'test'};
            data.getReference = jest.genMockFunction().mockReturnValue(
                {then:function(){
                                    return {fail: function(f){
                                                    f(new ReferenceNotFoundError());
                                                    return {done:function(){}};
                                                }
                                            }
                                 }
                });

            actions.loadReference(docset, uri);
            store.listen(function(status){
                expect(status).toBe(null);
            });
        });
    });
});

