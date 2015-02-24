/** @jsx React.DOM */
var React = require('react');
var Link = require('react-router').Link;
var store = require('./store.js');

var Outline = React.createClass({
  getInitialState: function() {
	return {
        data: []
    };
  },

  getDefaultProps: function() {
    return {
      visibility: {
          action: 'show',
          state: 'half'
      }
    };
  },

  componentWillReceiveProps: function (newProps) {
	if(newProps.params && newProps.params.uri!=undefined)
		this.loadData(newProps.params);
  },

  render: function() {
    var rows = [];
      
	if(this.props.visibility.action=='hide'){
		cssclass = "half-height hide";
	}else{
		cssclass = "half-height";
        if(this.state.types)
            rows = this.prepareDataCollection();
	}
	return(
      <div id="outline-view" key="OLC1" className={cssclass}>
          <div className="component-content">
              <ul className="outline-list">
                  {rows}
              </ul>
          </div>
      </div>);
  },
  
  prepareDataCollection: function(){
	var rows = [];
	var types = this.state.types.map(function(t){ return { name: t.name, image: t.image, references: [] }; });
	for(var index in this.state.data){
		var item=this.state.data[index];
        var type = types.filter(function(t){
            return t.name===item.type;
        })[0];
	    	
        if(item.uri==this.selecteduri){
		    type.references.push(
                <li key="selecteditem" className="selected-item">
                    {item.name}
                </li>
            );
		}else{
            type.references.push(
                <li key={'OLi' + item.ref_uri}>
                    <Link to='result' key={'OL' + item.ref_uri} params={{docset: item.docset, splat: item.ref_uri}}>{item.name}</Link><br/>
                </li>
            );
		}
	}
	types.forEach(function(t){
        rows.push(<li key={t.name}><div className="outline-header"><img src={t.image} title={t.name} className="ry-type-source"/>{t.name}</div><ul>{t.references}</ul></li>);
	});

    return rows;
  },

  loadData: function(params){
    var refuri = params.docset+'/'+params.uri;
	return store.get('branch', {'uri': refuri})
            .then(function(references){
                return store.get('type', {'activedocset': params.docset})
                    .then(function(types){
                        this.setState({data: references, 'types': types});
                        this.selecteduri = '/' + refuri;
                    }.bind(this));
            }.bind(this));
  }
});

module.exports = Outline;
