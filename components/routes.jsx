/** @jsx React.DOM */

var Router = require('react-router');
var Link = Router.Link;
var Routes = Router.Routes;
var Route = Router.Route;


var Shell = require('./shell.jsx');
var Dashboard = require('./dashboard.jsx');
var Result = require('./resultview.jsx');

var routes = (
  <Routes location="history">
    <Route handler={Shell}>
            <Route name="result" path='*' handler={Dashboard}/>
    </Route>
  </Routes>
);

module.exports = routes;
