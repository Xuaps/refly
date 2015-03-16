jest.dontMock('../stores/docsetsStore.js');
jest.dontMock('../actions/docsetsActions.js');

var store, actions, proxy, mocked_docsets, local;

describe('Docsets store', function(){
    beforeEach(function(){
        mocked_docsets = {
           '_embedded': {
              'rl:docsets': [
                { name: 'java'},
                { name: 'slash' } ]
           }
        };
        proxy = require('../utils/proxy.js');
        proxy.prototype._docsets = mocked_docsets;
        local = require('store2');

        actions = require('../actions/docsetsActions.js');
        store = require('../stores/docsetsStore.js');
    });

    describe('Load docsets', function(){
        it('should load default docsets if user didnt set his own', function(){
            store.listen(function(state){
                expect(state).toBe(mocked_docsets['_embedded']['rl:docsets']);
            });

            actions.getActiveDocsets();

            jest.runAllTimers();
        });

        it('should set default docsets as configured docsets if user didnt set them', function(){
            store.listen(function(state){
                expect(local.set.mock.calls.length).toBe(1);
            });

            actions.getActiveDocsets();

            jest.runAllTimers();
        });

        it('should load configure docsets if user seted them', function(){
            var mocked_local_docsets = [
                    { name: 'javascript'},
                    { name: 'requirejs' } ];
            local.get.mockReturnValue(mocked_local_docsets);
            store.listen(function(state){
                expect(state).toBe(mocked_local_docsets);
            });

            actions.getActiveDocsets();

            jest.runAllTimers();
        });
    });
});
