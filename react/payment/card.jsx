var React = require('react');
var Plans = require('./plans.jsx');

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
            form: 'form',
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
    },

    componentWillReceiveProps: function(props){
        if(props.readonly != this.props.readonly){
            var cvc = this.refs.cvc.getDOMNode();
            var expiry = this.refs.expiry.getDOMNode();
            var number = this.refs.number.getDOMNode();
            cvc.readOnly = props.readonly;
            number.readOnly = props.readonly;
            expiry.readOnly = props.readonly;
            cvc.value = props.readonly?'***':'';
            number.value = props.readonly?'************' + props.data.last4:'';
            expiry.value = props.readonly?'**/****':'';
        }
    },

    render: function(){
        var display = this.props.disabled?'none':'block';
        return <div  style={{"display": display}}>
                <div className="row">
                    <div className="col-xs-12 card-wrapper"/>
                    <div className="col-xs-12">&nbsp;</div>
                    <div className="form-group">
                        <div className="col-xs-12">
                          <input id="number" type="text" ref="number" className='capture-focus form-control' placeholder="Card Number" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-xs-12">
                          <input id="cvc" style={{width:"40%", float:"left"}} placeholder="CVC" type="text" ref="cvc" className='capture-focus form-control'/>
                          <input id="expiry" style={{width:"60%"}} type="text" placeholder="MM/YYYY" ref="expiry" className='capture-focus form-control' />
                        </div>
                    </div>
               </div>
               <div className="col-xs-12">&nbsp;</div>
               <Plans onChange={this._planSetted}/>
               <div  className="col-xs-12 text-center">
                    <button onClick={this._onSubmit} className="btn-lg btn-success">Upgrade Now</button>
               </div>
         </div>
    },

    _planSetted: function(plan){
        this.plan = plan;
    },

    _onSubmit: function(e){
        event.preventDefault();
        if(this.props.readonly){
            this.props.onSubmit(this.plan);
        }else{
            var expiry = this.refs.expiry.getDOMNode().value.split('/');
            this.props.onSubmit(this.plan, this.refs.number.getDOMNode().value, this.refs.cvc.getDOMNode().value,
                expiry[0], expiry[1]);
        }
    }
});

