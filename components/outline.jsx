/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var Outline = React.createClass({

  getInitialState: function() {
        return {data: this.props.data};
  },
  clicked: function(e){
	e.preventDefault();
	//data = this.LoadData("node.js+v0.10.29/buffer/buffer/buf.tojson()");
    data=[
		  {reference: "getElementById2", type: "function", uri: ""},
		  {reference: "null2", type: "constant", uri: ""},
		  {reference: "window2", type: "function", uri: ""},
		  {reference: "XMLHTTPrequest2", type: "class", uri: ""},
		  {reference: "getElementByClassName2", type: "method", uri: ""},
		  {reference: "document.write2", type: "method", uri: ""}
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
