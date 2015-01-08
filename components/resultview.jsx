/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Showdown = require('./showdown.js');

var converter = new Showdown.converter();
var store = require('./store.js');

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
			(this.props.params.uri)? searchtext = this.props.params.uri.split('/').pop() : searchtext = this.props.params.uri;
			Rollbar.error("Reference " + this.props.params.uri + " not found");
			var urlsearch = "/searchfor/" + searchtext;
            content = <div className="warning">
                        <div className="">
                            <h2>Referencia no encontrada</h2>
                            <h3>Ups! Someone has smashed "accidentally" one of our flies and we have not gathered that information.</h3>
                            <div className="centered-text">
                                <p>You can make a new search</p>
                                <a className="ry-btn" href={urlsearch} title="Search"><i className="fa fa-search fa-2x"></i></a>
                            </div>
                            <div className="centered-text">
                                <p>or click here to go back</p>
                                <a className="ry-btn" href='javascript:history.back()' title="Back"><i className="fa fa-undo fa-2x"></i></a>
                            </div>
                        </div>
                        <img className="bad-reference" src="/img/bad-reference.png"/>
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
