jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, actions, settings, data, mocked_local_docsets;

describe('Docsets store', function(){
    beforeEach(function(){
        settings = require('../../infrastructure/settings.js');

        actions = require('../actions.js');
        data = require('../../infrastructure/data.js');
        store = require('../store.js');

        mocked_local_docsets = [
                { name: 'javascript'},
                { name: 'requirejs' } ];
        settings.getWorkingDocsets.mockReturnValue(mocked_local_docsets);
        data.prototype._types = {'_embedded': {'rl:types': [ { name: 'others'}, {name: 'function'} ]}};
        data.prototype._references = {'_embedded': {'rl:references': [ { uri: '/test/test2', docset: 'requirejs', type: 'others'}, {uri: '/test/test', docset: 'requirejs', type: 'others'} ]}, '_links': {}};
    });

    describe('Load docsets', function(){
        it('should load configure docsets', function(){
            store.listen(function(state){
                expect(state).toEqual(mocked_local_docsets);
            });

            actions.load();

            jest.runAllTimers();
        });
    });
});
