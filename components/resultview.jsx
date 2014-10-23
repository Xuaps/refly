/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Showdown = require('../public/js/showdown.js');

var converter = new Showdown.converter();
var store = require('../public/js/store.js');

module.exports = React.createClass({

    componentWillReceiveProps: function (newProps) {
        if(newProps.params && newProps.params.uri && newProps.params.docset)
            this.loadRef(newProps.params);
    },

    render: function() {
        var content;

        if(!this.state){
            content = '';
        }else if(!this.state.reference || this.state.reference===''){
            content =<div>
                            Ups!!
                            Alguien ha aplastado "sin querer" una de nuestras moscas y aún no hemos recopilado esa información.
                            Haz una nueva búsqueda o haz click aquí para ver los resultados de tu buscador favorito.
                      </div>;
        }else{
            content = <div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.state.reference.content)}}/>;
        }
        return (<div className="result">{content}</div>);
    },

    loadRef: function(params){
        //TODO:
        $.ajax({
            context:this,
            url: '/api/reference/' + params.docset+'/'+params.uri,
            method: 'get'
        }).done(function(ref){
            this.setState({reference: ref});
        });
    }
});
