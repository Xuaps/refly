var React = require('react');
var Router = require('react-router');
var authentication = require('../infrastructure/authentication.js');
module.exports = React.createClass({
	mixins: [ Router.State, Router.Navigation ],
    render: function(){
    	if(authentication.getAuth()==''){
    	  var button = (<input type="button" className="btn btn-primary" onClick={this.SignUp} value="Sign up now" />);
    	}else{
    	  var button = (<span></span>);	
    	}
        return (<div className="_welcome">
        	    <div className="mainhead">
        	    <div id="header"><h1>Refly.co</h1>
        	    <p>Refly.co is an API documentation browser, a hub built from the original sources documentation</p>
        	    </div></div>
        	    <div>
                    <h2>Howto</h2>
                    <div className="jumbotron">Browse through the documentation via treeview or via the search. All the documentation is hierarchically organized and categorized for a successful experience. By default, a group of docsets is displayed, however there are more, enable and disable them in <a href="/settings">settings</a> according to your technologic stack.</div>
                    <div className="center">
                    <ul className="imageexamples">
                    <li><img src="/img/welcome1.png" /></li>
                    <li><img src="/img/welcome2.png" /></li>
                    <li><img src="/img/welcome3.png" /></li>
                    </ul>
                    </div>
                    <blockquote>
                    <div>Our labour: keeping documentations up-to-date; Yours: Enjoy the experience of solving all your doubts in one concentrated place.</div>
                    </blockquote>
                    <p className="center">{button}</p>
                </div>
                <div>
                </div>
                </div>);
    },

    SignUp: function(){
    	console.log('cosa');
    	this.transitionTo('session');
    }
});
