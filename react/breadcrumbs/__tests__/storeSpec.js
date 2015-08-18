jest.dontMock('../store.js');
jest.dontMock('../actions.js');

var store, actions, settings, data, mocked_local_docsets;

describe('Docsets store', function(){
    beforeEach(function(){
        settings = require('../../infrastructure/settings.js');

        actions = require('../actions.js');
        data = require('../../infrastructure/data.js');
        store = require('../store.js');

    });

    describe('Load hierarchy', function(){
        it('should load reference hierarchy without ascendants', function(){
            data.prototype._hierarchy = 
                {'_embedded': 
                    {'rl:hierarchy': 
                        [ {uri: '/docset/father/ref', docset_name: 'refly', name: 'ref'} ]
                    }
                };
            
            store.listen(function(state){
                expect(state).toEqual(
                    {
                        name: 'ref',
                        docset: 'refly',
                        ascendants: []
                    });
            });

            actions.load();

            jest.runAllTimers();
        });

        it('should load reference hierarchy with one ascendants', function(){
            data.prototype._hierarchy = 
                {'_embedded': 
                    {'rl:hierarchy': 
                        [ { uri: '/docset/father', docset_name: 'refly', name: 'father'}, 
                          {uri: '/docset/father/ref', docset_name: 'refly', name: 'ref'} ]
                    }
                };
            
            store.listen(function(state){
                expect(state).toEqual(
                    {
                        name: 'ref',
                        docset: 'refly',
                        ascendants: [{name:'father',uri:'father', docset:'refly'}]
                    });
            });

            actions.load();

            jest.runAllTimers();
        });

        it('should load reference hierarchy withn more than two ascendants', function(){
            data.prototype._hierarchy = 
                {'_embedded': 
                    {'rl:hierarchy': 
                        [ { uri: '/docset/great', docset_name: 'refly', name: 'great'}, 
                          { uri: '/docset/great/grandfather', docset_name: 'refly', name: 'grandfather'},
                          { uri: '/docset/great/grandfather/father', docset_name: 'refly', name: 'father'}, 
                          { uri: '/docset/great/grandfather/father/ref', docset_name: 'refly', name: 'ref'}]
                    }
                };
            
            store.listen(function(state){
                expect(state).toEqual(
                    {
                        name: 'ref',
                        docset: 'refly',
                        ascendants: [{name:'...',uri:'great/grandfather', docset: 'refly'},
                                    {name:'father',uri:'great/grandfather/father', docset: 'refly'}]
                    });
            });

            actions.load();

            jest.runAllTimers();
        });
    });
});


