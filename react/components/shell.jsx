/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

module.exports = React.createClass({
    mixins: [Router.Navigation],
    handleOnKeyUpEvent: function(event){
       	this.transitionTo('search', null ,{ref: event.target.value});
    },

    render: function(){
        return(<RouteHandler onKeyUpEvent={this.handleOnKeyUpEvent}/>);
    }
});
