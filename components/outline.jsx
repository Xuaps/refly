/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var Reference = require('../public/js/WebClient/Reference.js');
var store = require('../public/js/store.js');

var Outline = React.createClass({
  getInitialState: function() {
	return {
        data: []
    };
  },

  getDefaultProps: function() {
    return {
      visibility: {
          action: 'show',
          state: 'half'
      }
    };
  },

  componentWillReceiveProps: function (newProps) {
	if(newProps.params && newProps.params.uri!=undefined)
		this.loadData(newProps.params);
  },

  render: function() {
	if(this.props.visibility.action=='hide'){
		cssclass = "half-height hide";
	}else{
		cssclass = "half-height";
	}
	var rows = [];
	var symbols = {};
	for(index in this.state.data){
		item=this.state.data[index];
		if (!symbols[item.type]) {
			symbols[item.type] = [];
		}
        if(item.uri==this.selecteduri){
		symbols[item.type].push(
        <li key="selecteditem" className="selected-item">
			{item.reference}
        </li>
		);
		}else{
		symbols[item.type].push(
        <li key={'OLi' + item.ref_uri}>
			<Link to='result' key={'OL' + item.ref_uri} params={{docset: item.docset, splat: item.ref_uri}}>{item.reference}</Link><br/>
        </li>
							   );
		}
	}
	for(var symbol in symbols){
		items = symbols[symbol];
        rows.push(<li key={symbol}><div className="outline-header"><img src={'/img/type-' + symbol + '.png'} title={symbol} className="ry-type-source"/>{symbol}</div><ul>{items}</ul></li>);
	};
	return(
      <div id="outline-view" key="OLC1" className={cssclass}>
          <div className="component-content">
              <ul className="outline-list">
                  {rows}
              </ul>
          </div>
      </div>);
  },

  loadData: function(params){
    var refuri = params.docset+'/'+params.uri;
	return store.get('branch', {'uri': refuri})
			.then(function(data){
				this.selecteduri = '/' + refuri;
				this.setState({data: data});
			}.bind(this));
  }
});

module.exports = Outline;
