/** @jsx React.DOM */
jest.dontMock('../components/docsets.jsx');
var Docset;
var TestUtils;
var routes;
var React;
React = require('react/addons');
routes = require('../components/routes.jsx');
TestUtils = React.addons.TestUtils;
Docset = require('../components/docsets.jsx');

describe('Docset Component', function(){

    describe('Initial State', function(){
        xit('should be empty', function(){
            React.renderComponent(routes, document.createElement('div'));
            var Docsetc = TestUtils.renderIntoDocument(<Docsets/>);
			expect(Docsetc.state.data.length).toEqual(0);
        });
    });

    describe('Docsets', function(){
        it('should load all the docset', function(){
            React.renderComponent(routes, document.createElement('div'));
            var docsetc = TestUtils.renderIntoDocument(<Docsets/>);
			docsetc.loadData();
			expect(docsetc.state.length).toEqual(2);
        });
    });

});
