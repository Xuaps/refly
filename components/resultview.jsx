/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Showdown = require('../public/js/showdown.js');

var converter = new Showdown.converter();
var store = require('../public/js/store.js');

module.exports = React.createClass({

    getInitialState: function() {
        return {initilized: false};
    },
    componentWillReceiveProps: function (newProps) {
		if(newProps.params && newProps.params.uri){
			this.loadRef(newProps.params);
		}
    },

	componentDidUpdate: function(){
		this.resetScroll();
	},

    render: function() {
        var content;
        if(this.state.initilized &&!this.state.reference){
			var urlsearch = "/search?ref=" + this.props.params.uri
            content = <div className="warning">
                        <h2>Referencia no encontrada</h2>
                        <h3>Ups! Someone has smashed "accidentally" one of our flies and we have not gathered that information.</h3>
                        <p>You can <a href={"javascript:window.location.href='" + urlsearch + "'"}>make a new search</a></p>
                        <p>or click <a href='javascript:history.back()' target="_blank">{'here'}</a> to go back.</p>
                      </div>;
        }else if(this.state.initilized && this.state.reference){
            content = <div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.state.reference.content)}}/>;
        }else{
			content = '';
		}
        return (<div ref="resultcontent" className="result">{content}</div>);
    },

    loadRef: function(params){
        //TODO:
		return store.get('reference', {docset: params.docset, uri: params.uri})
    		.then(function(ref){
				this.setState({reference: ref, initilized: true});
			}.bind(this));
    },

	resetScroll: function(){
		this.refs.resultcontent.getDOMNode().scrollTop = 0;
	}
});
