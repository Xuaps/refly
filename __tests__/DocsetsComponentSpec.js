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


    describe('General state', function(){
        it('should load all the docset', function(){
            React.renderComponent(routes, document.createElement('div'));
            var docsetc = TestUtils.renderIntoDocument(<Docset/>);
			docsetc.loadData();
			expect(docsetc.state.data.length).toEqual(2);
        });
    });
    describe('Item', function(){
        it('change href', function(){
            React.renderComponent(routes, document.createElement('div'));
            var docsetc = TestUtils.renderIntoDocument(<Docset/>);
            docsetc.loadData();
            var link = TestUtils.scryRenderedDOMComponentsWithTag(docsetc, 'a')[0];
            expect(link.props.href).toEqual('javascript/')
        });

        it('check the dates of the docsets', function(){
            React.renderComponent(routes, document.createElement('div'));
            var docsetc = TestUtils.renderIntoDocument(<Docset/>);
            docsetc.loadData();
            expect(docsetc.state.data[0].latest_version_date).toEqual(null);
            expect(new Date()).toBeGreaterThan(new Date(docsetc.state.data[1].latest_version_date));
        });
    });
});
