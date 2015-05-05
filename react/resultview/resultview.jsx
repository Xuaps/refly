/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var URI = require('URIjs');
var Reflux = require('reflux');

var DbPromise = require('../utils/debounce-promise.js');

var store = require('./store.js');
var actions = require('./actions.js');
var Breadcrumbs = require('../components/breadcrumbs.jsx');
var Highlight = require('./highlight.jsx');

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
        this.dbpromise = new DbPromise(100);
    },
    
    componentDidMount: function(){
        $(document).on('click', 'div.result a', function(event) {
            var baseUri=new URI(window.document.baseURI);
            var uri=new URI(event.currentTarget.href);
            if(uri.host()!==baseUri.host())
                return;
            
            if(uri.path() === baseUri.path()){
                if(uri.hash()){
                    this.resetScroll(uri.hash());
                }
                return;
            }

            event.preventDefault();
            this.props.onNavigation(uri.resource());
        }.bind(this));
        this.refs.resultcontent.getDOMNode().style.minHeight = document.body.clientHeight + 'px';
    },

	componentDidUpdate: function(){
		this.dbpromise.debounce().then(
            function(){
                this.resetScroll((this.state.reference && this.state.reference.content_anchor)?'#'+this.state.reference.content_anchor:'');
            }.bind(this)        
        ).done();
	},

	resetScroll: function(anchor){
        var position = 0;

        if(anchor){
            anchor_o=$(anchor.replace(/([!"$%&'()*+,.\/:;<=>?@[\]^`{|}~]{1})/g, '\\$1'));
            if(anchor_o.length === 0){
                Airbrake.push({name: 'Anchor not found', message: 'Anchor {0} not found in {1}.'.format(anchor, this.state.reference.uri), stack: new Error().stack});
                return; 
            }
            position = anchor_o.offset().top - 60;
        }
        $('html, body').animate({ scrollTop: position }, 300, function(){ });
	},

    shouldComponentUpdate: function(nextProps, nextState){
        return nextState.reference !== this.state.reference;
    },

    render: function() {
        var content;
        if(this.state.reference===null){
            content = <div className="warning">
                            <h2>Page not found</h2>
                            <h3>Ups! Someone has smashed "accidentally" one of our flies and we have not gathered that information.</h3>
                      </div>;
        }else if(this.state.reference===undefined){
	        content = <div className="warning">
                            <h2>Welcome!</h2>
                      </div>;
        }else{
            content = <Highlight innerHTML={true} selector="pre" > {this.state.reference.content} </Highlight>;
		}
        return (
               <div>
                    <Breadcrumbs key="breadcrumbscomp" ref="breadcrumbs" params={{docset:this.props.params.docset, uri: this.props.params.uri}}/>
                    <div className="row">
                        <div className="col-xs-12">
                            <div ref="resultcontent" className="result">
                                {content}
                            </div>
                        </div>
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
