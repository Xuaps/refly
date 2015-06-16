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
        data.getSubscription()
            .then(this._setSubscription)
            .fail(this.onFail);
    },

    onCreateSubscription: function(plan, number, cvc, month, year){
        var that = this;
        Stripe.card.createToken({
            "number": number,
            "cvc": cvc,
            "exp_month": month,
            "exp_year": year
        }, function(status, response){
            if(response.error){
                that.onFail(response);
            }else{
                that.onAddSubscription(plan, response.id);
            }
        });
    },

    onAddSubscription: function(plan, token){
        data.createSubscription(token, plan)
            .then(this._setSubscription)
            .fail(this.onFail);
    },

    onCancelSubscription: function(token, plan){
        data.cancelSubscription(token, plan)
            .then(this._setSubscription)
            .fail(this.onFail);
    },

    onFail: function(err){
        this._cleanState();
        if(err.name === 'AuthenticationRequiredError'){
            this.state.isAuthenticated = false;
        }else{
            this.state.error = err.error.message;
        }
        this.trigger(this.state);
    },

    _setSubscription: function(subscription){
        this._cleanState();
        if(subscription.status)
            this.state.subscription = subscription;
        
        this.trigger(this.state);
    },

    _cleanState: function(){
        this.state.subscription = undefined;
        this.err = undefined;
        this.state.isAuthenticated = true;
    },
});

