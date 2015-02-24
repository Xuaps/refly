/** @jsx React.DOM */
var React = require('react');
var SimpleForm = require('./simpleform.js');

var SimpleMail = React.createClass({

  getInitialState: function(){
	return ({sent: false,succeed: false});
  },

  handleClick: function(){
	var mail = this.refs.email.getDOMNode('#email').value;
	var name = this.refs.name.getDOMNode('#name').value;
	var message = this.refs.message.getDOMNode('#message').value;
	data = {mail: mail, name: name, message: message};
	this.sendMail(data);

},


  sendMail: function(data){
    new SimpleForm(this.props.apikey).sendMail(data.mail, data.name, data.message)
    .then(function(){
		this.resetForm();
		this.setState({sent: true, succeed: true});
	    }.bind(this))
    .fail(function(){
		this.setState({sent: true, succeed: false});
	    }.bind(this)
    );
  },

  resetForm: function(){
	this.refs.email.getDOMNode('#email').value = '';
	this.refs.name.getDOMNode('#name').value = '';
	this.refs.message.getDOMNode('#message').value = '';
  },

  render: function() {
	var message = '';
	var cssClass = 'mail-message';
	if(this.state.sent){
		if(this.state.succeed){
			message = this.props.messages.done;
			cssClass+=" sent";
		}else{
			message = this.props.messages.fail;
			cssClass+=" fail";
		}
	}
	return(
	<div>
	<form action={"http://getsimpleform.com/messages?form_api_token=" + this.props.apikey} method="post">
                            <input placeholder="name" type="text" id="name" ref="name" className="ry-input-text"/>
                            <input placeholder="email" type="text" id="email" ref="email" className="ry-input-text"/>
                            <textarea placeholder="message" id="message" ref="message" className="ry-input-text"></textarea>
                            <input type="button" value="Send" className="ry-btn floated-right" onClick={this.handleClick} />
                        </form>
<span className={cssClass}>{message}</span>
</div>
);
  }

});

module.exports = SimpleMail;
