
function PaymentRequiredError(message){
    this.name = "PaymentRequiredError";
    this.message = (message || "");
}
PaymentRequiredError.prototype = Error.prototype;

module.exports = PaymentRequiredError;
