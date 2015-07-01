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

        return (
            <div className="jumbotron">
                <h1>Search, Find, Code!</h1>
                <p className="h2">Refly.xyz is an <strong>API documentation browser</strong>, a hub built from the original sources documentation. <strong>Browse</strong> through the documentation via <strong>treeview</strong> or via the <strong>search</strong>. All the documentation is hierarchically organized and categorized for a <strong>successful experience</strong>. By default, a group of docsets is displayed, however there are more, enable and disable them using <a href="/settings">filters</a> according to your <strong>technologic stack</strong>.</p> 
                <p className="h2"><span className="label label-success">Start searching something</span> and Unlock the best experience with <a href="/upgrade">the PRO plan</a>.</p>
                <p className="h4 lead"><small>By continuing to use this site you agree to cookie policy and our terms of use.</small></p>
            </div>
            );
    },

    SignUp: function(){
    	this.transitionTo('session');
    }
});
