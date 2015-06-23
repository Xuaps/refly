var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var Contact = require('../contact/contact-button.jsx');
var Call = require('./payment-call.jsx');
var Router = require('react-router');

module.exports = React.createClass({
    mixins: [Reflux.connect(store, 'store'), Router.Navigation],

    getInitialState: function(){
        return {store:this.props.initialState};
    },

    componentWillMount: function(){
        if(!this.state.store)
            actions.init();
    },

    render: function(){
        if(!this.state.store || !this.state.store.subscription || this.state.store.subscription.state!=='active')
            return (<div>
                        <div className="row">
                            <div className="h2 col-xs-12 text-center">You aren't currently subscribed to the awesome Pro plan</div>
                        </div>
                        <div className="col-xs-12 text-center">
                            <button className='btn-lg btn-success' onClick={this._upgrade}>Upgrade to PRO</button>
                        </div>
                        <Call/>
                        
                </div>);

        if(this.state.store.subscription.cancel_at_period_end){
            return (<div className="row">
                        <div className='col-xs-12 h1 text-center'>
                            Your subscription is going to finalize on   
                        </div>
                        <div className="col-xs-12 h1 text-center">
                            <strong>{new Date(this.state.store.subscription.current_period_end*1000).toDateString()}</strong> 
                        </div>
                     </div>);
        }else{
            return (<div className="row">
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
                         </div>);
        }
    },

    _cancel: function(){
        actions.cancelSubscription();
    },

    _upgrade: function(){
        this.transitionTo('/upgrade');
    }
});
