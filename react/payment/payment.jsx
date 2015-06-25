var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var SessionForm = require('../session/session-form.jsx'); 
var CardForm = require('./card.jsx');
var Contact = require('../contact/contact-button.jsx');
var SubscriptionData = require('./subscription-data.jsx');
var Call = require('./payment-call.jsx');

module.exports = React.createClass({

    getInitialState: function(){
        return {};
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

        if(this.state.store){

            if(this.state.store.subscription){
               if(this.state.store.subscription.status === 'active'){
                   return_data = <SubscriptionData initialState={this.state.store} />;
               }else{
                   return_data = <div>
                                    <CardForm onSubmit={function(params){this._sendAction(actions.addSubscription, params);}.bind(this)} data = {{last4:this.state.store.subscription.payment_data.last4, brand: this.state.store.subscription.payment_data.brand}} readonly={true}/>
                                    <Call/>
                                 </div>;
               }
            }else{
                return_data = <div>
                                <CardForm onSubmit={function(params){this._sendAction(actions.createSubscription, params);}.bind(this)} disabled={!this.state.store || !this.state.store.isAuthenticated}/>
                                <Call/>
                              </div>
            }
            return <div>
                        <div className="row">
                            {error}
                        </div>
                        <SessionForm title="Before upgrade you need to sign in" query={this.props.query}/>
                        {return_data}
                    </div>;
        }

        return <div>{error}</div>;
    },

    _sendAction: function(call, params){
        call(params); 
    },

    _onStatusChange: function(status){
        this.setState({
            store: status,
        });
    },

});
