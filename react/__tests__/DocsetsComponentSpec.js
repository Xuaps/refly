/** @jsx React.DOM */
jest.dontMock('../components/docsets.jsx');
jest.dontMock('./stubRouterContext.jsx');
var stubRouterContext = require('./stubRouterContext.jsx');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var Docset = require('../components/docsets.jsx');
var Subject = stubRouterContext(Docset);

describe('Docset Component', function(){


    describe('General state', function(){
        it('should load all the docset', function(){
            var docsetc = TestUtils.renderIntoDocument(<Subject/>);
			docsetc._renderedComponent.loadData();
			expect(docsetc._renderedComponent.state.data.length).toEqual(2);
        });
    });
    describe('Item', function(){
        it('change href', function(){
            var docsetc = TestUtils.renderIntoDocument(<Subject/>);
            docsetc._renderedComponent.loadData();
            var link = TestUtils.scryRenderedDOMComponentsWithTag(docsetc, 'a')[0];
            expect(link.props.href).toEqual('javascript/')
        });

        it('check the dates of the docsets', function(){
            var docsetc = TestUtils.renderIntoDocument(<Subject/>);
            docsetc._renderedComponent.loadData();
            expect(docsetc._renderedComponent.state.data[0].latest_version_date).toEqual(null);
            expect(new Date()).toBeGreaterThan(new Date(docsetc._renderedComponent.state.data[1].latest_version_date));
        });
    });
});
