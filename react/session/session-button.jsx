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
    },

    render: function (){
        if(this.state.status.isAuthenticated){
           return <a onClick={actions.logOut}> 
                    {this.state.status.user.email} <span className="glyphicon glyphicon-log-out" aria-hidden="true"></span>
                  </a>;
        }else{
            return <a onClick={this.props.onClickHandler}>Sing In <span className="glyphicon glyphicon-log-in" aria-hidden="true"></span></a>;
        }
    }
});
