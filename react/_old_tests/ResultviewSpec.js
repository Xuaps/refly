/** @jsx React.DOM */
jest.dontMock('../components/resultview.jsx');
jest.dontMock('./stubRouterContext.jsx');
jest.dontMock('jquery-browserify');
var stubRouterContext = require('./stubRouterContext.jsx');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var Resultview = require('../components/resultview.jsx');
var Subject = stubRouterContext(Resultview);

describe('ResultView Component', function(){

    describe('Initial State', function(){
        xit('should be empty', function(){
            React.renderComponent(routes, document.createElement('div'));
            var resultviewc = TestUtils.renderIntoDocument(<Resultview/>);
			expect(resultviewc.state.reference.length).toEqual(0);
        });
    });

    describe('search when reference is not found', function(){
        it('should check the search comes from a reference not found search', function(){
            var resultviewc = TestUtils.renderIntoDocument(<Subject/>);

            resultviewc.setProps({params: 
			{docset: undefined, uri: undefined}});
			expect(resultviewc._renderedComponent.state.initilized).toBe(false);
            expect(resultviewc._renderedComponent.state.reference).toBe(undefined);
        });
    });

    describe('Load reference', function(){
        it('should have loaded the selected reference', function(){
            var resultviewc = TestUtils.renderIntoDocument(<Subject/>);
			resultviewc.setProps({params: 
			{docset: 'slash', uri: 'test.html'}});
			expect(resultviewc._renderedComponent.state.reference.uri)
			.toEqual('/slash/test.html');
        });
    });

});
