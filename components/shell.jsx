/** @jsx React.DOM */
var React = require('react')
var LandingPage = require('./landing.js')
var Dashboard = require('./dashboard.js')

module.exports = React.createClass({
    getInitialState: function() {
        return {landing: true};
    },

    hanldeOnKeyUpEvent: function(event){
        this.setState({landing: false});
    },

    render: function(){
        if(this.state.landing){
            return(
                <LandingPage onKeyUpEvent={this.hanldeOnKeyUpEvent} />
            )    
        }else{
            return(
                <Dashboard />
            )    
        }
    }
});