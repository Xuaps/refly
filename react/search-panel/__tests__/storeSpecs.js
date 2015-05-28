jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, actions, data, mocked_results, mocked_empty_results, count;

describe('Search panel store', function(){
    beforeEach(function(){
        data = require('../../infrastructure/data.js');
        actions = require('../actions.js');
        store = require('../store.js');

        mocked_last_page_results = 
            {'_embedded': {'rl:references': [{name: 'aaa', uri: 'aaa'}, {name: 'bbb', uri: 'bbb'}]}, '_links': { } };
        mocked_results = 
            {'_embedded': {'rl:references': [{name: 'aaa', uri: 'aaa'}, {name: 'bbb', uri: 'bbb'}]}, '_links': { next: 'next_link'}};
        data.prototype._references = mocked_results;
        count = 1;
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
