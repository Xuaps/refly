/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var Reference = require('../public/js/WebClient/Reference.js');
var store = require('../public/js/store.js');

var Outline = React.createClass({
  self: this,
  selecteduri: '',
  getInitialState: function() {
	self = this;
	return {data: []};
  },
    
  componentWillMount: function(){
    if(this.props.params && this.props.params.uri && this.props.params.docset)
      this.loadData(this.props.params);
  },

  componentWillReceiveProps: function (newProps) {
	this.loadData(newProps.params);
  },

  render: function() {
	var visibility = this.props.visibility;
	var rows = [];
	var symbols = {};
	$.each(this.state.data, function(key,item){
		
		if (!symbols[item.type]) {
			symbols[item.type] = [];
		}
		
        if(item.uri==self.selecteduri){
		symbols[item.type].push(
        <li className="selected-item">
			{item.reference}
        </li>
		);
		}else{
		symbols[item.type].push(
        <li>
			<Link to='result' params={{docset: item.docset, splat: item.ref_uri}}>{item.reference}</Link><br/>
        </li>
							   );
		}
	});
	$.each(symbols, function(symbol,items){
        rows.push(<li><img src={'/img/type-' + symbol + '.png'} title={symbol} className="ry-type-source"/>{symbol}<ul>{items}</ul></li>);
	});
	return(
      <div id="outline-view" className="half-height {visibility}">
          <div className="component-header"><a>Outline</a></div>
          <div className="component-content">
              <ul className="outline-list">
                  {rows}
              </ul>
          </div>
      </div>);
  },

  loadData: function(params){
    var refuri = params.docset+'/'+params.uri;
	store.get('parent', {'uri': refuri})
    .then(function(parent){
		if(parent.uri==undefined){
			self.setState({data: []});
			this.props.onSetDisposition({component: 'outline', action: 'hide'});
			return false;
		}
		store.get('branch', {'uri': parent.uri})
		.then(function(data){
			data.unshift(parent);
			self.selecteduri = refuri;
			self.setState({data: data});
		});
	});
  }
});

module.exports = Outline;
