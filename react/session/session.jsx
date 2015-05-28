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
        if(this.props.query.access_token){
            actions.loginSuccessful(this.props.query.access_token);
        }
    },

    render: function (){
        if(this.state.status.isAuthenticated){
            return <div>You are logged in as {this.state.status.user.email}</div>;
        }else{
            return <div>
                <ul>
                    <li>
                        <a href="/auth/google">google</a>
                    </li>
                        <li>
                            <a href="/auth/github">github</a>
                        </li>
                </ul>
                </div>;
        }
    }
});
