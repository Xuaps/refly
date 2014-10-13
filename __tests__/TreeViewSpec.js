/** @jsx React.DOM */
jest.dontMock('../components/treeview.jsx');
var TreeView;
var TestUtils;
var routes;
var React;

describe('TreeView Component', function(){
    beforeEach(function(){
        React = require('react/addons');
        routes = require('../components/routes.jsx');
        TestUtils = React.addons.TestUtils;
        TreeView = require('../components/treeview.jsx'); 
    });

    describe('Initial State', function(){
        it('should have all docsets', function(){
            React.renderComponent(routes, document.createElement('div'));
            var treeview = TestUtils.renderIntoDocument(<TreeView/>);

            expect(treeview.state.data.length).toEqual(2);
        });
    });

    describe('Click in one docset', function() {
        xit('should load all docset types', function() {
        
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
