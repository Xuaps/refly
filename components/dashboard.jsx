/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var TreeNode = require('./treenode.jsx');
// var Outline = require('./outline.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            nodes:[
                <TreeNode key='a' type='docset' uri= '' reference='javascript' len='0'/>,
                <TreeNode key='b' type='docset' uri= '' reference='javascript' len='0'/>,
                <TreeNode key='c' type='docset' uri= '' reference='javascript' len='0'/>
            ] 
        };
    },
    render: function(){
        return(
            <div>
                <header>
                    <a href="/">
                        <img src="/img/logo.png"/>
                    </a>
                </header>
                <div id="left-pane">
                    <Search search={this.props.search}/>
                    <TreeView nodes={this.state.nodes}/>
                </div>
                <this.props.activeRouteHandler/>
            </div>
        )
    }
});
