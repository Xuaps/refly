
function InternalError(message){
    this.name = "InternalError";
    this.message = (message || "");
}
InternalError.prototype = Object.create(Error.prototype);
InternalError.prototype.constructor = InternalError;

module.exports = InternalError;
