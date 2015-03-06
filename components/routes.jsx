/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Shell = require('./shell.jsx');
var Dashboard = require('./dashboard.jsx');
var Result = require('./resultview.jsx');
var Landing = require('./landing.jsx');
var Docsets = require('./docsetlist.jsx');

var routes = (
    <Route handler={Shell} path='/'>
        <Route name='docsets' path='docsets' handler={Docsets}/>
        <Route name='search' path='search' handler={Dashboard}/>
        <Route name="result" path=':docset/*' handler={Dashboard}/>
        <Route name="notfound" path=':splat' handler={Dashboard}/>
        <DefaultRoute handler={Dashboard}/>
    </Route>
);

module.exports = routes;
