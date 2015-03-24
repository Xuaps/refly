var Q = require('q');
var DebouncePromise = function(ms){
    this.ms = ms;
};

DebouncePromise.prototype.debounce = function () {
    var deferred = Q.defer();
    var timerId = this.timerId;
    var self = this;
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(function () {
                deferred.resolve();
            }, this.ms);
    this.timerId = timerId;
    
    return deferred.promise;
};

module.exports = DebouncePromise;

