var Reflux = require('reflux');
var actions = require('./actions.js');
var data = require('../infrastructure/data.js');
var authentication = require('../infrastructure/authentication.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.state = {};
        this.listenToMany(actions);
        this.listenTo(authentication, function(){ this._cleanState(); this.onInit();}.bind(this));
    },

    onInit: function(){
        if(this.state.subscription){
            this.trigger(this.state);
            return;
        }
        this._cleanState();
        data.getSubscription()
            .then(this._setSubscription)
            .fail(this.onFail);
    },

    onCreateSubscription: function(params){
        var that = this;
        this._cleanErrors();
        Stripe.card.createToken({
            "number": params.number,
            "cvc": params.cvc,
            "exp_month": params.month,
            "exp_year": params.year
        }, function(status, response){
            if(response.error){
                that.onFail(response);
            }else{
                that.onAddSubscription(params, response.id);
            }
        });
    },

    onAddSubscription: function(params, token){
        this._cleanErrors();
        data.createSubscription(token, params.plan)
            .then(this._setSubscription)
            .fail(this.onFail);
    },

    onCancelSubscription: function(token, plan){
        this._cleanState();
        data.cancelSubscription(token, plan)
            .then(this._setSubscription)
            .fail(this.onFail);
    },

    onFail: function(err){
        if(err.name === 'AuthenticationRequiredError'){
            this.state.isAuthenticated = false;
        }else{
            this.state.error = err.error.message;
        }
        this.trigger(this.state);
    },

    _setSubscription: function(subscription){
        if(subscription.payment_data.last4)
            this.state.subscription = subscription;
        
        this.trigger(this.state);
    },

    _cleanState: function(){
        this.state.subscription = undefined;
        this._cleanErrors();
        this.state.isAuthenticated = true;
    },

    _cleanErrors: function(){
        this.state.error = undefined;
    },
});

