/** @jsx React.DOM */
jest.dontMock('../components/treeview.jsx');
jest.dontMock('../components/treenode.jsx');
jest.dontMock('./stubRouterContext.jsx');
var stubRouterContext = require('./stubRouterContext.jsx');
var React = require('react/addons');
var routes = require('../components/routes.jsx');
var TestUtils = React.addons.TestUtils;
var TreeView = require('../components/treeview.jsx'); 
var TreeNode = require('../components/treenode.jsx');
var Link = require('react-router').Link;
var storeMock = require('../components/store.js');
var Subject = stubRouterContext(TreeView,{onClickHandler: function(){}});

describe('References TreeView Component', function(){
    describe('Initial State', function(){
        it('should have all docsets', function(){
            var treeview = render_treeview();

            expect(treeview.state.data.length).toEqual(1);
        });
    });

    describe('TreeNode Component', function(){
        describe('Click in one docset', function() {
            it('should nav to the start uri', function() {
                var treeview = render_treeview();
                var treenode = emulate_click_docset(treeview,0)[0]; 

                expect(treenode.props.uri).toBeDefined();
            });
            it('should load all docset types', function() {
                var treeview = render_treeview();
                var treenode = emulate_click_docset(treeview,0)[0]; 

                expect(treenode.props.parents.length).toEqual(1);
                expect(treenode.state.data.length).toEqual(3);     
            });

            it('should not load all docset types of those have already been loaded', function(){
                var treeview = render_treeview();
                //workaround
                var expected = storeMock.get.mock.calls.length+1;
                var treenode = emulate_click_docset(treeview,0,2)[0]; 
                
                expect(storeMock.get.mock.calls.length).toEqual(expected);
            });

            it ('should change the children state hide/show', function(){
                var treeview = render_treeview();
                var res = emulate_click_docset(treeview,0); 
                var treenode = res[0];
                var link = res[1];

                expect(treenode.state.show).toBe(true);
                TestUtils.Simulate.click(link);
                expect(treenode.state.show).toBe(false);
            }); 
        });

        describe('Click in one type', function() {
            it('should load all refrence by type and docset', function () {
                var treeview = render_treeview();
                var treenode_docset = emulate_click_docset(treeview,0)[0];
                var treenode_type = emulate_click_docset(treenode_docset, 1)[0];

                expect(treenode_type.props.parents.length).toEqual(2);
                expect(treenode_type.state.data.length).toEqual(25);     
            });

            xit('should not load all refrences types those have already been loaded', function(){
                //redundant
            });

            xit ('should change the children state hide/show', function(){
                //redundant
            }); 
        });

        describe('Click in one reference', function() {
            it('should nav to this reference', function() {
                var treeview = render_treeview();
                var treenode_docset = emulate_click_docset(treeview,0)[0];
                var treenode_type = emulate_click_docset(treenode_docset,1)[0];
                var treenode_ref = emulate_click_docset(treenode_type, 1);
                
                expect(treenode_ref[0].props.uri).toBeDefined();
                expect(treenode_ref[0].props.docset).toBeDefined();
                expect(treenode_ref[1]).toBeDefined();
            });
        });
    });

    var render_treeview = function(){
        var subject = TestUtils.renderIntoDocument(<Subject/>);

        return subject._renderedComponent;
    };   

    var emulate_click_docset = function(parent,index, clicks){
        clicks = clicks || 1;
        var treenode = TestUtils.scryRenderedComponentsWithType(parent, <TreeNode/>)[index];
        var links = TestUtils.scryRenderedDOMComponentsWithTag(treenode, 'a');
        var link = links[links.length-1];
        for(var i=0;i<clicks;i++){
            TestUtils.Simulate.click(link);
        }

        return [treenode, link];
    };
});
