var React = require('react');
var SessionForm = require('./session-form.jsx');

module.exports = React.createClass({
      render: function (){
          return <SessionForm query={this.props.query}>
                </SessionForm>

       }
});
