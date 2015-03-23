/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Shell = require('./shell.jsx');
var Dashboard = require('./dashboard.jsx');
var Result = require('./resultview.jsx');
var Docsets = require('./docsetlist.jsx');
var Settings = require('./settings.jsx');
var About = require('./about.jsx');
var Legal = require('./legal.jsx');

var routes = (
    <Route handler={Shell} >
        <Route name='dashboard' path='/' handler={Dashboard}>
            <Route name='docsets' path='docsets' handler={Docsets}/>
            <Route name='settings' path='settings' handler={Settings}/>
            <Route name='legal' handler={Legal}/>
            <Route name='about' handler={About}/>
            <Route name="result" path=':docset/*' handler={Result}/>
            <Route name="notfound" path=':splat' handler={Result}/>
            <DefaultRoute handler={Result}/>
        </Route>
    </Route>
);

module.exports = routes;
