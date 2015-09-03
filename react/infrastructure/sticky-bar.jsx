var React = require('react');

var StickyBar= React.createClass({
  componentWillMount: function(){
      $(window).scroll(this._sticky_relocate);
  },

  componentWillUnmount: function(){
      $(window).unbind('scroll', this._sticky_relocate);
  },

  _sticky_relocate: function(){
      var window_top = $(window).scrollTop();
      var div_top = $('#sticky-anchor').offset().top;
      if (window_top > div_top) {
        $('#sticky').addClass('stick');
        if(this.props.applyOnStick){
            for(var app in this.props.applyOnStick){
                $(app).addClass(this.props.applyOnStick[app]);
            }
        }
      } else {
        $('#sticky').removeClass('stick');
        if(this.props.applyOnStick){
            for(var app in this.props.applyOnStick){
                $(app).removeClass(this.props.applyOnStick[app]);
            }
        }
      }
  },
    
  render: function() {
	return(
          <div>
          	<div id="sticky-anchor"></div>
          	<div id="sticky">
                {this.props.children}
          	</div>
          </div>
          );
  },
});

module.exports = StickyBar;

