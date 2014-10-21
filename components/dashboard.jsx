/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var Outline = require('./outline.jsx');
var Resultview = require('./resultview.jsx');

module.exports = React.createClass({

    getInitialState: function() {
        return {currentdisposition: [{component: 'search', action: 'show'},
			   {component: 'treeview', action: 'show'},{component: 'outline', action: 'show'}]};
    },
	
	handleDisposition: function(_disposition){
		newdisposition = [];
		for(i in this.state.currentdisposition){
			item=this.state.currentdisposition[i];
			if(item.component==_disposition.component){
				newdisposition.push(_disposition);
			}else{
				newdisposition.push(item);
			}
		}
		this.setState({currentdisposition: newdisposition});
	},

    render: function(){
		rows = [];
		for(i in this.state.currentdisposition){
			item=this.state.currentdisposition[i];
			if(item.component=='search'){
				rows.push(<Search visibility={item.action} onSetDisposition={this.handleDisposition} search={this.props.query.ref}/>);
			}else if(item.component=='treeview'){
				rows.push(<TreeView visibility={item.action} onSetDisposition={this.handleDisposition} />);
			}else if(item.component=='outline'){
				rows.push(<Outline visibility={item.action} onSetDisposition={this.handleDisposition} params={{docset:this.props.params.docset, uri: this.props.params.splat}}/>);
			}
		}
		
        return(
            <div id="content">
                <header>
                    <a href="/">
                        <img src="/img/logo.png"/>
                    </a>
                </header>
                <div id="left-pane">
					{rows}
                </div>
                <Resultview params={{docset:this.props.params.docset, uri: this.props.params.splat}}/>
            </div>
        );
    }
});
