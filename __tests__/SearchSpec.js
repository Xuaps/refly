/** @jsx React.DOM */
jest.dontMock('../components/search.jsx');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var Search = require('../components/search.jsx');

describe('Search Component', function(){

    describe('Initial State', function(){
        it('should be empty', function(){
            TestUtils.renderIntoDocument(routes);
            var searchc = TestUtils.renderIntoDocument(<Search/>);
			expect(searchc.state.results.length).toEqual(0);
            searchc.refs.searchbox.getDOMNode().blur(); //Workaround for this bug: bit.ly/1t63vqC 
        });
    });

    describe('Search references', function(){
        it('should find refrences', function(){
            TestUtils.renderIntoDocument(routes);
            var searchc = TestUtils.renderIntoDocument(<Search search={'about'}/>);
			expect(searchc.state.results.length).toBeGreaterThan(0);
            searchc.refs.searchbox.getDOMNode().blur(); //Workaround for this bug: bit.ly/1t63vqC 
        });
    });

});
