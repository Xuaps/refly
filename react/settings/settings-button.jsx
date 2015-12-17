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
               <button id="btnsettings" data-toggle="tooltip" data-placement="left" className="ladda-button btn-settings" data-spinner-color="#222" data-style="zoom-in" data-size="xs" onClick={function(e){e.preventDefault();this.navigation("settings");}.bind(this)}><span className="ladda-label"><em className="icon-list"></em></span></button>
               </span>);
    },

    componentDidMount: function() {
        this.showTooltip();
    },
    
    navigation: function(uri){
        var l = Ladda.create( document.querySelector( '#btnsettings' ) );
        l.start();
        this.transitionTo(uri);
        setTimeout(function(){l.stop()},2000);
        $('.row-offcanvas').toggleClass('active');
    },

    showTooltip: function(){
      var options = {
                    placement: 'left',
                    delay: { "show": 0, "hide": 10 },
                    title: 'View All Docsets',
                    template : '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div style="border-radius: 5px;" class="tooltip-inner"></div></div>',
                };
      $('#btnsettings').tooltip(options);
      $('#btnsettings').tooltip('show');
      $('.tooltip-inner').html('View All Docsets<br /> Configure your stack')
      setTimeout(function(){$('#btnsettings').tooltip('hide');},5000);
    }

});
