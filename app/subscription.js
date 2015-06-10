var Subscription = function(){
    this.payment_data = {last4: null, brand: null};
    this.plan = null;
    this.user = undefined;
};

Subscription.create = function(user, customer, plan){
    var sub = new Subscription();
    sub.payment_data = { 
        last4: customer.sources.data[0].last4,
        brand: customer.sources.data[0].brand
    };
    sub.plan = plan;
    sub.user = user;

    return sub;
};

module.exports = Subscription;
