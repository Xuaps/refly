/** @jsx React.DOM */
var React = require('react');

module.exports = React.createClass({
    render: function(){
        return <div className="warning">
                    <h2>Page not found</h2>
                    <h3>Ups! Someone has smashed "accidentally" one of our flies and we have not gathered that information.</h3>
              </div>;
    }
});
