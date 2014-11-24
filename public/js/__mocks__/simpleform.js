
var SimpleForm = function(key){
};

SimpleForm.prototype.sendMail = function (mail, name, message){
    return {
        then: function(callback){
            callback();
            return {
                fail: function(){
                    
                }
            }
        }
    }
},

module.exports = SimpleForm;

