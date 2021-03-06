var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var Contact = require('../contact/contact-button.jsx');
var Ladda = require('ladda');
var Call = require('./payment-call.jsx');
var Router = require('react-router');
var ErrorMessage = require('../error/error.jsx');

module.exports = React.createClass({
    mixins: [Reflux.connect(store, 'store'), Router.Navigation],

    getInitialState: function(){
        return {store:this.props.initialState};
    },

    componentWillMount: function(){
        this.manageErrors = false;
        if(!this.state.store){
            this.manageErrors = true;
            actions.init();
        }
    },

    componentWillUpdate: function(nextProps, nextState){
        var cancelButton =  document.getElementById('cancelButton');
        if(cancelButton)
            cancelButton.disabled = false;
    },

    render: function(){
        var error = (this.state.store && this.manageErrors)?this.state.store.error:undefined;
        if(!this.state.store)
            return <div><ErrorMessage id="cancelError" error={error}/></div>;

        if(!this.state.store.subscription || this.state.store.subscription.status!=='active'){
            return (<div>
                        <ErrorMessage id="cancelError" error={error}/>
                        <div className="row">
                                <div className="h2 col-xs-12 text-center">You aren&apos;t currently subscribed to the awesome Pro plan</div>
                            <div className="col-xs-12 text-center">
                                <button className='btn-lg btn-success' onClick={this._upgrade}>Upgrade to PRO</button>
                            </div>
                        </div>
                        <Call/>
                </div>);
        }
            
        if(this.state.store.subscription){
            if(this.state.store.subscription.cancel_at_period_end){
                return (<div className="row">
                            <ErrorMessage id="cancelError" error={error}/>
                            <div className='col-xs-12 h1 text-center'>
                                Your subscription will finish on   
                            </div>
                            <div className="col-xs-12 h1 text-center">
                                <strong>{new Date(this.state.store.subscription.current_period_end*1000).toDateString()}</strong> 
                            </div>
                         </div>);
            }

            if(this.state.store.subscription.status==='active'){
                return (<div className="row">
                                <ErrorMessage error={error}/>
                                <div className='col-xs-12 h1 text-center'>
                                    You are currently subscribed to  
                                </div>
                                <div className="col-xs-12 h1 text-center">
                                    <strong>{this.state.store.subscription.plan}</strong> plan 
                                </div>
                                <div className='col-xs-12 text-center lead'>
                                    We expect you to be enjoying refly, otherwise you can cancel the subscription whenever you want. However, before your depart, please let us know what is making you so unhappy.
                                </div>
                                <div className='col-xs-12 text-center' >
                                    <Contact/>
                                    <button id="cancelButton" onClick={this._cancel} className="ladda-button btn btn-link" data-spinner-color="#2780E3" data-style="expand-right"><span className="ladda-label">Cancel subscription</span></button>
                                </div>
                             </div>);
            }
        }

    },

    _cancel: function(){
        document.getElementById('cancelButton').disabled = true;
        var l = Ladda.create( document.querySelector( '#cancelButton' ) );
        l.start();
        actions.cancelSubscription();
    },

    _upgrade: function(){
        this.transitionTo('/upgrade');
    }
});
