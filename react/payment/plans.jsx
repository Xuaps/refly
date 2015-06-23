var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function(){
        return {
            
        };
    },

    componentDidMount: function(){
        this._click();
    },

    render: function(){
        return <div className="row"> 
                <div  className="col-xs-12">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <p className="h1"><strong>$10/yr</strong></p>
                        <p>16% dicount compared to the monthly plan</p>
                      </div>
                      <span className="input-group-addon">
                        <input type="radio" ref='r1' aria-label="Monthly plan" name="plan" value="refly_yearly" onClick={this._click} defaultChecked /> Yearly
                      </span>
                    </div>
                </div>
                <div  className="col-xs-12">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <p className="h1"><strong>$1/mo</strong></p>
                        <p>Cancel or get a refund anytime.</p>
                      </div>
                      <span className="input-group-addon">
                        <input type="radio" ref='r2' aria-label="Yearly plan" name="plan" onClick={this._click} value="refly_monthly" /> Monthly
                      </span>
                    </div>
                </div>
              </div>;
    },

    _click: function(){
        var r1 = this.refs.r1.getDOMNode();
        var r2 = this.refs.r2.getDOMNode();

        if(r1.checked)
            this.props.onChange(r1.value);
        else
            this.props.onChange(r2.value);
    }
});