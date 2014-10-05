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
				  {reference: "getElementById", type: "function", uri: ""},
				  {reference: "null", type: "constant", uri: ""},
				  {reference: "window", type: "function", uri: ""},
				  {reference: "XMLHTTPrequest", type: "class", uri: ""},
				  {reference: "getElementByClassName", type: "method", uri: ""},
				  {reference: "document.write", type: "method", uri: ""}
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
