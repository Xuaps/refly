var Q = require('q');

module.exports = function(token){
    var stripe = {
        customers: {
            create: function(data) {
                return returnMockCustomer();
            },

            retrieve: function(id){
                return returnMockCustomer();
            },

            createSubscription: function(customer, plan){
                return Q.fcall(function(){ return mock.subscription || {"plan":{ id:''}, status:''};});
            },
            
            cancelSubscription: function(customer_id, subscription_id, params){
                return Q.fcall(function() { return mock.subscription; });
            }
        }
    };

    return stripe;
};

var returnMockCustomer  = function(data){
   var customer = mock.customer || {id: '', sources: {data:[{last4: '', brand: ''}]} };
   return Q.fcall(function() {return customer;});
};

var mock = {};
module.exports.mock = mock;
