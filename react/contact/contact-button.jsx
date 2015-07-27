var React = require('react')
var Reflux = require('reflux');
var store = require('./store.js');
var actions = require('./actions.js');

var Contact = React.createClass({
    mixins: [Reflux.connect(store, 'status')],
    getInitialState: function(){
       return {status:{isAuthenticated: false, sent: false, errors: []}};
    },

    componentWillMount: function(){
        actions.init();
        this.className = this.props.className || '';
        this.unsubscribe = store.listen(this.storeUpdated);
    },

    componentDidUpdate: function(){
        if(this.state.status.errors.indexOf('notvalidemail')!=-1)
            var idinputwithfocus = '#txtemail';
        else if(this.state.status.errors.indexOf('emptymessage')!=-1)
            var idinputwithfocus = '#txtmessage'
        var input_to_focus = this.refs.emailbox.getDOMNode(idinputwithfocus);
        input_to_focus.focus();
    },

    componentWillUnmount: function(){
        this.unsubscribe();
    },
    render: function(){
        var txterrors, emailerrorclass = '', messageerrorclass = '';
        var listerrors=[];

        if(this.state.status.sent){
          var statusinfo = (<div className="alert alert-dismissible messageok">
                                <button type="button" className="close" data-dismiss="alert">×</button>
                                <strong>Good!</strong> Message sent successfully.<br /><em>you will recieve an answer as soon as possible.</em>
                            </div>);

        }else if(this.state.status.errors.length>0){

            this.state.status.errors.forEach(function(item){
                if(item=='emptymessage'){
                    messageerrorclass = 'has-error';
                    listerrors.push(<div key={item}><span className="glyphicon glyphicon-exclamation-sign error-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Error:</span>
                                        Don&#39;t be shy! Write a message.
                                    </div>);
                }
                if(item=='notvalidemail'){
                    emailerrorclass = 'has-error';
                    listerrors.push(<div key={item}><span className="glyphicon glyphicon-exclamation-sign error-icon" aria-hidden="true"></span>
                                      <span className="sr-only">Error:</span>
                                      Enter a valid email address
                                  </div>);
                }

                txterrors = <div>{listerrors}</div>
            });
            var statusinfo = (<div className="alert alert-danger messagefail"  role="alert">                                                                        
                                <button type="button" className="close" data-dismiss="alert">×</button>
                                <strong>Fix the errors befor continuing!</strong><div>{txterrors}</div>
                            </div>);
        }else{
             var statusinfo = (<span></span>);
        }


        if(this.state.status.isAuthenticated){
            var inputName = (<span><input type="hidden" ref="namebox" id="inputName"/></span>);
            var inputEmail = (<span><input type="hidden" ref="emailbox" id="inputEmail"/></span>);
            var inputMessage = (<div className={"form-group " + messageerrorclass}>
                                 <label htmlFor="txtmessage" className="control-label">Message:</label>
                                 <div><textarea tabIndex="1" className="form-control focusable" rows="6" ref="messagebox" id="txtmessage" placeholder="Message"></textarea></div>
                                </div>);
        }else{
            var inputName = (<div className="form-group">
                                 <label htmlFor="txtname" className="control-label">Name:</label>
                                 <div><input type="text" tabIndex="1" className="form-control focusable" ref="namebox" id="inputName" name="txtname" placeholder="Name"/></div>
                              </div>);
            var inputEmail = (<div className={"form-group " + emailerrorclass}>
                                 <label htmlFor="txtemail" className="control-label">Email:</label>
                                 <div><input type="text" tabIndex="2" className="form-control focusable" ref="emailbox" id="inputEmail" name="txtemail" placeholder="Email"/></div>
                              </div>);
            var inputMessage = (<div className={"form-group " + messageerrorclass}>
                                 <label htmlFor="txtmessage" className="control-label">Message:</label>
                                 <div><textarea tabIndex="3" className="form-control focusable" rows="3" ref="messagebox" id="txtmessage" placeholder="Message"></textarea></div>
                              </div>);
        }
        var contactinfo =  (<fieldset>
                              {inputName}
                              {inputEmail}
                              {inputMessage}
                           </fieldset>);
        return (<span>
                    <button type="button" className={"btn btn-default navbar-btn " + this.className} onClick={this.reDraw} data-toggle="modal" data-backdrop="false" data-target="#myModal">
                      {this.props.text}&nbsp;&nbsp;<span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                    </button>
                    <div className="modal fade" ref="MyModal" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="well">
                          <div className="modal-header">
                            {statusinfo}
                            <button type="button" tabIndex="-1" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Contact us!</h4>
                          </div>
                          <form name="frmcontact">
                          <div className="modal-body">
                            {contactinfo}
                          </div>
                          <div className="modal-footer">
                            <button type="button" tabIndex="5" onClick={this.reDraw} className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" tabIndex="4" onClick={this.onClickHandler} className="btn btn-primary">Send Message</button>
                          </div>
                          </form>
                        </div>
                      </div>
                    </div>
                </span>);
    },

    reDraw: function(){
        actions.authenticate();
    },

    storeUpdated: function(data){
        if(data.sent===true){
            var self = this;
            setTimeout(function(){self.closeModal();},2000);
        }
    },
    onClickHandler: function(){
        var name_box = this.refs.namebox.getDOMNode('#txtname');
        var email_box = this.refs.emailbox.getDOMNode('#txtemail');
        var message_box = this.refs.messagebox.getDOMNode('#txtmessage');
        var name = name_box.value;
        var email = email_box.value;
        var content = message_box.value;
        actions.sendMail(name, email, content);
    },

    closeModal: function(){
        var name_box = this.refs.namebox.getDOMNode('#txtname');
        var email_box = this.refs.emailbox.getDOMNode('#txtemail');
        var message_box = this.refs.messagebox.getDOMNode('#txtmessage');
        name_box.value = '';
        email_box.value = '';
        message_box.value = '';      
        $(this.refs.MyModal.getDOMNode('#myModal')).modal('hide');
    }
});

module.exports = Contact;

