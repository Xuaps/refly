/** @jsx React.DOM */
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

    describe('Load a reference', function(){
        it('should have all children of the reference', function(){
            React.renderComponent(routes, document.createElement('div'));
            var outline = TestUtils.renderIntoDocument(<Outline
			params={{splat: 'node.js+v0.10.29/buffer/buffer/+buffer.isencoding(encoding)'}}/>);
			expect(outline.state.data.length).toEqual(0);
        });
    });

    describe('Click in any reference', function() {
        xit('should load all reference of his father', function() {
		    React.renderComponent(routes, document.createElement('div'));
            var outline = TestUtils.renderIntoDocument(<Outline
			params={{splat: 'node.js+v0.10.29/buffer/buffer/+buffer.isencoding(encoding)'}}/>);
			expect(outline.state.data.length).toEqual(2);
        });
    });

    describe('Click in one type', function() {
        xit('should load all refrence by type and docset', function () {
        
        });
    }); 

    describe('Click in one reference', function() {
        xit('should nav to this reference', function() {
        
        });
    });   
});
