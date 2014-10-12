/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var markdown = require( "markdown" ).markdown;

module.exports = React.createClass({

    componentWillReceiveProps: function (newProps) {
        //TODO:
        $.ajax({
            context:this,
            url: '/api/reference/' + (newProps.params?newProps.params.splat:''),
            method: 'get'
        }).done(function(ref){
            this.setState({reference: ref});
        })
    },

    render: function() {
        //TODO:
        var content = this.state ? markdown.toHTML(this.state.reference.content):'';
        return (

            <div id="result" className="result" dangerouslySetInnerHTML={{__html: content}}/>
        );
    }
});
