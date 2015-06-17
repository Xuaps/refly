var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var Session = require('../session/session.jsx'); 

module.exports = React.createClass({
    mixins: [Reflux.connect(store, 'store')],

    getInitialState: function(){
        return {};
    },

    componentWillMount: function(){
        actions.init();
    },

    render: function(){
        var error, return_data;
        var blur_style = {"position": "absolute", "top":"0", "left":"0", "width": "100%", "height":"100%", "zIndex":"2", "opacity":"0.8", "filter": "alpha(opacity = 80)", "background": "#FFF", "display": (this.state.store && this.state.store.isAuthenticated?"none":"block")};
        if(this.state.store && this.state.store.error){
            error = <div className="col-xs-12">
                        <div className="alert alert-danger alert-dismissible" role="alert">
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <strong>Error!</strong> {this.state.store.error}
                        </div>
                    </div>
        }

        if(this.state.store && this.state.store.subscription){
           if(this.state.store.subscription.status === 'active'){
                if(this.state.store.subscription.cancel_at_period_end){
                    return_data = <p> Your subscription are going to finalize on {this.state.store.subscription.current_period_end}. </p>;
                }else{
                    return_data = <p> You are sybscripted to {this.state.store.subscription.plan}. If you want cancel it click <button onClick={this._cancel}>here</button></p>;
                }
           }else{
               return_data = <form onSubmit={this._add}>
                <p> Credit card number xxxx xxxx xxxx {this.state.store.subscription.payment_data.last4} </p>
                <div  className="col-xs-12">
                    <div style={blur_style}></div>
                    <div className="panel panel-default">
                      <div className="panel-body">
                        Monthly
                      </div>
                      <span className="input-group-addon">
                        <input type="radio" aria-label="..." name="plan" value="refly_monthly" defaultChecked/>
                      </span>
                    </div>
                </div>
                <div  className="col-xs-12">
                    <div style={blur_style}></div>
                    <div className="panel panel-default">
                      <div className="panel-body">
                        Yearly
                      </div>
                      <span className="input-group-addon">
                        <input type="radio" aria-label="..." name="plan" value="refly_yearly"/>
                      </span>
                    </div>
                </div>
                <div  className="col-xs-12">
                    <div style={blur_style}></div>
                    <button type="submit">Submit Payment</button>
                </div>
            </form>;
           }
        }else{
            return_data = <form onSubmit={this._create}>
                   <div className="col-xs-12">
                      <div style={blur_style}></div>
                      <div className="form-row">
                        <label>
                          <span>Card Number</span>
                          <input type="text" size="20" ref="number" className='capture-focus'/>
                        </label>
                      </div>

                      <div className="form-row">
                        <label>
                          <span>CVC</span>
                          <input type="text" size="4" ref="cvc" className='capture-focus'/>
                        </label>
                      </div>

                      <div className="form-row">
                        <label>
                          <span>Expiration (MM/YYYY)</span>
                          <input type="text" size="2" ref="month" className='capture-focus'/>
                        </label>
                        <span> / </span>
                        <input type="text" size="4" ref="year" className='capture-focus'/>
                      </div>
                </div>
                <div  className="col-xs-12">
                    <div style={blur_style}></div>
                    <div className="panel panel-default">
                      <div className="panel-body">
                        Monthly
                      </div>
                      <span className="input-group-addon">
                        <input type="radio" aria-label="..." name="plan" value="refly_monthly" defaultChecked/>
                      </span>
                    </div>
                </div>
                <div  className="col-xs-12">
                    <div style={blur_style}></div>
                    <div className="panel panel-default">
                      <div className="panel-body">
                        Yearly
                      </div>
                      <span className="input-group-addon">
                        <input type="radio" aria-label="..." name="plan" value="refly_yearly"/>
                      </span>
                    </div>
                </div>
                <div  className="col-xs-12">
                    <div style={blur_style}></div>
                    <button type="submit">Submit Payment</button>
                </div>
            </form>;
        }
        return <div className="row">
            {error}
            <Session query={this.props.query}/>
            {return_data}
        </div>;
    },

    _create: function(event){
        event.preventDefault();
        actions.createSubscription(event.target.plan.value, this.refs.number.getDOMNode().value, this.refs.cvc.getDOMNode().value,
                this.refs.month.getDOMNode().value, this.refs.year.getDOMNode().value);
    },

    _add: function(event){
        event.preventDefault();
        actions.addSubscription(event.target.plan.value);
    },

    _cancel: function(){
        actions.cancelSubscription();
    },
});
