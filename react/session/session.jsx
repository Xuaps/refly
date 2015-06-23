var React = require('react');
var SessionForm = require('./session-form.jsx');
var SubscriptionData = require('../payment/subscription-data.jsx');

module.exports = React.createClass({
      render: function (){
          return <SessionForm query={this.props.query}>
                    <SubscriptionData/>
                </SessionForm>
       }
});
