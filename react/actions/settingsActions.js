var Reflux = require('reflux');

var settingsActions = Reflux.createActions([
    "getSettings",
    "docsetSelectionChanged",
]);

module.exports = settingsActions;
