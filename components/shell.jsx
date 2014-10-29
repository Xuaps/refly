/** @jsx React.DOM */
var React = require('react');
var LandingPage = require('./landing.jsx');
var Router = require('react-router');
var debounce = require('../public/js/utils.js');

module.exports = React.createClass({

    handleOnKeyUpEvent: function(event){
       	debounce(Router.transitionTo('search', null ,{ref: event.target.value}),3000);
    },

    render: function(){
            return(
                <this.props.activeRouteHandler onKeyUpEvent={this.handleOnKeyUpEvent}/>
            );
    }
});
