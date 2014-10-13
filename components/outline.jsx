/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var Outline = React.createClass({
  self: this,
  selecteduri: '',
  getInitialState: function() {
	self = this;
	if(self.props.params.splat!=''){
		return LoadData(self.props.params.splat);
	}else{
		return {data: []};
	}
  },
  componentWillReceiveProps: function (newProps) {
	self.setState({splat: newProps.params.splat});
	var refuri = newProps.params.splat;
	self.LoadData(refuri);
  },
  clicked: function(e){
	var refuri = self.props.params.splat;
	self.LoadData(refuri);
  },

  LoadData: function(refuri){
	Reference.get_parent(refuri, function(parent) {
		Reference.get_branch(parent.uri,function(data){
			data.unshift(parent);
			self.selecteduri = '/' + refuri;
			self.setState({data: data});
		});
	});
  },

  render: function() {
	var rows = [];
	var symbols = {};
	$.each(this.state.data, function(key,item){
		
		if (!symbols[item.type]) {
			symbols[item.type] = [];
		}
		if(item.uri==self.selecteduri){
		symbols[item.type].push(
        <li>
			<strong>{item.reference}</strong>
        </li>
		);
		}else{
		symbols[item.type].push(
        <li>
			<Link to='result' params={{splat: item.uri}} onClick={self.clicked}>{item.reference}</Link>
        </li>
							   );
		}
	});
	$.each(symbols, function(symbol,items){
        rows.push(<li><img src={'/img/type-' + symbol + '.png'} title={symbol} className="ry-type-source"/>{symbol}<ul>{items}</ul></li>);
	});
	return(
      <div id="outline-view" className="half-height">
          <div className="component-header"><a>Outline</a></div>
          <div className="component-content">
              <ul className="outline-list">
                  {rows}
              </ul>
          </div>
      </div>);
  }
});

module.exports = Outline;
