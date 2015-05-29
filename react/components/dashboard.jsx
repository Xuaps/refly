var React = require('react');
var Search = require('../search-panel/search.jsx');
var TreeView = require('../docsets-tree/treeview.jsx');
var SingButton = require('../session/session-button.jsx');
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
                                            <SingButton className="navbar-toggle" onClickHandler={function(e){this.navigation('session');}.bind(this)}/>
                                            <a className="navbar-brand" href="/" alt="Refly.co">Refly</a>
                                        </div>
                                        <div className="navbar-collapse hidden-xs">
                                            <ul className="nav navbar-nav navbar-right">
                                                <li><a href="/settings" onClick={function(){this.navigateWithTransition("settings"); return false;}.bind(this)}>Settings</a></li>
                                                <li><a href="/legal" onClick={function(){this.navigateWithTransition("legal"); return false;}.bind(this)}>Legal</a></li>
                                                <li><SingButton onClickHandler={function(e){this.navigation('session');}.bind(this)}/></li>
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
                                <RouterHandler key="resultviewcomp" onNavigation={this.navigation} />
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
