/** @jsx React.DOM */
var React = require('react');
var LandingPage = require('./landing.jsx');
var Router = require('react-router');

module.exports = React.createClass({

    handleOnKeyUpEvent: function(event){
        Router.transitionTo('search', null ,{ref: event.target.value});
    },
	
	setDisposition: function(origin){
		if(this.state.search!=''){
			if(result){
				this.setState({disposition: "notreeview"});
			}
		}else{

		}
		alert('p');
	},

    render: function(){
            return(
                <this.props.activeRouteHandler onKeyUpEvent={this.handleOnKeyUpEvent}/>
            );
    }
});
