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
            content = <div className="warning">
                        <h2>Referencia no encontrada</h2>
                        <h3>{ String.fromCharCode(161) + 'Vaya! Alguien ha aplastado "sin querer" una de nuestras moscas y a' + String.fromCharCode(250) + 'n no hemos recopilado esa informaci' + String.fromCharCode(243) + 'n.'}</h3>
                        <p>{'Haz una nueva b'+ String.fromCharCode(250) +'squeda o haz click '}<a href={'https://www.google.es/search?q=' + this.props.params.uri.split('/').pop() } target="_blank">{'aqu'+ String.fromCharCode(237) }</a>{' para ver los resultados de tu buscador favorito.'}</p>
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
