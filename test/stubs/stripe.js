module.exports = function(token){
    var stripe = {
        customers: {
            create: function(data) {
               var customer = mock.customer || {id: '' };
               return { then: function(callback){ return callback(customer);}};
            }
        }
    };

    return stripe;
};

var mock = {};
module.exports.mock = mock;
