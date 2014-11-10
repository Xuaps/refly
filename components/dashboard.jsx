/** @jsx React.DOM */
var React = require('react');
var Search = require('./search.jsx');
var TreeView = require('./treeview.jsx');
var Outline = require('./outline.jsx');
var Resultview = require('./resultview.jsx');
var Breadcrumbs = require('./breadcrumbs.jsx');


var currentdisposition = {search: {action:'show', state: 'full'}, treeview: {action: 'hide', state: 'full'}, outline: {action: 'hide', state: 'half'}};
var inversevalues = {show: 'hide',hide: 'show'};

module.exports = React.createClass({

	getInitialState: function(){
		return {currentdisposition: currentdisposition};
	},

	componentWillMount: function(){
		if(this.props.params && this.props.params.splat){
			this.handleDisposition({component: 'outline', action: 'show'});
		}else{
			this.handleDisposition({component: 'outline', action: 'hide'});
		}
	},

	componentWillReceiveProps: function (newProps) {
		if(newProps.params && newProps.params.splat){
			this.handleDisposition({component: 'outline', action: 'show'});
		}else{
			if(this.state.currentdisposition.outline.action!='show')
				this.handleDisposition({component: 'outline', action: 'hide'});
		}
	},

	checkOutline: function(disposition){
		if(disposition.outline.action == 'show'){
			disposition.treeview.state= 'half';
			disposition.search.state= 'half';
		}else{
			disposition.treeview.state= 'full';
			disposition.search.state= 'full';
		}
		return disposition;
	},

	handleDisposition: function(_disposition){
		var newdisposition = this.state.currentdisposition;
		for(key in this.state.currentdisposition){
			current = this.state.currentdisposition[key];
			if(key ==_disposition.component){
				if(current.action!=_disposition.action){
					newdisposition[key].action = _disposition.action;
					if(_disposition.component=='search'){
						newdisposition.treeview.action = inversevalues[_disposition.action];
					}
					newdisposition = this.checkOutline(newdisposition);
					this.setState({currentdisposition: newdisposition});
					
				}
			}
		}	
	},

    render: function(){
		rows = [];
		for(componentkey in this.state.currentdisposition){
			current = this.state.currentdisposition[componentkey];
			if(componentkey=='search'){
				rows.push(<Search key="searchcomp" onKeyUpEvent={this.props.onKeyUpEvent} visibility={current} onSetDisposition={this.handleDisposition} search={this.props.query.ref}/>);
			}else if(componentkey=='treeview'){
					rows.push(<TreeView key="treeviewcomp" visibility={current} onSetDisposition={this.handleDisposition} params={{docset: this.props.params.docset, uri: this.props.params.splat}}/>);
			}else if(componentkey=='outline'){
					rows.push(<Outline key="outlinecomp" visibility={current} onSetDisposition={this.handleDisposition} params={{docset: this.props.params.docset, uri: this.props.params.splat}}/>);
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
