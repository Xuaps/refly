/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var Outline = require('./outline.jsx');
var Resultview = require('./resultview.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            nodes:[],
			Outlinenodes:[]
			};
    },
	componentWillReceiveProps: function (newProps) {
		this.setState({splat: newProps.splat});

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
                    <Outline params={{splat: this.props.params.splat}}/>
                </div>
                <Resultview params={{splat: this.props.params.splat}}/>
            </div>
        );
    }
});
