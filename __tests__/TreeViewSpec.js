/** @jsx React.DOM */
jest.dontMock('../components/treeview.jsx');
jest.dontMock('../components/treenode.jsx');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var TreeView = require('../components/treeview.jsx'); 
var TreeNode = require('../components/treenode.jsx');
var Link = require('react-router').Link;

describe('TreeView Component', function(){
    beforeEach(function(){

    });

    describe('Initial State', function(){
        it('should have all docsets', function(){
            var treeview = render_treeview();

            expect(treeview.state.data.length).toEqual(2);
        });
    });

    describe('Click in one docset', function() {
        it('should load all docset types', function() {
            var treeview = render_treeview();
            var treenode = emulate_click_docset(treeview,0); 
            expect(treenode.state.data.length).toEqual(3);     
        });
    });

    describe('Click in one type', function() {
        it('should load all refrence by type and docset', function () {
            var treeview = render_treeview();
            var treenode_docset = emulate_click_docset(treeview,0);
            var treenode_type = emulate_click_docset(treenode_docset, 1);

            expect(treenode_type.props.docset).toBeDefined();
            expect(treenode_type.state.data.length).toEqual(1);     
        });
    });

   //click twice in docset or type dont reload data
   //click in reference not load data
   //click in docset hide and show types
   //click in types hide and show references 

    describe('Click in one reference', function() {
        it('should nav to this reference', function() {
            var treeview = render_treeview();
            var treenode_docset = emulate_click_docset(treeview,0);
            var treenode_type = emulate_click_docset(treenode_docset,1);
            var treenode_ref = emulate_click_docset(treenode_type, 1);
            var link = TestUtils.findRenderedComponentWithType(treenode_ref, <Link/>);
            
            expect(treenode_ref.props.url).toBeDefined();
            //expect(link.handleClick.mock.calls.length).toBe(1);
        });
    });

    var render_treeview = function(){
        React.renderComponent(routes, document.createElement('div'));
        return TestUtils.renderIntoDocument(<TreeView/>);
    };   

    var emulate_click_docset = function(parent,index){
        var treenode = TestUtils.scryRenderedComponentsWithType(parent, <TreeNode/>)[index];
        var link = TestUtils.findRenderedDOMComponentWithTag(treenode, 'a');
        TestUtils.Simulate.click(link);

        return treenode;
    };
});
