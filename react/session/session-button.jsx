var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');

module.exports = React.createClass({
    mixins: [Reflux.connect(store, 'status')],
   
    getInitialState: function(){
       return {status:{}};
    },

    componentWillMount: function(){
        actions.init();
        this.className = this.props.className || '';
    },
    
    render: function (){
        if(this.state.status.isAuthenticated){
           return <button className={"btn btn-default navbar-btn " + this.className} onClick={this.props.onClickHandler}> 
                    <span className="hidden-xs">{this.state.status.user.email}</span> <span className="glyphicon glyphicon-user" aria-hidden="true"></span>
                  </button>;
        }else{
            return <button className={"btn btn-default navbar-btn " + this.className} onClick={this.props.onClickHandler}> <span className="hidden-xs">Sign In</span> <span className="glyphicon glyphicon-user" aria-hidden="true"></span></button>;
        }
    }
});
