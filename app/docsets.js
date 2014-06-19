exports._collection = [];

exports.filter = function(filterFunc) {
    return exports._collection.filter(filterFunc);
}
