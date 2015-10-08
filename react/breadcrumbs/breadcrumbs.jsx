var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var Link = require('react-router').Link;
var StickyBar = require('../infrastructure/sticky-bar.jsx');

var Breadcrumbs = React.createClass({

  mixins: [Reflux.connect(store, 'data')],

  getInitialState: function() {
	return {data: undefined};
  },

  componentWillMount: function(){
      if(this.props.params)
        actions.load(this.props.params);
  },

  componentWillReceiveProps: function (newProps) {
	if(newProps.params && newProps.params.uri!=undefined)
		actions.load(newProps.params);
  },

  render: function() {
    if(!this.state.data)
        return <ol></ol>;
    
	var rows = [];
	for(var index in this.state.data.ascendants){
            var item = this.state.data.ascendants[index];
		    rows.push(
            <li key={'BCLi' + item.uri}>
			    <Link to='result' key={'BCL' + item.uri} params={{docset: item.docset, splat: item.uri}}>{item.name}</Link><br/>
            </li>); 
    }
	return(
            <StickyBar applyOnStick={{'.breadcrumb':'col-xs-12 col-sm-offset-4 col-md-offset-3 col-sm-8 col-md-9', 'body':'stick'}}>
          	    <ol className="breadcrumb">
          	      <li>
          	          <div style={{cursor: 'default'}} className={"docset-icon docsets-" + this.state.data.docset.replace(/ /g, '-')}/>
          	      </li>
          	      {rows}
          	      <li>
          	          {this.state.data.name}<br/>
          	      </li>
          	    </ol>
            </StickyBar>
          );
  },
});

module.exports = Breadcrumbs;
