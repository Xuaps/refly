/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var Outline = React.createClass({

  getInitialState: function() {
        return {data: this.props.data};
  },
  clicked: function(){
	data = this.LoadData("node.js+v0.10.29/buffer/buffer/buf.tojson()");
    data=[
		  {reference: "getElementById2", type: "function", uri: "uri1"},
		  {reference: "null2", type: "constant", uri: "uri2"},
		  {reference: "window2", type: "function", uri: "uri3"},
		  {reference: "XMLHTTPrequest2", type: "class", uri: "uri4"},
		  {reference: "getElementByClassName2", type: "method", uri: "uri5"},
		  {reference: "document.write2", type: "method", uri: "uri6"}
		 ];
	this.setState({data: data});

  },

  LoadData: function(uri){
        var uri_parts = uri.split('/').slice(0, -1);
        try {
            var children = {};
            children[self.uri] = self;
            parent = Reference.create({
                uri: uri_parts.join('/'),
                reference: uri_parts[uri_parts.length - 1],
                children: children
            });
			self.parent.get("reference",function(){});
        } catch (e) {
            self.parent = null;
        }
        callback(self.parent);

  },

  render: function() {
	self = this;
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
