/** @jsx React.DOM */
var React = require('react');
var Search = require('../search-panel/search.jsx');
var TreeView = require('../docsets-tree/treeview.jsx');
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
        
        rows.push(<Search key="searchcomp" onKeyUpEvent={this.search} onClick={this.navigation} search={this.getQuery().ref}/>);
        if(!this.searchVisible()){
            rows.push(<TreeView key="treeviewcomp" onNodeClick={this.navigation} />);
        }
		
        return(
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 column'>
                        {rows}
                    </div>
                    <div className='col-md-9 column'>
                        <div className='row'>
                            <ul className="nav nav-pills">
                                <li><Link to="settings">Settings</Link></li>
                                <li><Link to="about">About</Link></li>
                                <li><Link to="/Legal">Legal</Link></li>
                            </ul>
                        </div>
                        <div className='row'>
                            <div className="col-md-12 column">
                                <RouterHandler key="resultviewcomp" onNavigation={this.navigation} params={{docset:this.getParams().docset, uri: this.getParams().splat}}/>
                            </div>
                        </div>
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
    
    search: function(event){
        this.setState({last_search: event.target.value});
    },
    
    searchVisible: function(){
        return this.state.last_search || this.getQuery().ref;
    }
});
