var Reflux = require('reflux');

var treeviewActions = Reflux.createActions([
    "load",
    "selectDocset",
    "selectType",
    "selectReference"
]);

module.exports = treeviewActions;
