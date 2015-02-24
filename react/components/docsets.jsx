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
			if(item.description == 'soon'){
				sticker = (<img className="docset-state" src="/img/soon-stick.png"/>);
			}else if(item.description == 'new'){
				sticker = (<img className="docset-state" src="/img/new-stick.png"/>);
			}else{
				sticker = '';
			}
			if(item.latest_version_date!=null && new Date(item.latest_version_date)<new Date() && item.is_active==true){
				var itemdate = new Date(item.latest_version_date);
				var infodate = <div className="docset-date ok-state">{String(itemdate.getDate()+100).substr(1) + '-' + String(itemdate.getMonth()+100).substr(1) + '-' + itemdate.getFullYear()}</div>
			}else{
				var infodate = <div className="docset-date off-state"> - </div>
			}
			if(item.is_active == true){
				docsetitems.push(
		            <a key={'DCa' + i} href={item.start_uri} title={item.name}>
		                <div className="item" key={'DCa' + i}>
							{sticker}
		                    <div className="docset-logo">
		                        <img src={item.bigimage}/>
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
		                        <img src={item.bigimage}/>
		                    </div>
							{infodate}
		                </div>
				);
			}
		}
        return(
            <div className="docsets-container">
                <div className="docsets-thumbs">
                    {docsetitems}
                </div>
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
