var React = require('react');
var Router = require('react-router');
var store = require('./store_docset_selector.js');
var actions = require('./actions_docset_selector.js');
var Mousetrap = require('mousetrap');
module.exports = React.createClass({

    getInitialState: function() {
        return {docset:''};
    },

    componentWillMount: function(){
        this.mousetrap = new Mousetrap(document.documentElement);
        this.mousetrap.bind('tab',function(e){
            var searchfield = document.getElementById('txtreference');
            this.lookForDocset(searchfield.value);
            searchfield.value = '';
            searchfield.focus();
        }.bind(this));
        this.mousetrap.bind('backspace',function(e){
            var searchfield = document.getElementById('txtreference');
            searchfield.focus();
            if(searchfield.value==''){
                this.setState({docset: ''});
                this.lookForDocset(null);
            }
        }.bind(this));
        this.unsubscribe = store.listen(this.selectDocset);
    },

    lookForDocset: function(txtdocset){
        actions.searchDocset(txtdocset);
    },

    selectDocset: function(data){
        actions.setDocsets(data);
        if(data!=null && data.name!=undefined)
            this.setState({docset: data.name.replace(' ', '_')});
        else
            this.setState({docset: ''});
    },

    componentWillUnmount: function(){
        this.unsubscribe();
    },
    
    componentDidUpdate: function(){
        var offsetwidth = (document.getElementById('docset-selector-item').offsetWidth + 4) || 0;
        document.getElementById("txtreference").style.paddingLeft = offsetwidth + "px";
    },

    render: function() {
        var content;
        content = (<span className="docset-selector"><span id="docset-selector-item" className="docset-selector-item">{this.state.docset}</span></span>)
        return (content);
    },
});
