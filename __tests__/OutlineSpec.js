/** @jsx React.DOM */
jest.dontMock('../public/js/WebClient/Reference.js');
jest.dontMock('../components/outline.jsx');
var TreeView;
var TestUtils;
var routes;
var React;

describe('Outline Component', function(){
    beforeEach(function(){
        React = require('react/addons');
        routes = require('../components/routes.jsx');
        TestUtils = React.addons.TestUtils;
        Outline = require('../components/outline.jsx');
    });

    describe('Initial State', function(){
        xit('should have all children of the reference', function(){
            React.renderComponent(routes, document.createElement('div'));
            var outline = TestUtils.renderIntoDocument(<Outline params={{splat: ''}}/>);
			expect(outline.state.data.length).toEqual(0);
        });
    });

    describe('Select a reference', function(){
        it('should have all children of the reference', function(){
            React.renderComponent(routes, document.createElement('div'));
            var outline = TestUtils.renderIntoDocument(<Outline/>);
			outline.setProps({params: {splat: '/node.js+v0.10.29/buffer/buffer/+buffer.isencoding(encoding)'}});
			expect(outline.state.data.length).toEqual(2);
        });
    });

});
