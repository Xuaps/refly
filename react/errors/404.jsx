var React = require('react');
var Router = require('react-router');
module.exports = React.createClass({
    render: function(){
        return <div className="error404">
				    <div className="row">
				        <div className="col-md-12">
				            <div className="error-template">
				                <h1>
				                    Oops!</h1>
				                <h2>
				                    404 Not Found</h2>
				                <div className="error-details">
				                    Sorry, an error has occured, Requested page not found!
				                </div>
				                <div className="error-actions">
				                    <a href="http://www.refly.xyz" className="btn btn-primary btn-lg"><span className="glyphicon glyphicon-home"></span>
				                        <span className="button-text">Take Me Home</span></a><button onClick={this.goBack} className="btn btn-default btn-lg"><span className="glyphicon glyphicon-menu-left"></span><span className="button-text">Go Back </span></button>
				                </div>
				            </div>
				        </div>
				    </div>
				</div>;
    },

    goHome: function(){
        this.transitionTo('/');
    },

    goBack: function(){
    	window.history.back();
    }
});
