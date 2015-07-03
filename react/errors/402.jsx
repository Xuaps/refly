var React = require('react');
var Router = require('react-router');
var CountdownClock = require('react-countdown-clock');

module.exports = React.createClass({
    mixins: [Router.Navigation],

    render: function(){
        return <div>
                    <div className="row text-center">
                        <CountdownClock seconds={10} color="#000" alpha={0.9} size={150} onComplete={this.props.onComplete} />
                        <h2 className='col-xs-12 text-center'>Please considering upgrading to PRO to avoid this message</h2>
                    </div>
                    <div className="row">
                        <div className="h1 col-xs-12"></div>
                        <div className="h1 col-xs-12"></div>
                        <div className="col-xs-12 text-center">
                            <button className='btn-lg btn-success' onClick={this._upgrade}>Upgrade to PRO</button>
                        </div>
                    </div>
                </div>;
    },

    _upgrade: function(){
        this.transitionTo('/upgrade');
    }
});
