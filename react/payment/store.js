var Reflux = require('reflux');
var actions = require('./actions.js');
var data = require('../infrastructure/data.js');
var authentication = require('../infrastructure/authentication.js');

module.exports = Reflux.createStore({
    
    init: function() {
        this.state = {};
        this.listenToMany(actions);
        this.listenTo(authentication, this.onInit);
    },

    onInit: function(){
        this._cleanState();
        data.getSubscription()
            .then(this._setSubscription)
            .fail(this.onFail);
    },

    onCreateSubscription: function(params){
        var that = this;
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
        this._cleanState();
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
        this.state.error = undefined;
        this.state.isAuthenticated = true;
    },
});

