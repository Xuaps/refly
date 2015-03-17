jest.dontMock('../settingsStore.js');
jest.dontMock('../../actions/settingsActions.js');
var docsets, actions, store, data;

describe('Settings store', function(){
    beforeEach(function(){
        data = require('../../utils/data.js');
        data.prototype._docsets = {'_embedded': {'rl:docsets': [{name: 'java'}, {name: 'javascript'},
            {name: 'require'}, {name: 'angular'}]}};
        data.getWorkingDocsets.mockReturnValue([{name: 'java'}, {name: 'angular'}]);
        actions = require('../../actions/settingsActions.js');
        store = require('../settingsStore.js'); 
    }); 

    it('should load working docsets preferences', function(){
        var allDocsets = [{name: 'java', active: true}, {name: 'javascript', active: false},
            {name: 'require', active: false}, {name: 'angular', active: true}];
        actions.getSettings();
        store.listen(function(state){
            expect(state.docsets).toEqual(allDocsets);
        });

        jest.runAllTimers();
    });

    describe('selection docsets changed', function(){
        it('should remove deselected working docsets', function(){
            actions.docsetSelectionChanged({name: 'java'}); 

            store.listen(function(state){
                expect(state.docsets.filter(function(d){ return d.name==='java' })[0].active).toBe(false);
                expect(data.setWorkingDocsets).toBeCalledWith([ {name: 'angular'}]);
            });
            
            jest.runAllTimers();
        });

        it('should add selected working docsets', function(){
            actions.docsetSelectionChanged({name: 'javascript'}); 

            store.listen(function(state){
                expect(state.docsets.filter(function(d){ return d.name==='javascript' })[0].active).toBe(true);
                expect(data.setWorkingDocsets).toBeCalledWith([ {name: 'java'}, {name: 'angular'}, {name: 'javascript'}]);
            });
            
            jest.runAllTimers();
        });
    });
});
