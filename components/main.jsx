/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var $ = require('jquery-browserify');
var URI = require('URIjs');
var routes = require('./routes.jsx');

React.renderComponent(routes, document.getElementById('container'));

$(document).on('click', 'div.result a', function(event) {
    var baseUri=new URI(window.document.baseURI);
    var uri=new URI(this.href);
    if(uri.host()!==baseUri.host())
        return;

    event.preventDefault();
    Router.transitionTo('result',{docset:uri.segment(0), splat:uri.segment(0,'').path().slice(1)});
});
window.React = React;
