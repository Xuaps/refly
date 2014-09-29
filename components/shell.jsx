/** @jsx React.DOM */
var React = require('react')
var LandingPage = require('./landing.jsx')
var Dashboard = require('./dashboard.jsx')

module.exports = React.createClass({
    getInitialState: function() {
        return {landing: true};
    },

    hanldeOnKeyUpEvent: function(event){
        this.setState({landing: false});
        this.setState({search: event.target.value});
    },

    render: function(){
        if(this.state.landing){
            return(
                <LandingPage onKeyUpEvent={this.hanldeOnKeyUpEvent} />
            )    
        }else{
            return(
                <Dashboard search={this.state.search}/>
            )    
        }
    }
});