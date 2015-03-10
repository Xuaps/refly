var Reflux = require('reflux');

var docsetsActions = Reflux.createActions([
    "searchReferences",
    "getActiveDocsets",
    "getTypes"
]);

module.exports = docsetsActions;
