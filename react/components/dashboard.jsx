var React = require('react');
var Search = require('../search-panel/search.jsx');
var SidebarMenu = require('../sidebarmenu/sidebar-menu.jsx');
var SignButton = require('../session/session-button.jsx');
var ContactButton = require('../contact/contact-button.jsx');
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
        var docsetParams = this.getParams().docset || this.getParams().splat || undefined;
        var referenceParams = (this.getParams().docset) ? this.getParams().splat || undefined : undefined;
        var typeParams = this.getQuery().type || undefined;
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
                                            <ContactButton className="navbar-toggle" ref="btncontact"/>
                                            <SignButton className="navbar-toggle" onClickHandler={function(e){e.preventDefault();this.navigation('session');}.bind(this)}/>
                                            <a className="navbar-brand" href="/" alt="Refly.xyz">Refly</a>
                                        </div>
                                        <div className="navbar-collapse hidden-xs">
                                            <ul className="nav navbar-nav navbar-right">
                                                <li><ContactButton text="Contact" ref="btncontact"/></li>
                                                <li><SignButton onClickHandler={function(e){this.navigation('session');}.bind(this)}/></li>
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
                                    <Search key="searchcomp" onKeyUpEvent={this.search} searchVisible={this.searchVisible()} onClick={this.navigateWithTransition} search={this.getQuery().ref}/>
                                    {!this.searchVisible()?<SidebarMenu docset={docsetParams} reference={referenceParams} type={typeParams}></SidebarMenu>:undefined}
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
  
    navigateWithTransition: function(uri, hidetreeview){
        if(hidetreeview)
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
