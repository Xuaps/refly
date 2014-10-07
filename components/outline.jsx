/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var Outline = React.createClass({
  self: this,
  getInitialState: function() {
		self = this;
        return {data: this.props.data};
  },
  clicked: function(e){
	e.preventDefault();
	ref = Reference.create(
	{uri: "/node.js v0.10.29/buffer/buffer/buf.length", reference: "buf.json()", type:"method"});
	ref.get('parent', function(parent) {
		self.LoadData(parent,function(data){
			self.setState({data: data});


		});
	});

  },

  LoadData: function(parent,callback){
		list = [];
		// recursividad con asincronia. Revisar esto
		parent.get_children(function(children){
			if(children.length>0){
				children.forEach(function(ref) {
					self.LoadData(ref,function(data){
						callback(list);
					});
				});
			}else{
				list.push(parent);
			}
			callback(list);
		});
  },

  render: function() {
	var rows = [];
	var symbols = {};
	$.each(this.state.data, function(key,item){
		
		if (!symbols[item.type]) {
			symbols[item.type] = [];
		}
		symbols[item.type].push(
        <li>
			<Link to='result' params={{splat: item.uri}} onClick={self.clicked}>{item.reference}</Link>
        </li>
);
	});
	$.each(symbols, function(symbol,items){
		rows.push(<h3>{symbol}</h3>);
		rows.push(<ul>{items}</ul>);
	});
	return(
      <div className="outlineBox">
        <h1>Outline</h1>
		{rows}
      </div>);
  }
});

module.exports = Outline;
