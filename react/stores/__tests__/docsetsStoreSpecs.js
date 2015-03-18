jest.dontMock('../docsetsStore.js');
jest.dontMock('../../actions/docsetsActions.js');

var store, actions, settings;

describe('Docsets store', function(){
    beforeEach(function(){
        settings = require('../../utils/settings.js');

        actions = require('../../actions/docsetsActions.js');
        store = require('../docsetsStore.js');
    });

    describe('Load docsets', function(){
        it('should load configure docsets', function(){
            var mocked_local_docsets = [
                    { name: 'javascript'},
                    { name: 'requirejs' } ];
            settings.getWorkingDocsets.mockReturnValue(mocked_local_docsets);
            store.listen(function(state){
                expect(state).toEqual(mocked_local_docsets);
            });

            actions.getActiveDocsets();

            jest.runAllTimers();
        });
    });
});
