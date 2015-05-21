var React = require('react')
var store = require('./store.js');

module.exports = React.createClass({

	getInitialState: function(){
		return ({data: []});
	},

    componentWillMount: function(){
        this.loadData().done();
    },

    render: function(){
		var docsetitems= [];
		for(i in this.state.data){
			item = this.state.data[i];
			if(item.latest_version_date!=null && new Date(item.latest_version_date)<new Date() && item.is_active==true){
				var itemdate = new Date(item.latest_version_date);
				var infodate = <div className="docset-date ok-state">{String(itemdate.getDate()+100).substr(1) + '-' + String(itemdate.getMonth()+100).substr(1) + '-' + itemdate.getFullYear()}</div>
			}else{
				var infodate = <div className="docset-date off-state"> - </div>
			}
			docsetitems.push(
		            <a key={'DCa' + i} href={item.start_uri} title={item.name}>
		                <div className="item" key={'DCa' + i}>
		                    <div className="docset-logo">
		                        <img src={item.bigimage}/>
		                    </div>
                            <div className="docset-info">
                                <div className="docset-name">
                                    {item.name}
                                </div>
                                    {infodate}
                                <div className="docset-copyright">
                                    {item.copyright}
                                </div>
                                <div className="docset-license">
                                    {item.license}
                                </div>
		                    </div>
		                </div>
		            </a>
				);
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
