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
        }else{
            actions.init();
        }
    },

    render: function (){
        var error;
        if(this.state.status.isAuthenticated){
            return <div>You are logged in as {this.state.status.user.email}</div>;
        }else{
            if(this.props.query.error){
                error = <div className="col-xs-12">
                            <div className="alert alert-danger alert-dismissible" role="alert">
                                <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <strong>Error!</strong> {this.props.query.error}
                            </div>
                        </div>
            }
            return <div>
                    <div className="row">
                        {error}        
                        <div className="col-xs-12">
                            <div className="page-header">
                              <h1>Sign In</h1>
                            </div>
                        </div>
                        <div className="col-xs-12">
                            <div className="panel panel-default">
                            <div className="panel-heading">Use your favourite service</div>
                            <div className="panel-body text-center">
                                <div className="btn-group" role="group">
                                    <a href="/auth/google" className="btn btn-default">
                                     <i className="icon-google-plus"></i> Google
                                    </a>
                                    <a href="/auth/github" className="btn btn-default">
                                        <i className="icon-github"></i> GitHub
                                    </a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>;
        }
    }
});
