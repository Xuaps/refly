/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var Reference = require('../public/js/WebClient/Reference.js');
var store = require('../public/js/store.js');

var Outline = React.createClass({
  getInitialState: function() {
	return {data: []};
  },


  componentWillReceiveProps: function (newProps) {
	if(newProps.params && newProps.params.uri!=undefined)
		this.loadData(newProps.params);
  },

  render: function() {
	if(this.props.visibility=='hide'){
		cssclass = "half-height hide";
	}else{
		cssclass = "half-height";
	}
	var visibility = this.props.visibility;
	var rows = [];
	var symbols = {};
	for(index in this.state.data){
		item=this.state.data[index];
		if (!symbols[item.type]) {
			symbols[item.type] = [];
		}
        if(item.uri==this.selecteduri){
		symbols[item.type].push(
        <li className="selected-item">
			{item.reference}
        </li>
		);
		}else{
		symbols[item.type].push(
        <li>
			<Link to='result' key={'OL' + item.ref_uri} params={{docset: item.docset, splat: item.ref_uri}}>{item.reference}</Link><br/>
        </li>
							   );
		}
	}
	for(var symbol in symbols){
		items = symbols[symbol];
        rows.push(<li><div className="outline-header"><img src={'/img/type-' + symbol + '.png'} title={symbol} className="ry-type-source"/>{symbol}</div><ul>{items}</ul></li>);
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
	return store.get('parent', {'uri': refuri})
    .then(function(parent){
		if(parent.uri==undefined){
			this.setState({data: []});
			this.props.onSetDisposition({component: 'outline', action: 'hide'});
		}else{
			store.get('branch', {'uri': parent.uri})
			.then(function(data){
				data.unshift(parent);
				this.selecteduri = '/' + refuri;
				this.setState({data: data});
			}.bind(this));
		}
	}.bind(this));
  }
});

module.exports = Outline;
