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
			if(item.state == 'soon'){
				sticker = (<img className="docset-state" src="/img/soon-stick.png"/>);
			}else if(item.state == 'new'){
				sticker = (<img className="docset-state" src="/img/new-stick.png"/>);
			}else{
				sticker = '';
			}
			if(item.date!=null){
				var itemdate = new Date(item.date);
				var infodate = <div className="docset-date ok-state">{String(itemdate.getDate()+100).substr(1) + '-' + String(itemdate.getMonth()+100).substr(1) + '-' + itemdate.getFullYear()}</div>
			}else{
				var infodate = <div className="docset-date off-state"> - </div>
			}
			docsetitems.push(
                <a key={'DCa' + i} href={item.defaulturi} title={item.name}>
                    <div className="item" key={'DCa' + i}>
						{sticker}
                        <div className="docset-logo">
                            <img src={'/img/languages/' + item.path + '-biglogo.jpg'}/>
                        </div>
						{infodate}
                    </div>
                </a>
			);
		}
        return(
            <div className="docsets-container">
				{docsetitems}
            </div>
        );    
    },

	loadData: function(params){
		return store.get('docset')
			.then(function(docsets){
				this.setState({data: docsets});
			}.bind(this));
	}
});
