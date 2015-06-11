
function CreditCardError(message){
    this.name = "CreditCardError";
    this.message = (message || "");
}
CreditCardError.prototype = Error.prototype;

module.exports = CreditCardError;
