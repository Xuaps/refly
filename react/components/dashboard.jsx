/** @jsx React.DOM */
var React = require('react');
var Search = require('../search-panel/search.jsx');
var TreeView = require('./treeview.jsx');
var Resultview = require('./resultview.jsx');
var URI = require ('URIjs');
var Router = require('react-router');
var RouterHandler = Router.RouteHandler;
var Link = Router.Link;

module.exports = React.createClass({
    mixins: [ Router.State, Router.Navigation ],
    getInitialState: function(){
        return {last_search: this.getQuery().ref || ''};
    },

    render: function(){
		rows = [];
        
        if(!this.searchVisible()){
            rows.push(<TreeView key="treeviewcomp" onNodeClick={this.navigation} />);
        }
        rows.push(<Search key="searchcomp" onKeyUpEvent={this.search} onClick={this.navigation} search={this.getQuery().ref}/>);
		
        return(
            <div id="content">
                <header>
                    <a className="logo" href="/">
                        <img src="/img/refly-big.jpg"/>
                    </a>
                        <ul className="menu">
                            <li><Link to="about">About</Link></li>
                            <li><Link to="/Legal">Legal</Link></li>
                        </ul>
                </header>
                <div id="left-pane">
					{rows}
                </div>
                <div className="right-pane">
                    <RouterHandler key="resultviewcomp" onNavigation={this.navigation} onSearch={this.searchNavigation} params={{docset:this.getParams().docset, uri: this.getParams().splat}}/>
                </div>
                <div className="dashboard-footer">
                    <div className="settings">
                        <button className="ry-icon fa-cog" onClick={this.settings}>settings</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        );
    },
  
    settings: function(){
       this.transitionTo('settings');
    },

    navigation: function(uri){
        this.transitionTo(uri);
    },
    
    searchNavigation: function(query){
        this.transitionTo('dashboard', null, query);
    },
    
    search: function(event){
        this.setState({last_search: event.target.value});
        this.props.onKeyUpEvent(event);
    },
    
    searchVisible: function(){
        return this.state.last_search || this.getQuery().ref;
    }
});
