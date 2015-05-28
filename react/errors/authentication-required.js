
function AuthenticationRequiredError(message){
    this.name = "AuthenticationRequiredError";
    this.message = (message || "");
}
AuthenticationRequiredError.prototype = Error.prototype;

module.exports = AuthenticationRequiredError;
