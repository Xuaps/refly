var React = require('react');
var Plans = require('./plans.jsx');
var Ladda = require('ladda');

module.exports = React.createClass({
    getDefaultProps: function(){
        return {
            data: {},
            readonly: false,
            disabled: false
        };
    },
    
    componentDidMount: function(){
        var card = new Card({
            form: '#card-form',
            container: '.card-wrapper',
            formSelectors: {
                numberInput: 'input#number', 
                expiryInput: 'input#expiry', 
                cvcInput: 'input#cvc', 
            }, 
            
            values: {
                name: '',
            },
        });
        this._setCardValues(this.props);
    },

    componentWillReceiveProps: function(props){
        if(props.readonly != this.props.readonly)
            this._setCardValues(props); 
    },

    componentWillUpdate: function(nextProps, nextState){
        var actionButton =  document.getElementById('actionButton');
        if(actionButton)
            actionButton.disabled = false;
    },

    _setCardValues: function(props){
        var cvc = this.refs.cvc.getDOMNode();
        var expiry = this.refs.expiry.getDOMNode();
        var number = this.refs.number.getDOMNode();
        cvc.readOnly = props.readonly;
        number.readOnly = props.readonly;
        expiry.readOnly = props.readonly;
        cvc.value = props.readonly?'***':'';
        number.value = props.readonly?'************' + props.data.last4:'';
        expiry.value = props.readonly?'**/****':'';
    },

    render: function(){
        var display = this.props.disabled?'none':'block';
        return <div  id="card-form" style={{"display": display}}>
                <div className="row">
                    <div className="col-xs-12 card-wrapper"/>
                    <div className="col-xs-12">&nbsp;</div>
                    <div className="form-group">
                        <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                          <input id="number" type="text" ref="number" className='focusable form-control' placeholder="Card Number" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-10 col-xs-offset-1 col-md-8 col-md-offset-2">
                          <input id="cvc" style={{width:"40%", float:"left"}} placeholder="CVC" type="text" ref="cvc" className='focusable form-control'/>
                          <input id="expiry" style={{width:"60%"}} type="text" placeholder="MM/YYYY" ref="expiry" className='focusable form-control' />
                        </div>
                    </div>
               </div>
               <div className="col-xs-12">&nbsp;</div>
               <Plans onChange={this._planSetted}/>
               <div  className="col-xs-12 text-center">
                    <button id="actionButton" onClick={this._onSubmit} className="ladda-button btn-lg btn-success" data-spinner-color="#FFF" data-style="expand-right"><span className="ladda-label">Upgrade Now</span></button>
               </div>
         </div>
    },

    _planSetted: function(plan){
        this.plan = plan;
    },

    _onSubmit: function(e){
        e.preventDefault();
        dataLayer.push({'event':'subscribe', 'plan':this.plan});
        var l = Ladda.create( document.querySelector( '#actionButton' ) );
        l.start();
        document.getElementById('actionButton').disabled = true;
        if(this.props.readonly){
            this.props.onSubmit({plan: this.plan});
        }else{
            if(this.refs.expiry.getDOMNode().value==''){
                var expiry = ['','']
                l.stop();
            }else{
                var expiry = this.refs.expiry.getDOMNode().value.split('/');
            }
            this.props.onSubmit({
                    plan: this.plan, 
                    number: this.refs.number.getDOMNode().value, 
                    cvc: this.refs.cvc.getDOMNode().value,
                    month: expiry[0].trim(), 
                    year: expiry[1].trim()
                    });

        }
        setTimeout(function(){l.stop()},3000);
    },
});

