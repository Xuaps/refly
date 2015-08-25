jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, actions, settings, data, mocked_results, mocked_last_page_results, mocked_types;

describe('Sidebar menu store', function(){
    beforeEach(function(){
        data = require('../../infrastructure/data.js');
        settings = require('../../infrastructure/settings.js');
        actions = require('../actions.js');
        store = require('../store.js');
        mocked_types = {'_embedded': {'rl:types': [ { name: 'others'}, {name: 'function'}, {name: 'class'}, {name: 'object'} ]}};
        mocked_last_page_results = 
            {'_embedded': {'rl:references': [{name: 'jstest1', uri: 'jstest1', type: 'function'}, {name: 'jstest2', uri: 'jstest2', type: 'function'}]}, '_links': { } };
        mocked_results = 
            {'_embedded': {'rl:references': [{name: 'jstest3', uri: 'jstest3', type: 'function'}, {name: 'jstest4', uri: 'jstest4', type: 'function'}]}, '_links': { next: 'next_link'} };
        settings.getWorkingDocsets.mockReturnValue([{name: 'JavaScript'}, {name: 'DOM'}]);
        mocked_docsets = [{name: 'JavaScript'}, {name: 'DOM'}];
        data.prototype._docsets = mocked_docsets;
        data.prototype._references = mocked_results;
        data.prototype._types = mocked_types;
    });
    
    afterEach(function(){
        jest.runAllTimers();
    });

    describe('Navigate through the menu', function(){

        describe('Load docset list', function(){
            it('should return a list of the active docsets', function(){
                actions.loadDocsets();
                store.listen(function(status){
                    expect(status.data.results).toEqual(mocked_docsets);
                });
            });
        });

        describe('Load type list', function(){
            it('should return a list of the types in a selected docset', function(){
                data.prototype._docsets = {name: 'JavaScript'};
                var expected_types = [ { name: 'others'}, {name: 'function'}, {name: 'class'}, {name: 'object'} ];
                actions.loadTypes('javascript');
                store.listen(function(status){
                    expect(status.data.results).toEqual(expected_types);
                    expect(status.data.selected_docset).toEqual({name: 'JavaScript'});
                });
            });
        });

        describe('Load reference list', function(){
            it('should return a list of references of a selected type and docset', function(){
                data.prototype._docsets = {name: 'JavaScript'};
                var expected_references = [{name: 'jstest3', uri: 'jstest3', type: 'function'}, {name: 'jstest4', uri: 'jstest4', type: 'function'}];
                actions.loadReferencesByType('javascript', 'function',1);
                store.listen(function(status){
                    expect(status.data.results).toEqual(expected_references);
                    expect(status.data.selected_docset).toEqual({name: 'JavaScript'});
                    expect(status.data.selected_type).toEqual('function');
                });
            });
            it('should return a list of references with the same type of a selected reference', function(){
                data.getReference = jest.genMockFunction().mockImplementation(function(docset, uri) {
                    return this.wrapInPromise({name: 'jstest3', uri: 'jstest3', type: 'function'});
                });
                data.prototype._docsets = {name: 'JavaScript'};
                var expected_references = [{name: 'jstest3', uri: 'jstest3', type: 'function'}, {name: 'jstest4', uri: 'jstest4', type: 'function'}];
                actions.loadReferencesByUri('javascript', 'jstest3',1);
                store.listen(function(status){
                        expect(status.data.results).toEqual(expected_references);
                        expect(status.data.selected_docset).toEqual({name: 'JavaScript'});
                        expect(status.data.selected_type).toEqual('function');
                });
            });
        });


        describe('reach the end of a list of references', function(){
            it('should return an error', function(){
                data.prototype._references = mocked_last_page_results;
                actions.loadReferencesByType('javascript', 'function',1);
                store.listen(function(status){
                    expect(status.data.reached_end).toBe(true);
                });
            });
        });
    });

});
