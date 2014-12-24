/** @jsx React.DOM */
jest.dontMock('../components/search.jsx');
jest.dontMock('q');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var Search = require('../components/search.jsx');

describe('Search Component', function(){
    var visible;
    var disposition = function(value){visible = value.action;};
    
    describe('Initial State', function(){
        it('should be empty', function(){
            TestUtils.renderIntoDocument(routes);
            var searchc = TestUtils.renderIntoDocument(<Search/>);
            blur(searchc);
			expect(searchc.state.results.length).toEqual(0);
        });
    });

    describe('Receive search by properties', function(){
        describe('empty search', function(){
            //this spec doesnt work because the method willreceiveproperties calls setfocus
            xit('should be hidden', function(){
                TestUtils.renderIntoDocument(routes);
                visible= '';
                var searchc = TestUtils.renderIntoDocument(<Search onSetDisposition={disposition}/>);
                blur(searchc);

                searchc.setProps({search: 'is'});
                expect(searchc.state.results.lenght).toBeGreaterThan(0);
                searchc.setProps({search: ''});
                expect(searchc.state.results.lenght).toBe(0);
                expect(visible).toBe('hide');
            });
        });
    });

    describe('Search references', function(){
        it('should find refrences', function(){
            TestUtils.renderIntoDocument(routes);
            var searchc = TestUtils.renderIntoDocument(<Search search={'about'}/>);
		    blur(searchc);
            expect(searchc.state.results.length).toBeGreaterThan(0);
        });
    });
    
    describe('Type in box', function(){
        describe('delete all search characters', function(){
            it('should be hidden', function(){
                TestUtils.renderIntoDocument(routes);
                visible = '';
                var searchc = TestUtils.renderIntoDocument(<Search 
                    onSetDisposition={disposition}/>);
                var searchbox = searchc.refs.searchbox.getDOMNode('#txtreference');
                blur(searchc);
                
                searchbox.value='is';
                searchc.processInput(); //workaround for debounce function and jest behaviour
                expect(searchc.state.results.length).toBeGreaterThan(0);
                    
                searchbox.value='';
                searchc.processInput();
                expect(searchc.state.results.length).toBe(0);
                expect(visible).toBe('hide');
            });
        });
    });

    function blur(search_component) 
    {
        search_component.refs.searchbox.getDOMNode().blur(); //Workaround for this bug: bit.ly/1t63vqC 
    } 
});
