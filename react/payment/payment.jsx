var React = require('react');

module.exports = React.createClass({
    getInitialState: function(){
        return {};
    },

    render: function(){
        var error;
        if(this.state.error){
            error = <div className="col-xs-12">
                        <div className="alert alert-danger alert-dismissible" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <strong>Error!</strong> {this.state.error}
                        </div>
                    </div>
        }
        return <div className="row">
            {error}
            <div className="col-xs-12">
                <form action="" method="POST" ref="payment-form" onSubmit={this._submit}>

                      <div className="form-row">
                        <label>
                          <span>Card Number</span>
                          <input type="text" size="20" data-stripe="number" className='capture-focus'/>
                        </label>
                      </div>

                      <div className="form-row">
                        <label>
                          <span>CVC</span>
                          <input type="text" size="4" data-stripe="cvc" className='capture-focus'/>
                        </label>
                      </div>

                      <div className="form-row">
                        <label>
                          <span>Expiration (MM/YYYY)</span>
                          <input type="text" size="2" data-stripe="exp-month" className='capture-focus'/>
                        </label>
                        <span> / </span>
                        <input type="text" size="4" data-stripe="exp-year" className='capture-focus'/>
                      </div>

                      <button type="submit">Submit Payment</button>
                    </form>
                </div>
        </div>;
    },

    _submit: function(event){
        var form = this.refs['payment-form'].getDOMNode();
        Stripe.card.createToken(form, this._stripeResponseHandler);
        event.preventDefault();
    },
    
    _stripeResponseHandler: function(status, response){
        if(response.error) {
            this.setState({error: response.error.message});
        } else {
            //send token id
            //send plan
        }
    }
});
