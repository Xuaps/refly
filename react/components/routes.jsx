var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Dashboard = require('./dashboard.jsx');
var Result = require('../resultview/resultview.jsx');
var Docsets = require('./docsetlist.jsx');
var Settings = require('../settings/settings.jsx');
var About = require('./about.jsx');
var Legal = require('./legal.jsx');
var Cookies = require('./cookies.jsx');
var Session = require('../session/session.jsx');

var routes = (
    <Route name='dashboard' path='/' handler={Dashboard}>
        <Route name='docsets' path='docsets' handler={Docsets}/>
        <Route name='settings' path='settings' handler={Settings}/>
        <Route name='session' handler={Session}/>
        <Route name='legal' handler={Legal}/>
        <Route name='about' handler={About}/>
        <Route name='cookies' handler={Cookies}/>
        <Route name="result" path=':docset/*' handler={Result}/>
        <Route name="notfound" path=':splat' handler={Result}/>
        <DefaultRoute handler={Result}/>
    </Route>
);

module.exports = routes;
