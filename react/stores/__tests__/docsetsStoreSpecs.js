jest.dontMock('../docsetsStore.js');
jest.dontMock('../../actions/docsetsActions.js');

var store, actions, data, mocked_docsets, local;

describe('Docsets store', function(){
    beforeEach(function(){
        mocked_docsets = {
           '_embedded': {
              'rl:docsets': [
                { name: 'java'},
                { name: 'slash' } ]
           }
        };
        data = require('../../utils/data.js');
        data.prototype._docsets = mocked_docsets;

        actions = require('../../actions/docsetsActions.js');
        store = require('../docsetsStore.js');
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
                expect(data.setWorkingDocsets.mock.calls.length).toBe(1);
            });

            actions.getActiveDocsets();

            jest.runAllTimers();
        });

        it('should load configure docsets if user seted them', function(){
            var mocked_local_docsets = [
                    { name: 'javascript'},
                    { name: 'requirejs' } ];
            data.getWorkingDocsets.mockReturnValue(mocked_local_docsets);
            store.listen(function(state){
                expect(state).toBe(mocked_local_docsets);
            });

            actions.getActiveDocsets();

            jest.runAllTimers();
        });
    });
});
