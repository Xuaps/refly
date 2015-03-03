/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var Resultview = require('./resultview.jsx');
var Breadcrumbs = require('./breadcrumbs.jsx');

module.exports = React.createClass({
    getInitialState: function(){
        return {last_search: this.props.query.ref || ''};
    },

    render: function(){
		rows = [];
        
        if(!this.searchVisible()){
            rows.push(<TreeView key="treeviewcomp" params={{docset: this.props.params.docset, uri: this.props.params.splat}}/>);
        }
        rows.push(<Search key="searchcomp" onKeyUpEvent={this.onSearch} search={this.props.query.ref}/>);
		
        return(
            <div id="content">
                <header>
                    <a className="logo" href="/">
                        <img src="/img/refly-big.jpg"/>
                    </a>
                        <ul className="menu">
                            <li><a href="/docsets.html">Docsets</a></li>
                            <li><a href="/team.html">About</a></li>
                            <li><a href="/privacy-policy.html">Legal</a></li>
                        </ul>
                </header>
                <div id="left-pane">
					{rows}
                </div>
                <div className="right-pane">
                    <Breadcrumbs key="breadcrumbscomp" params={{docset:this.props.params.docset, uri: this.props.params.splat}}/>
                    <Resultview key="resultviewcomp" params={{docset:this.props.params.docset, uri: this.props.params.splat}}/>
                </div>
                <div className="dashboard-footer">
                    <div className="settings">
                        <button className="ry-icon fa-cog">settings</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        );
    },

    onSearch: function(event){
        this.setState({last_search: event.target.value});
        this.props.onKeyUpEvent(event);
    },
    
    searchVisible: function(){
        return this.state.last_search;
    }
});
