/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var converter = new Showdown.converter();

module.exports = React.createClass({
    componentWillMount: function(){
        if(this.props.params && this.props.params.uri && this.props.params.docset)
            this.loadRef(this.props.params);
    },

    componentWillReceiveProps: function (newProps) {
        if(newProps.params)
            this.loadRef(newProps.params);
    },

    render: function() {
        var content;

        if(!this.state){
            content = '';
        }else if(!this.state.reference){
            content = <div id="result" className="result">
                            Ups!!
                            Alguien ha aplastado "sin querer" una de nuestras moscas y aún no hemos recopilado esa información.
                            Haz una nueva búsqueda o haz click aquí para ver los resultados de tu buscador favorito.
                      </div>;
        }else{
            content = <div id="result" className="result" dangerouslySetInnerHTML={{__html: converter.makeHtml(this.state.reference.content)}}/>;
        }

        return (<div id="result" className="result">{content}</div>);
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
