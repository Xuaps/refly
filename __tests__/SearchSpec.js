/** @jsx React.DOM */
jest.dontMock('../components/search.jsx');
var Search;
var TestUtils;
var routes;
var React;
React = require('react/addons');
routes = require('../components/routes.jsx');
TestUtils = React.addons.TestUtils;
Search = require('../components/search.jsx');

describe('Search Component', function(){

    describe('Initial State', function(){
        xit('should be empty', function(){
            React.renderComponent(routes, document.createElement('div'));
            var searchc = TestUtils.renderIntoDocument(<Search/>);
			expect(searchc.state.data.length).toEqual(0);
        });
    });

    describe('Search references', function(){
        xit('should have all reference that contains "about"', function(){
            React.renderComponent(routes, document.createElement('div'));
            var searchc = TestUtils.renderIntoDocument(<Search/>);
			searchc.setProps({search: 'about'});
			expect(searchc.state.data.length).toEqual(2);
        });
    });

});
