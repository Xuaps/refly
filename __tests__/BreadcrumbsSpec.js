/** @jsx React.DOM */
jest.dontMock('../components/breadcrumbs.jsx');
jest.dontMock('./stubRouterContext.jsx');
var stubRouterContext = require('./stubRouterContext.jsx');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Breadcrumbs = require('../components/breadcrumbs.jsx');
var Subject = stubRouterContext(Breadcrumbs);

describe('ResultView Component', function(){
    describe('Load references', function(){
        it('should have loaded the complete path of the selected reference', function(){
            var breadcrumbsc = TestUtils.renderIntoDocument(<Subject/>);
			breadcrumbsc.setProps({params: 
			{docset: 'node', uri: '/node.js v0.10.29/buffer'}});
			expect(breadcrumbsc._renderedComponent.state.data.length)
			.toEqual(2);
        });
    });

});
