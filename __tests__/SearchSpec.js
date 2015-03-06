/** @jsx React.DOM */
jest.dontMock('../components/search.jsx');
jest.dontMock('q');
jest.dontMock('./stubRouterContext.jsx');
var stubRouterContext = require('./stubRouterContext.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Search = require('../components/search.jsx');
var Subject = stubRouterContext(Search);

describe('Search Component', function(){
    var visible;
    var disposition = function(value){visible = value.action;};
    
    describe('Initial State', function(){
        it('should be empty', function(){
            var searchc = TestUtils.renderIntoDocument(<Subject/>)._renderedComponent;
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
            var searchc = TestUtils.renderIntoDocument(<Subject search={'about'}/>)._renderedComponent;
		    blur(searchc);
            expect(searchc.state.results.length).toBeGreaterThan(0);
        });

        it('should try fill all the spaces in the results panel', function(){
            var searchc = TestUtils.renderIntoDocument(<Subject search={'about'}/>)._renderedComponent;
            var wrap = searchc.refs.wrap_panel.getDOMNode();
            var scroll = searchc.refs.scroll_panel.getDOMNode();
            blur(searchc);

            wrap.scrollHeight = 100;
            scroll.clientHeight = 10; 
            //workaround
            searchc.componentDidUpdate();

            scroll.clientHeight = 100;
            expect(searchc.state.results.length).toBe(25);
        });
    });
    
    describe('Scroll down', function(){
        it('should be load next reesult batch', function(){
            var searchc = TestUtils.renderIntoDocument(<Subject search={'about'}/>)._renderedComponent;
            blur(searchc);
            expect(searchc.state.results.length).toBe(20);
            
            var wrap = searchc.refs.wrap_panel.getDOMNode();
            wrap.scrollTop = 100;
            wrap.clientHeight = 100;
            wrap.scrollHeight = 50;
            TestUtils.Simulate.scroll(wrap);

            expect(searchc.state.results.length).toBe(25);
        });
    });

    function blur(search_component) 
    {
        search_component.refs.searchbox.getDOMNode().blur(); //Workaround for this bug: bit.ly/1t63vqC 
    } 
});
