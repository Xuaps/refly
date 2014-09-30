/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
// var TreeView = require('./treeview.jsx');
// var Outline = require('./outline.jsx');

module.exports = React.createClass({
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
                </div>
                <this.props.activeRouteHandler/>
            </div>
        )
    }
});
