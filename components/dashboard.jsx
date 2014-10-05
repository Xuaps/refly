/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var TreeNode = require('./treenode.jsx');
var Outline = require('./outline.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            nodes:[
                <TreeNode key='a' type='docset' uri= '' reference='javascript' len='0'/>,
                <TreeNode key='b' type='docset' uri= '' reference='javascript#' len='0'/>,
                <TreeNode key='c' type='docset' uri= '' reference='javascript++' len='0'/>
            ],
			Outlinenodes:[
				  {reference: "getElementById", type: "function", uri: "uri1"},
				  {reference: "null", type: "constant", uri: "uri2"},
				  {reference: "window", type: "function", uri: "uri3"},
				  {reference: "XMLHTTPrequest", type: "class", uri: "uri4"},
				  {reference: "getElementByClassName", type: "method", uri: "uri5"},
				  {reference: "document.write", type: "method", uri: "uri6"}
						 ]

			};
    },
    render: function(){
        return(
            <div id="content">
                <header>
                    <a href="/">
                        <img src="/img/logo.png"/>
                    </a>
                </header>
                <div id="left-pane">
                    <Search search={this.props.search}/>
                    <TreeView nodes={this.state.nodes}/>
                    <Outline data={this.state.Outlinenodes}/>
                </div>
                <this.props.activeRouteHandler/>
            </div>
        );
    }
});
