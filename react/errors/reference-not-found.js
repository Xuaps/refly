
function ReferenceNotFoundError(message){
    this.name = "ReferenceNotFoundError";
    this.message = (message || "");
}
ReferenceNotFoundError.prototype = Error.prototype;

module.exports = ReferenceNotFoundError;
