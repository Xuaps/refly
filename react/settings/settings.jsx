var React = require('react')
var store = require('./store.js');
var actions = require('./actions.js');
var Reflux = require('reflux');
var Docsets = require('./docsets.jsx');
var SearchBox = require('./searchbox.jsx');

var Settings = React.createClass({
    mixins: [Reflux.connect(store,"settings")],
    
    getInitialState: function() {
        return {settings: {docsets: []}};
    },

    componentWillMount: function(){
        actions.getSettings();
    },
    componentDidMount: function(){
        this._hideButton();
    },
    render: function(){
        return (<div className="_settings panel panel-default">
                    <div className="panel-heading">
                        <div className="input-container">
                            <SearchBox key="csearchbox" onKeyUp={this.onSearchDocset}/>
                        </div>
                    </div>
                    <button ref="btnunselect" id="btnunselect" className="btn btn-link" onClick={this.onClickHandler}>Unselect all</button>
                    <div className="clear"></div>
                    <div className="panel-body">
                        <Docsets key={'docsets-list'} docsets={this.state.settings.docsets} onClick={this.onDocsetSelectionChanged} />
                    </div>
                    <div className="clear"></div>
                </div>);
    },

    onDocsetSelectionChanged: function(docset){
        actions.docsetSelectionChanged(docset);
        if(this._isEmpty())       
            this._hideButton();
        else
            this._showButton();
    },

    onSearchDocset: function(searchtext){
        actions.searchDocset(searchtext);
    },

    onClickHandler: function(event){
        if(this.state.settings.docsets.length>0){
            $('.docset-checkbox').each(function() {
                $(this).prop("checked", "");
            });
            actions.unselectAll();
            this._hideButton();
        }
    },
    _isEmpty: function(){
        return $("input:checked").length==0;
    },

    _hideButton: function(){
        var btnunselect =  document.getElementById('btnunselect');
        btnunselect.className = "btn btn-link _hidden";
    },

    _showButton: function(){
        var btnunselect =  document.getElementById('btnunselect');
        btnunselect.className = "btn btn-link";
    }
});

module.exports = Settings;

