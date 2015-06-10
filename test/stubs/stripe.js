var Q = require('q');

module.exports = function(token){
    var stripe = {
        customers: {
            create: function(data) {
                return returnMockCustomer();
            },

            retrieve: function(id){
                return returnMockCustomer();
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
