/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var Outline = React.createClass({
  self: this,
  selecteduri: '',
  getInitialState: function() {
		self = this;
        return {data: this.props.data};
  },
  clicked: function(e){
	e.preventDefault();
	var ref = {uri: "/node.js v0.10.29/buffer/buffer/buf.tojson()", reference: "buf.json()", type:"method"};
	self.LoadData(ref);
  },

  LoadData: function(ref){
	Reference.get_parent(ref.uri, function(parent) {
		Reference.get_branch(parent.uri,function(data){
			data.unshift(parent);
			self.selecteduri = ref.uri;
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
