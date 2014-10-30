/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Routes = Router.Routes;
var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;

var Shell = require('./shell.jsx');
var Dashboard = require('./dashboard.jsx');
var Result = require('./resultview.jsx');
var Landing = require('./landing.jsx');

var routes = (
  <Routes location="history">
    <Route handler={Shell} path='/'>
            <Route name='search' path='/search' handler={Dashboard}/>
            <Route name="result" path=':docset/*' handler={Dashboard}/>
            <DefaultRoute handler={Landing}/>
    </Route>                     
  </Routes>                      
);

module.exports = routes;
