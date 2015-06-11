var Subscription = function(){
    this.payment_data = {last4: null, brand: null};
    this.plan = null;
    this.user = undefined;
};

Subscription.create = function(user, customer, subscription){
    var sub = new Subscription();
    sub.payment_data = { 
        last4: customer.sources.data[0].last4,
        brand: customer.sources.data[0].brand
    };
    sub.plan = subscription.plan.id;
    sub.cancel_at_period_end = subscription.cancel_at_period_end;
    sub.current_period_end = subscription.current_period_end;
    sub.current_period_start = subscription.current_period_start;
    sub.status = subscription.status;
    sub.user = user;

    return sub;
};

module.exports = Subscription;
