jest.dontMock('../store.js');
jest.dontMock('../actions.js');
var docsets, actions, store, data, settings;

describe('Settings store', function(){
    beforeEach(function(){
        settings = require('../../infrastructure/settings.js');
        data = require('../../infrastructure/data.js');
        data.prototype._users = [{email: 'test@refly.xyz'}];
        data.prototype._userDocsets = {'_embedded': {'rl:docsets': []}};
        data.prototype._docsets = {'_embedded': {'rl:docsets': [{name: 'java'}, {name: 'javascript'},
            {name: 'require'}, {name: 'angular'}]}};
        settings.getWorkingDocsets.mockReturnValue([{name: 'java'}, {name: 'angular'}]);
        actions = require('../actions.js');
        store = require('../store.js'); 
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
            actions.getSettings();
            actions.docsetSelectionChanged({name: 'java'}); 

            store.listen(function(state){
                expect(state.docsets.filter(function(d){ return d.name==='java' })[0].active).toBe(false);
                expect(settings.setWorkingDocsets).toBeCalledWith([ {name: 'angular'}]);
            });
            
            jest.runAllTimers();
        });

        it('should add selected working docsets', function(){
            actions.getSettings();
            actions.docsetSelectionChanged({name: 'javascript'}); 

            store.listen(function(state){
                expect(state.docsets.filter(function(d){ return d.name==='javascript' })[0].active).toBe(true);
                expect(settings.setWorkingDocsets).toBeCalledWith([ {name: 'java'}, {name: 'angular'}, {name: 'javascript'}]);
            });
            
            jest.runAllTimers();
        });
    });
});
