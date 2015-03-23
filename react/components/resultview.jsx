/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var store = require('./store.js');
var URI = require('URIjs');
var $ = require('jquery-browserify');

module.exports = React.createClass({

    getInitialState: function() {
        return {initilized: false};
    },

    componentWillReceiveProps: function (newProps) {
		this.loadRef(newProps.params);
    },
    
    componentWillMount: function(){
        this.loadRef(this.props.params);
    },
    
    componentDidMount: function(){
        $(document).on('click', 'div.result a', function(event) {
            var baseUri=new URI(window.document.baseURI);
            var uri=new URI(event.currentTarget.href);
            if(uri.host()!==baseUri.host())
                return;

            event.preventDefault();
            if(uri.segment(0)=="searchfor"){
                this.props.onSearch({ref: uri.segment(0,'').path().slice(1)});
            }else{
                this.props.onNavigation(uri.resource());
            }
        }.bind(this));
    },

	componentDidUpdate: function(){
		this.resetScroll();
        $('pre').each(function(i, block) {
            hljs.highlightBlock(block);
        });
	},

    shouldComponentUpdate: function(nextProps, nextState){
        return nextState.reference !== this.state.reference;
    },

    render: function() {
        var content;
        if(this.state.initilized && !this.state.reference){
			(this.props.params.uri)? searchtext = this.props.params.uri.split('/').pop() : searchtext = this.props.params.uri;
            Rollbar.error("Reference " + this.props.params.uri + " not found");
			var urlsearch = "/searchfor/" + searchtext;
            content = <div className="warning">
                        <div>
                            <h2>Page not found</h2>
                            <h3>Ups! Someone has smashed "accidentally" one of our flies and we have not gathered that information.</h3>
                            <div className="centered-text white-box">
                                <p>
                                    <span>You can make a new search with the term </span>
                                    <span className="bold"> {searchtext}</span>
                                </p>
                                <a className="ry-btn" href={urlsearch} title="Search"><i className="fa fa-search fa-2x"></i></a>
                            </div>
                            <div className="centered-text white-box">
                                <p>or click here to go back</p>
                                <a className="ry-btn" href='javascript:history.back()' title="Back"><i className="fa fa-undo fa-2x"></i></a>
                            </div>
                        </div>
                        <img className="bad-reference" src="/img/bad-reference.png"/>
                      </div>;
        }else if(this.state.initilized && this.state.reference){
            content = <div dangerouslySetInnerHTML={{__html: this.state.reference.content}}/>;
        }else{
	        content = '';
		}
        return (<div ref="resultcontent" className="result">
                    {content}
                </div>);
    },

    loadRef: function(params){
		if(!params || !params.uri)
            return;

		return store.get('reference', {docset: params.docset, uri: params.uri})
    		.then(function(ref){
				this.setState({reference: ref, initilized: true});
			}.bind(this));
    },

	resetScroll: function(){
        var position = 0;
        if(this.state.reference.content_anchor){
            position = $('#'+this.state.reference.content_anchor).offset().top;
        }
        this.refs.resultcontent.getDOMNode().scrollTop = position;
	}
});
