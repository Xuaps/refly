jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, actions, settings, data, mocked_results, mocked_empty_results, count, singledocsetcount;

describe('Search panel store', function(){
    beforeEach(function(){
        data = require('../../infrastructure/data.js');
        settings = require('../../infrastructure/settings.js');
        actions = require('../actions.js');
        store = require('../store.js');
        mocked_last_page_results = 
            {'_embedded': {'rl:references': [{name: 'aaa', uri: 'aaa'}, {name: 'bbb', uri: 'bbb'}]}, '_links': { } };
        mocked_results = 
            {'_embedded': {'rl:references': [{name: 'aaa', uri: 'aaa'}, {name: 'bbb', uri: 'bbb'}]}, '_links': { next: 'next_link'}};
        mocked_results_single_docset = 
            {'_embedded': {'rl:references': [{name: 'aaa', uri: 'aaa'},{name: 'aaa2', uri: 'aaa2'}]}, '_links': { next: 'next_link'}};
        mocked_docsets = {name: 'a'};
        data.prototype._docsets = mocked_docsets;
        data.prototype._references = mocked_results;
        count = 1;
        singledocsetcount = 0;
    });
    
    afterEach(function(){
        jest.runAllTimers();
    });

    describe('Search reference', function(){
        describe('start a search', function(){
            it('should return the page results', function(){
                actions.searchReference('test',1);
                store.listen(function(status){
                    expect(status.results).toEqual(mocked_results['_embedded']['rl:references']);
                });
            });
        });

        describe('continue the search', function(){
            it('should return accumulated results', function(){
                actions.searchReference('test',1);
                actions.searchReference('test',2); 
                store.listen(function(status){
                    expect(status.results.length).toBe(2*count);
                    count += 1;
                });
            });


            it('should return only results from a single docset', function(){
                data.prototype._references = mocked_results_single_docset;
                actions.searchDocset('a');
                actions.searchReference('a',1);
                store.listen(function(status){
                    if(singledocsetcount>0){
                        singledocsetcount++;
                        expect(status.results.length).toBe(2);
                        expect(status.docset.name).toBe('a');
                    }
                });
            });

            it('should return all the active docsets', function(){
                var mocked_local_docsets = [
                        { name: 'aaa'},
                        { name: 'bbb' } ];
                settings.getWorkingDocsets.mockReturnValue(mocked_local_docsets);
                data.searchReference = jest.genMockFunction().mockImplementation(function(pattern, page, docsets) {
                    return this.wrapInPromise(data.prototype._references);
                });
                actions.searchReference('test',1);
                
                store.listen(function(status){
                    expect(data.searchReference.mock.calls[0][2].length).toBe(2);
                });
            });

            it('shouldnt repeat a loaded page', function(){
                actions.searchReference('test',1);
                actions.searchReference('test',2); 
                actions.searchReference('test',2);
                store.listen(function(status){
                    if(count<3)
                        expect(status.results.length).toBe(2*count);
                    else
                        expect(status.results.length).toBe(4);
                    count += 1;
                });
            });
        });

        describe('reach the end of the search', function(){
            it('should return an error', function(){
                data.prototype._references = mocked_last_page_results;
                actions.searchReference('test',1);
                store.listen(function(status){
                    expect(status.reached_end).toBe(true);
                });
            });
        });
    });

    describe('mark a results', function(){
        it('should mark the result and unmark any other', function(){
            actions.searchReference('test', 1);
            actions.markReference('aaa');
            actions.markReference('bbb');

            store.listen(function(status){
                if(count===2){
                   expect(status.results[0].marked).toBe(true);
                   expect(status.results[1].marked).toBe(false);
                }else if(count===3){
                   expect(status.results[1].marked).toBe(true);
                   expect(status.results[0].marked).toBe(false);
                } 
                count += 1;
            });
        });
    });
});
