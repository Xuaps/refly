var React = require('react');
var Reflux = require('reflux');
var actions = require('./actions.js');
var store = require('./store.js');
var Link = require('react-router').Link;

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
          <ol className="breadcrumb">
            <li>
                <div style={{cursor: 'default'}} className={"docset-icon docsets-" + this.state.data.docset.replace(' ', '-')}/>
            </li>
            {rows}
            <li>
                {this.state.data.name}<br/>
            </li>
          </ol>);
  },
});

module.exports = Breadcrumbs;
