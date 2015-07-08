var React = require('react');
var Router = require('react-router');
var authentication = require('../infrastructure/authentication.js');
module.exports = React.createClass({
	mixins: [ Router.State, Router.Navigation ],
    render: function(){
    	if(authentication.getAuth()==''){
    	  var button = (<input type="button" className="btn btn-primary" onClick={this.signUp} value="Sign up now" />);
    	}else{
    	  var button = (<span></span>);	
    	}

        return (
            <div className="jumbotron">
                <h1>Search, Find, Code!</h1>
                <p className="h2">Refly.xyz is an <strong>API documentation browser</strong>, a hub built from the original sources documentation. <strong>Browse</strong> through the documentation via <strong>treeview</strong> or via the <strong>search</strong>. All the documentation is hierarchically organized and categorized for a <strong>successful experience</strong>. By default, a group of docsets is displayed, however there are more, enable and disable them using <a href="/settings">filters</a> according to your <strong>technologic stack</strong>.</p> 
                <p className="h2"><button onClick={this.goToSettings} className="btn btn-success"><em className="icon-list"></em>&nbsp;&nbsp;Start configuring your stack</button> and Unlock the best experience with <a href="/upgrade">the PRO plan</a>.</p>
                <p className="h4 lead"><small>By continuing to use this site you agree to <a href="#" onClick={function(){ window.location = '/cookies';}}>cookie policy</a> and our <a href="#" onClick={function(){ window.location = '/terms';}}>terms of use</a>.</small></p>
            </div>
            );
    },

    signUp: function(){
        this.transitionTo('session');
    },

    goToSettings: function(){
        this.transitionTo('settings');
    }
});
