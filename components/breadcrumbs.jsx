/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var store = require('./store.js');

var Breadcrumbs = React.createClass({
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
	var rows = [];
	for(index in this.state.data){
		item=this.state.data[index];
        if(index==this.state.data.length-1){
 		    rows.push(
            <li key={'BCLi' + item.uri}>
			    {item.reference}<br/>
            </li>);         
        }else if(index==0 && this.state.data.length>2){
		    rows.push(
            <li key={'BCLi' + item.uri}>
			    <Link to='result' key={'BCL' + item.uri} params={{docset: item.docset, splat: item.ref_uri}}>. . .</Link><br/>
            </li>);
            }else{
		    rows.push(
            <li key={'BCLi' + item.uri}>
			    <Link to='result' key={'BCL' + item.uri} params={{docset: item.docset, splat: item.ref_uri}}>{item.reference}</Link><br/>
            </li>); 
            }
		}
	return(
      <div id="breadcrumbs-view">
          <ul className="breadcrumbs-list" className="breadcrumbsul">
              {rows}
          </ul>
      </div>);
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
