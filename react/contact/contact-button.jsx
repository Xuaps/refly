var React = require('react')
// var store = require('./store.js');
// var actions = require('./actions.js');

var Contact = React.createClass({

    componentWillMount: function(){
        // actions.getSettings();
    },

    render: function(){
        var contactinfo =  (<fieldset>
                              <div className="form-group">
                                 <label htmlFor="inputName" className="control-label">Name:</label>
                                 <div><input type="text" className="form-control focusable" id="inputName" name="inputName" placeholder="Name"/></div>
                              </div>
                              <div className="form-group">
                                 <label htmlFor="inputEmail" className="control-label">Email:</label>
                                 <div><input type="text" className="form-control focusable" id="inputEmail" name="inputEmail" placeholder="Email"/></div>
                              </div>
                              <div className="form-group">
                                 <label htmlFor="inputMessage" className="control-label">Message:</label>
                                 <div><textarea className="form-control focusable" rows="3" id="inputMessage" placeholder="Message"></textarea></div>
                              </div>
                           </fieldset>);
        return (<div>
                    <button type="button" className="btn btn-default navbar-btn" data-toggle="modal" data-backdrop="false" data-target="#myModal">
                      <span className="glyphicon glyphicon-envelope" aria-hidden="true"></span>
                    </button>
                    <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog">
                        <div className="well">
                          <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id="myModalLabel">Contact us!</h4>
                          </div>
                          <form name="frmcontact">
                          <div className="modal-body">
                            {contactinfo}
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" onClick={this.onClickHandler} className="btn btn-primary">Send Message</button>
                          </div>
                          </form>
                        </div>
                      </div>
                    </div>
                </div>);
    },

    onClickHandler: function(uri){
        actions.sendMail(name, email, content);
    },
});

module.exports = Contact;

