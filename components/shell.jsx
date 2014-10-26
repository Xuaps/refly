/** @jsx React.DOM */
var React = require('react');
var LandingPage = require('./landing.jsx');
var Router = require('react-router');

module.exports = React.createClass({

    handleOnKeyUpEvent: function(event){
		path = '?q=' + event.target.value;
		window.history.pushState(path, '', path);
       	Router.transitionTo('search', null ,{ref: event.target.value});
    },

    render: function(){
            return(
                <this.props.activeRouteHandler onKeyUpEvent={this.handleOnKeyUpEvent}/>
            );
    }
});
