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

    describe('Load reference', function(){
        it('should have loaded the selected reference', function(){
            React.renderComponent(routes, document.createElement('div'));
            var resultviewc = TestUtils.renderIntoDocument(<Resultview/>);
			resultviewc.setProps({params: 
			{docset: 'node', uri: 'aaaaa'}});
			expect(resultviewc.state.reference[0].uri)
			.toEqual('/node/aaaaa');
        });
    });

});
