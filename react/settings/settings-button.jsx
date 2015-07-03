var React = require('react');
var URI = require ('URIjs');
var Router = require('react-router');
var Ladda = require('ladda');

module.exports = React.createClass({
    mixins: [ Router.State, Router.Navigation ],
    getInitialState: function(){
        return {last_search: this.getQuery().ref || ''};
    },

    render: function(){
        return(<span>
               <button id="btnsettings" className="ladda-button btn-settings" data-spinner-color="#222" data-style="zoom-in" data-size="xs" onClick={function(e){e.preventDefault();this.navigation("settings");}.bind(this)}><span className="ladda-label"><span className="glyphicon glyphicon-filter" aria-hidden="true"></span></span></button>
               </span>);
    },

    navigation: function(uri){
        var l = Ladda.create( document.querySelector( '#btnsettings' ) );
        l.start();
        this.transitionTo(uri);
        setTimeout(function(){l.stop()},2000);
        $('.row-offcanvas').toggleClass('active');
    },

});
