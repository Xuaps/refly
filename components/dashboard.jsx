/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var Outline = require('./outline.jsx');
var Resultview = require('./resultview.jsx');
var Breadcrumbs = require('./breadcrumbs.jsx');


var currentdisposition = {search: 'show', treeview: 'hide',outline: 'hide'};
var inversevalues = {show: 'hide',hide: 'show'};

module.exports = React.createClass({

	getInitialState: function(){
		return {currentdisposition: currentdisposition};
	},
	componentWillReceiveProps: function (newProps) {
		if(newProps.params.splat!=undefined && newProps.params.splat!=''){
			this.handleDisposition({component: 'outline', action: 'show'});
		}else{
			this.handleDisposition({component: 'outline', action: 'hide'});
		}
	},

	handleDisposition: function(_disposition){
		var newdisposition = currentdisposition;
		for(component in currentdisposition){
			action=currentdisposition[component];
			if(component==_disposition.component){
				if(action!=_disposition.action){
					if(_disposition.component=='search'){
						newdisposition.search = _disposition.action;
						newdisposition.treeview = inversevalues[_disposition.action];
						this.setState({currentdisposition: newdisposition});
					}else{
						newdisposition[component] = _disposition.action;
						this.setState({currentdisposition: newdisposition});
					}
				}
			}
		}
		currentdisposition = newdisposition;		
	},

    render: function(){
		rows = [];
		for(component in currentdisposition){
			action = currentdisposition[component];
			if(component=='search'){
				rows.push(<Search key="searchcomp" onKeyUpEvent={this.props.onKeyUpEvent} visibility={action} onSetDisposition={this.handleDisposition} search={this.props.query.ref}/>);
			}else if(component=='treeview'){
					rows.push(<TreeView key="treeviewcomp" visibility={action} onSetDisposition={this.handleDisposition} params={{docset: this.props.params.docset, uri: this.props.params.splat}}/>);
			}else if(component=='outline'){
					rows.push(<Outline key="outlinecomp" visibility={action} onSetDisposition={this.handleDisposition} params={{docset: this.props.params.docset, uri: this.props.params.splat}}/>);
			}
		}
		
        return(
            <div id="content">
                <header>
                    <a className="logo" href="/">
                        <img src="/img/white-logo.png"/>
                    </a>
                    <Breadcrumbs key="breadcrumbscomp" params={{docset:this.props.params.docset, uri: this.props.params.splat}}/>
                </header>
                <div id="left-pane">
					{rows}
                </div>
                <div className="right-pane">
                    <Resultview key="resultviewcomp" params={{docset:this.props.params.docset, uri: this.props.params.splat}}/>
                </div>
            </div>
        );
    }
});
