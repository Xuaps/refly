/** @jsx React.DOM */
jest.dontMock('../components/outline.jsx');
jest.dontMock('./stubRouterContext.jsx');
var stubRouterContext = require('./stubRouterContext.jsx');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var Outline = require('../components/outline.jsx');
var Subject = stubRouterContext(Outline);

describe('Outline Component', function(){

    describe('Initial State', function(){
        xit('should have all children of the reference', function(){
            React.renderComponent(routes, document.createElement('div'));
            var outline = TestUtils.renderIntoDocument(<Outline/>);
			expect(outline.state.data.length).toEqual(0);
        });
    });

    describe('Select a reference', function(){
        it('should have all children of the reference', function(){
            var outline = TestUtils.renderIntoDocument(<Subject/>);
			outline.setProps({params: {docset:'node.js v0.10.29', uri: 'buffer/buffer'}});
			expect(outline._renderedComponent.state.data.length).toEqual(2);
        });
    });

});
