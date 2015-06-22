var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var Session = require('../session/session.jsx'); 
var CardForm = require('./card.jsx');
var Loader = require('react-loader');
var Contact = require('../contact/contact-button.jsx');

module.exports = React.createClass({

    getInitialState: function(){
        return {
            loaded: false
        };
    },

    componentWillMount: function(){
        actions.init();
    },

    componentDidMount: function(){
        this.unsubscribe = store.listen(this._onStatusChange);
    },

    componentWillUnmount: function(){
        this.unsubscribe();
    },

    render: function(){
        var error, return_data;
        if(this.state.store && this.state.store.error){
            error = <div className="col-xs-12">
                        <div className="alert alert-danger alert-dismissible" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <strong>Error!</strong> {this.state.store.error}
                        </div>
                    </div>
        }

        if(this.state.store && this.state.store.subscription){
           if(this.state.store.subscription.status === 'active'){
                if(this.state.store.subscription.cancel_at_period_end){
                    return_data = <div className="row">
                                    <div className='col-xs-12 h1 text-center'>
                                        Your subscription is going to finalize on   
                                    </div>
                                    <div className="col-xs-12 h1 text-center">
                                        <strong>{new Date(this.state.store.subscription.current_period_end*1000).toDateString()}</strong> 
                                    </div>
                                 </div>;
                }else{
                    return_data = <div className="row">
                                    <div className='col-xs-12 h1 text-center'>
                                        You are currently subscribed to  
                                    </div>
                                    <div className="col-xs-12 h1 text-center">
                                        <strong>{this.state.store.subscription.plan}</strong> plan 
                                    </div>
                                    <div className='col-xs-12 text-center lead'>
                                        We expect you are enjoying refly otherwise, you can cancel your subscription whenever you want. However, before your depart, please let us know what is making you so unhappy.
                                    </div>
                                    <div className='col-xs-12 text-center' >
                                        <Contact/> <button type="button" className="btn btn-link" onClick={this._cancel}>Cancel subscription</button>
                                    </div>
                                 </div>
                }
           }else{
               return_data = <CardForm onSubmit={function(params){this._sendAction(actions.addSubscription, params);}.bind(this)} data = {{last4:this.state.store.subscription.payment_data.last4, brand: this.state.store.subscription.payment_data.brand}} readonly={true}/>
           }
        }else{
            return_data = <CardForm onSubmit={function(params){this._sendAction(actions.createSubscription, params);}.bind(this)} disabled={!this.state.store || !this.state.store.isAuthenticated}/>
        }
        return <div>
                    <div className="row">
                        {error}
                    </div>
                    <Session title="Before upgrade you need to sign in" query={this.props.query}/>
                    <Loader loaded={this.state.loaded}>
                        {return_data}
                    </Loader>
                    <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="col-xs-12 h2 text-center">
                               Upgrading to Pro you get:
                            </div>
                            <div className="col-xs-6">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        <span className="glyphicon glyphicon-time"></span> No more waitings
                                    </div>
                                    <div className="panel-body">
                                        You will be able to query all your favourite docsets and you won't see the stupid clock again.
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        <span className="glyphicon glyphicon-transfer"></span> No limits
                                    </div>
                                    <div className="panel-body">
                                        Are you a hard user? Forget about query limits and get the solution to all your questions.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                    <div className="row">
                        <div className="col-xs-12 h2 text-center">
                            Where is your money going when you pay $10 for Refly? 
                        </div>
                        <div className="col-xs-12">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span className="badge">$0,41</span> 
                                    <span className="glyphicon glyphicon-credit-card"></span>  Fees
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$0,55</span> 
                                    <span className="glyphicon glyphicon-hdd"></span>  Hosting
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$2,1</span> 
                                    <span className="glyphicon glyphicon-scissors"></span>  Taxes
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$4,75</span> 
                                    <span className="glyphicon glyphicon-console"></span>  Salaries
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$0,98</span> 
                                    <span className="glyphicon glyphicon-book"></span>  Training
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$0,75</span> 
                                    <span className="glyphicon glyphicon-wrench"></span>  Tools
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$0,46</span> 
                                    <span className="glyphicon glyphicon-piggy-bank"></span>  Profit
                                </li> 
                            </ul>
                        </div>
                    </div>
                    <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                </div>;
    },

    _sendAction: function(call, params){
        this.setState({loaded: false});
        call(params); 
    },

    _onStatusChange: function(status){
        this.setState({
            store: status,
            loaded: true
        });
    },

    _cancel: function(){
        actions.cancelSubscription();
    },
});
