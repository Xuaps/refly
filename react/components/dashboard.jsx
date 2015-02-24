/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var Resultview = require('./resultview.jsx');
var Breadcrumbs = require('./breadcrumbs.jsx');
var Router = require('react-router');

module.exports = React.createClass({
    mixins: [ Router.State, Router.Navigation ],
    getInitialState: function(){
        return {last_search: this.getQuery().ref || ''};
    },

    render: function(){
		rows = [];
        
        if(!this.searchVisible()){
            rows.push(<TreeView key="treeviewcomp" onClickHandler={this.onNavigation} params={{docset: this.getParams().docset, uri: this.getParams().splat}}/>);
        }
        rows.push(<Search key="searchcomp" onKeyUpEvent={this.onSearch} onClickHandler={this.onNavigation} search={this.getQuery().ref}/>);
		
        return(
            <div id="content">
                <header>
                    <a className="logo" href="/">
                        <img src="/img/refly-big.jpg"/>
                    </a>
                        <ul className="menu">
                            <li><a href="/Docsets">Docsets</a></li>
                            <li><a href="/team.html">About</a></li>
                            <li><a href="/privacy-policy.html">Legal</a></li>
                        </ul>
                </header>
                <div id="left-pane">
					{rows}
                </div>
                <div className="right-pane">
                    <Breadcrumbs key="breadcrumbscomp" params={{docset:this.getParams().docset, uri: this.getParams().splat}}/>
                    <Resultview key="resultviewcomp" onNavigationHandler={this.onNavigation} onSearchHandler={this.onSearchNavigation} params={{docset:this.getParams().docset, uri: this.getParams().splat}}/>
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
    onNavigation: function(params){
        this.transitionTo('result', params);
    },
    
    onSearchNavigation: function(query){
        this.transitionTo('search', null, query);
    },
    
    onSearch: function(event){
        this.setState({last_search: event.target.value});
        this.props.onKeyUpEvent(event);
    },
    
    searchVisible: function(){
        return this.state.last_search || this.getQuery().ref;
    }
});
