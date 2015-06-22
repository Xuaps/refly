var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var Session = require('../session/session.jsx'); 
var CardForm = require('./card.jsx');
var Loader = require('react-loader');

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
                                Your subscription iu going to finalize on   
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
