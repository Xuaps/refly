var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var SessionForm = require('../session/session-form.jsx'); 
var CardForm = require('./card.jsx');
var Loader = require('react-loader');
var Contact = require('../contact/contact-button.jsx');
var SubscriptionData = require('./subscription-data.jsx');
var Call = require('./payment-call.jsx');

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
               return_data = <SubscriptionData initialState={this.state.store} />;
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
                    <SessionForm title="Before upgrade you need to sign in" query={this.props.query}/>
                    <Loader loaded={this.state.loaded}>
                        {return_data}
                    </Loader>
                    <Call/>
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

});
