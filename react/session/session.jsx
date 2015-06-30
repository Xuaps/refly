var React = require('react');
var SessionForm = require('./session-form.jsx');
var SubscriptionData = require('../payment/subscription-data.jsx');
var Legal = require('../components/legal.jsx');

module.exports = React.createClass({
      render: function (){
          return <div><SessionForm query={this.props.query}>
                    <SubscriptionData/>
                </SessionForm>
                <blockquote><h1>In case you want to know more about our privacy policy look up below.</h1></blockquote>
                <Legal ref="legalcomponent"></Legal>
                </div>


       }
});
