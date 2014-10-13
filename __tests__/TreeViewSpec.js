/** @jsx React.DOM */
jest.dontMock('../components/treeview.jsx');
jest.dontMock('../components/treenode.jsx');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var TreeView = require('../components/treeview.jsx'); 
var TreeNode = require('../components/treenode.jsx');

describe('TreeView Component', function(){
    beforeEach(function(){

    });

    describe('Initial State', function(){
        it('should have all docsets', function(){
            React.renderComponent(routes, document.createElement('div'));
            var treeview = TestUtils.renderIntoDocument(<TreeView/>);

            expect(treeview.state.data.length).toEqual(2);
        });
    });

    describe('Click in one docset', function() {
        it('should load all docset types', function() {
            React.renderComponent(routes, document.createElement('div'));
            var treeview = TestUtils.renderIntoDocument(<TreeView/>);
            var treenode = TestUtils.scryRenderedComponentsWithType(treeview, <TreeNode/>)[0];
            var link = TestUtils.findRenderedDOMComponentWithTag(treenode, 'a');
            TestUtils.Simulate.click(link);

            expect(treenode.state.data.length).toEqual(3);     
        });
    });

    describe('Click in one type', function() {
        xit('should load all refrence by type and docset', function () {
            React.renderComponent(routes, document.createElement('div'));
            var treeview = TestUtils.renderIntoDocument(<TreeView/>);
            var treenode = TestUtils.scryRenderedComponentsWithType(treeview, <TreeNode/>)[0];
            var link = TestUtils.findRenderedDOMComponentWithTag(treenode, 'a');
            TestUtils.Simulate.click(link);

            expect(treenode.state.data.length).toEqual(3);     
        });
    }); 

    describe('Click in one reference', function() {
        xit('should nav to this reference', function() {
        
        });
    });   
});
