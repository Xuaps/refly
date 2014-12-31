/** @jsx React.DOM */
var React = require('react')
var store = require('./store.js');

module.exports = React.createClass({

	getInitialState: function(){
		return ({data: []});
	},

    componentWillMount: function(){
        this.loadData();
    },

    render: function(){
		var docsetitems= [];
		var sticker = '';
		for(i in this.state.data){
			item = this.state.data[i];
			if(item.label == 'soon'){
				sticker = (<img className="docset-state" src="/img/soon-stick.png"/>);
			}else if(item.label == 'new'){
				sticker = (<img className="docset-state" src="/img/new-stick.png"/>);
			}else{
				sticker = '';
			}
			if(item.date!=null && new Date(item.date)<new Date() && item.active==true){
				var itemdate = new Date(item.date);
				var infodate = <div className="docset-date ok-state">{String(itemdate.getDate()+100).substr(1) + '-' + String(itemdate.getMonth()+100).substr(1) + '-' + itemdate.getFullYear()}</div>
			}else{
				var infodate = <div className="docset-date off-state"> - </div>
			}
			if(item.active == true){
				docsetitems.push(
		            <a key={'DCa' + i} href={item.default_uri} title={item.name}>
		                <div className="item" key={'DCa' + i}>
							{sticker}
		                    <div className="docset-logo">
		                        <img src={'/img/languages/' + item.path + '-biglogo.jpg'}/>
		                    </div>
							{infodate}
		                </div>
		            </a>
				);
			}else{
				docsetitems.push(
		                <div className="item" key={'DCa' + i}>
							{sticker}
		                    <div className="docset-logo">
		                        <img src={'/img/languages/' + item.path + '-biglogo.jpg'}/>
		                    </div>
							{infodate}
		                </div>
				);
			}
		}
        return(
            <div className="docsets-container">
				{docsetitems}
            </div>
        );    
    },

	loadData: function(params){
		return store.get('docset_all')
			.then(function(docsets){
				this.setState({data: docsets});
			}.bind(this));
	}
});
