/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var mk = require('marked');

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
        //TODO:
        var content = this.state ? mk(this.state.reference.content):'';
        return (

            <div id="result" className="result" dangerouslySetInnerHTML={{__html: content}}/>
        );
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
