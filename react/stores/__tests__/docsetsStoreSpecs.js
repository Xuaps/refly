jest.dontMock('../docsetsStore.js');
jest.dontMock('../../actions/treeviewActions.js');

var store, actions, settings, data;

describe('Docsets store', function(){
    beforeEach(function(){
        settings = require('../../utils/settings.js');

        actions = require('../../actions/treeviewActions.js');
        data = require('../../utils/data.js');
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

            actions.load();

            jest.runAllTimers();
        });
    });

    describe('Mark reference', function(){
        it('should mark selecetd reference and dismark any other', function(){
            var count =0;
            var mocked_local_docsets = [
                    { name: 'javascript'},
                    { name: 'requirejs' } ];
            settings.getWorkingDocsets.mockReturnValue(mocked_local_docsets);
            data.prototype._types = {'_embedded': {'rl:types': [ { name: 'others'}, {name: 'function'} ]}};
            data.prototype._references = {'_embedded': {'rl:references': [ { uri: '/test/test2', docset: 'requirejs', type: 'others'}, {uri: '/test/test', docset: 'requirejs', type: 'others'} ]}, '_links': {}};
            actions.load();
            actions.selectDocset('requirejs');
            actions.selectType('requirejs', 'others', 0);
            actions.selectReference({uri: '/test/test2', docset: 'requirejs', type: 'others', marked: false});
            actions.selectReference({uri: '/test/test', docset: 'requirejs', type: 'others', marked: false});

            store.listen(function(state){
                if(count===3){
                    expect(state[1].types[0].references[0].marked).toBe(true);
                }else if(count===4){
                    expect(state[1].types[0].references[0].marked).toBe(false);
                    expect(state[1].types[0].references[1].marked).toBe(true);
                }
                count+=1;
            });

            jest.runAllTimers();
        });
    });
});
