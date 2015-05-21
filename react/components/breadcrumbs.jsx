var React = require('react');
var Link = require('react-router').Link;
var store = require('./store.js');

var Breadcrumbs = React.createClass({
  getInitialState: function() {
	return {data: []};
  },

  componentWillMount: function(){
      if(this.props.params)
        this.loadData(this.props.params).done();
  },

  componentWillReceiveProps: function (newProps) {
	if(newProps.params && newProps.params.uri!=undefined)
		this.loadData(newProps.params).done();
  },

  render: function() {
	if(this.props.visibility=='hide'){
		cssclass = "half-height hide";
	}else{
		cssclass = "half-height";
	}
	var rows = [];
	for(index in this.state.data){
		item=this.state.data[index];
        if(index==this.state.data.length-1){
 		    rows.push(
            <li key={'BCLi' + item.uri}>
			    {item.name}<br/>
            </li>);
        }else if(index==0 && this.state.data.length>2){
		    rows.push(
            <li key={'BCLi' + item.uri}>
			    <Link to='result' key={'BCL' + item.uri} className="bold" params={{docset: item.docset, splat: item.ref_uri}}>. . .</Link><br/>
            </li>);
            }else{
		    rows.push(
            <li key={'BCLi' + item.uri}>
			    <Link to='result' key={'BCL' + item.uri} params={{docset: item.docset, splat: item.ref_uri}}>{item.name}</Link><br/>
            </li>); 
            }
		}
	return(
          <ol className="breadcrumb">
              {rows}
          </ol>);
  },

  loadData: function(params){
	var refuri = params.docset+'/'+params.uri;
	return store.get('breadcrumbs', {'uri': refuri})
		.then(function(data){
			this.setState({data: data});
		}.bind(this));
  }
});

module.exports = Breadcrumbs;
