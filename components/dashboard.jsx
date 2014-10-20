/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var Outline = require('./outline.jsx');
var Resultview = require('./resultview.jsx');

var dispositions = {
	full: ['search','treeview','outline'],
	notreeview: ['search','outline']
};

module.exports = React.createClass({
	
handleDisposition: function(state){
		alert(state.origin);
		if(this.state.disposition=="full"){
			
		}

	},

    render: function(){
		rows = [];
		var currentdisposition = dispositions[this.props.disposition];
		for(i in currentdisposition){
			item=currentdisposition[i];
			if(item=='search'){
				rows.push(<Search onSetDisposition={this.handleDisposition} search={this.props.query.ref}/>);
			}else if(item=='treeview'){
				rows.push(<TreeView />);
			}else if(item=='outline'){
				rows.push(<Outline params={{docset:this.props.params.docset, uri: this.props.params.splat}}/>);
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
