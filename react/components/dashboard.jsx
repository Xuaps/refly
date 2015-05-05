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
        return(
                <div>
                    <header>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className="col-xs-12">
                                    <nav className="navbar navbar-default navbar-fixed-top">
                                      <div className="container-fluid">
                                        <div className='navbar-header'>
                                            <a className="btn btn-default navbar-toggle navbar-btn" href="#" onClick={this.activeSideBar}>
                                                <span className="glyphicon glyphicon-menu-hamburger"></span>
                                            </a>                                
                                            <a className="btn btn-default navbar-btn navbar-toggle" href="#">
                                                <span className="glyphicon glyphicon-user"></span>
                                            </a>
                                            <a className="navbar-brand" href="/" alt="Refly.co">Refly</a>
                                        </div>
                                        <div className="navbar-collapse hidden-xs">
                                            <form className="navbar-form navbar-right" role="search">
                                              <div className="form-group">
                                                <input type="text" className="form-control" placeholder="User"/>
                                                <input type="password" className="form-control" placeholder="Pass"/>
                                              </div>
                                              <button type="submit" className="btn btn-default">Log in</button>
                                            </form>
                                            <ul className="nav navbar-nav navbar-right">
                                                <li><a href="/settings" onClick={function(){this.navigateWithTransition("settings"); return false;}.bind(this)}>Settings</a></li>
                                                <li><a href="/legal" onClick={function(){this.navigateWithTransition("legal"); return false;}.bind(this)}>Legal</a></li>
                                            </ul>
                                         </div>
                                    </div>
                                 </nav>
                               </div>
                            </div>
                        </div>
                    </header>
                    <div className="container-fluid">
                        <div className='row row-offcanvas row-offcanvas-left'>
                            <div className="col-sm-4 col-md-3 sidebar-offcanvas">
                                <div className="sidebar-panel">
                                    <Search key="searchcomp" onKeyUpEvent={this.search} onClick={this.navigateWithTransition} search={this.getQuery().ref}/>
                                    {!this.searchVisible()?<TreeView key="treeviewcomp" onNodeClick={this.navigateWithTransition} />:undefined}
                                </div>
                                <div className="footer sidebar-panel visible-xs">
                                        <ul className="nav nav-pills">
                                            <li><a href="/settings" onClick={function(){this.navigateWithTransition("settings"); return false;}.bind(this)}>Settings</a></li>
                                            <li><a href="/legal" onClick={function(){this.navigateWithTransition("legal"); return false;}.bind(this)}>Legal</a></li>
                                        </ul>
                                </div>
                            </div>
                            <article className="col-xs-12 col-sm-8 col-md-9">
                                <RouterHandler key="resultviewcomp" onNavigation={this.navigation} params={{docset:this.getParams().docset, uri: this.getParams().splat}}/>
                            </article>
                        </div>                        
                    </div>
                </div>
        );
    },

    activeSideBar: function(){
        $('.row-offcanvas').toggleClass('active');
    },
  
    navigateWithTransition: function(uri){
        $('.row-offcanvas').toggleClass('active');
        this.navigation(uri);
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
