var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var Ladda = require('ladda');
var isEqual = require('lodash.isequal');
var ErrorMessage = require('../error/error.jsx');

module.exports = React.createClass({
    mixins: [Reflux.connect(store, 'status')],
   
    getInitialState: function(){
       return {};
    },

    getDefaultProps: function(){
        return {
            title: 'Sign in'
        };
    },

    componentWillMount: function(){
        if(this.props.query.access_token){
            actions.loginSuccessful(this.props.query.access_token);
        }else{
            actions.init();
        }
    },

    shouldComponentUpdate: function(nextProps, nextState){
        return !isEqual(this.state && nextState) || !isEqual(this.props, nextProps);
    },

    componentWillUpdate: function(nextProps, nextState){
        var signOutButton =  document.getElementById('signOutButton');
        if(signOutButton)
            signOutButton.disabled = false;
    },

    render: function (){
        var error = this.props.query.error || (this.state.status?this.state.status.error:undefined);
        if(this.state.status && this.state.status.isAuthenticated){
            return (
                    <div>
                        <div className="row">
                            <ErrorMessage id="signOutError" error={error}/>
                            <div className='col-xs-12 lead'>  
                                <span className="glyphicon glyphicon-user"></span>  You are logged in as <span className='label label-primary'>{this.state.status.user.email}</span>
                                <button id="signOutButton" onClick={this._signOut} className="ladda-button btn btn-link" data-spinner-color="#2780E3" data-style="expand-right"><span className="ladda-label">Sign Out</span></button>
                            </div>
                        </div>
                        {this.props.children}
                   </div>);
        }else if(this.state.status && !this.state.status.isAuthenticated){
            return <div>
                    <div className="row">
                        <ErrorMessage error={error}/>
                        <div className="col-xs-12">
                            <div className="page-header">
                              <h1>{this.props.title}</h1>
                            </div> 
                        </div>
                        <div className="col-xs-12">
                            <div className="panel panel-default">
                            <div className="panel-heading">Use your favourite service</div>
                            <div className="panel-body text-center">
                                <div className="btn-group" role="group">
                                    <a href="/auth/google" className="btn btn-default">
                                     <em className="icon-google-plus"></em> Google
                                    </a>
                                    <a href="/auth/github" className="btn btn-default">
                                        <em className="icon-github"></em> GitHub
                                    </a>
                                </div>
                            </div>
                            </div>
                            <div><p className="h4 lead"><small>Learn more about our <a href="/privacy">Privacy policy</a>.</small></p></div>
                        </div>
                    </div>
                </div>;
        }
        return <div><ErrorMessage error={error}/></div>;
    },
    
    _signOut: function(){
        actions.logOut();
        document.getElementById('signOutButton').disabled = true;
        var l = Ladda.create( document.querySelector( '#signOutButton' ) );
        l.start();
    }
});

