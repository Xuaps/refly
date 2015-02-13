/** @jsx React.DOM */
jest.dontMock('../components/resultview.jsx');
var Resultview;
var TestUtils;
var routes;
var React;
React = require('react/addons');
routes = require('../components/routes.jsx');
TestUtils = React.addons.TestUtils;
Resultview = require('../components/resultview.jsx');

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
            React.renderComponent(routes, document.createElement('div'));
            var resultviewc = TestUtils.renderIntoDocument(<Resultview/>);

            resultviewc.setProps({params: 
			{docset: undefined, uri: undefined}});
			expect(resultviewc.state.initilized).toBe(false);
            expect(resultviewc.state.reference).toBe(undefined);
        });
    });

    describe('Load reference', function(){
        it('should have loaded the selected reference', function(){
            React.renderComponent(routes, document.createElement('div'));
            var resultviewc = TestUtils.renderIntoDocument(<Resultview/>);
			resultviewc.setProps({params: 
			{docset: 'slash', uri: 'test.html'}});
			expect(resultviewc.state.reference.uri)
			.toEqual('/slash/test.html');
        });
    });

});
