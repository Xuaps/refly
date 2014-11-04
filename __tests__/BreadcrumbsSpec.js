/** @jsx React.DOM */
jest.dontMock('../components/breadcrumbs.jsx');
var Resultview;
var TestUtils;
var routes;
var React;
React = require('react/addons');
routes = require('../components/routes.jsx');
TestUtils = React.addons.TestUtils;
Breadcrumbs = require('../components/breadcrumbs.jsx');

describe('ResultView Component', function(){


    describe('Load references', function(){
        it('should have loaded the complete path of the selected reference', function(){
            React.renderComponent(routes, document.createElement('div'));
            var breadcrumbsc = TestUtils.renderIntoDocument(<Breadcrumbs/>);
			breadcrumbsc.setProps({params: 
			{docset: 'node', uri: '/node.js v0.10.29/buffer'}});
			expect(breadcrumbsc.state.data.length)
			.toEqual(2);
        });
    });

});
