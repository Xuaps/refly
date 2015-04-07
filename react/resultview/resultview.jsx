/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var store = require('./store.js');
var actions = require('./actions.js');
var URI = require('URIjs');
var Breadcrumbs = require('../components/breadcrumbs.jsx');
var Reflux = require('reflux');
var $ = require('jquery-browserify');

module.exports = React.createClass({
    mixins: [Reflux.connect(store, "reference")],

    getInitialState: function() {
        return {reference: undefined};
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
            this.props.onNavigation(uri.resource());
        }.bind(this));
    },

	componentDidUpdate: function(){
		this.resetScroll();
        $('pre').each(function(i, block) {
            hljs.highlightBlock(block);
        });
	},

	resetScroll: function(){
        var position = 0;
        this.refs.resultcontent.getDOMNode().scrollTop = 0;
        if(this.state.reference.content_anchor){
            position = $('#'+this.state.reference.content_anchor).offset().top - 50;
        }
        this.refs.resultcontent.getDOMNode().scrollTop = position - this.refs.breadcrumbs.getDOMNode().clientHeight;
	},

    shouldComponentUpdate: function(nextProps, nextState){
        return nextState.reference !== this.state.reference;
    },

    render: function() {
        var content;
        if(this.state.reference===null){
            Rollbar.error("Reference " + this.props.params.uri + " not found");
            content = <div className="warning">
                            <h2>Page not found</h2>
                            <h3>Ups! Someone has smashed "accidentally" one of our flies and we have not gathered that information.</h3>
                      </div>;
        }else if(this.state.reference===undefined){
	        content = <div className="warning">
                            <h2>Welcome!</h2>
                      </div>;
        }else{
            content = <div dangerouslySetInnerHTML={{__html: this.state.reference.content}}/>;
		}
        return (
               <div id='container'>
                    <Breadcrumbs key="breadcrumbscomp" ref="breadcrumbs" params={{docset:this.props.params.docset, uri: this.props.params.uri}}/>
                    <div ref="resultcontent" className="result">
                        {content}
                    </div>
               </div>
                );
    },

    loadRef: function(params){
		if(!params || !params.uri)
            return;
        
        actions.loadReference(params.docset, params.uri);
    },
});
