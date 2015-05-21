/** @jsx React.DOM */

var React = require('react')

var Docset = React.createClass({
    render: function(){
        var item = this.props;
        return (<div className="input-group has-feedback">
                    <span className="input-group-addon" id="basic-addon1">
                        <span className="glyphicon glyphicon-search" aria-hidden="true"/>
                    </span>
                    <input type="text" ref="docsetsearchbox" className="form-control capture-focus" name="txtdocsetsearch" id="txtdocsetsearch" placeholder="Search for docset..." onKeyUp={this.onKeyUpHandler} />
                    <span className="clearer glyphicon glyphicon-remove-circle form-control-feedback" onClick={this.emptySearch}></span>
                </div>);
    },

    emptySearch: function(){
        $(this.refs.docsetsearchbox.getDOMNode('#txtdocsetsearch')).val('').focus();
        $(this.refs.docsetsearchbox.getDOMNode('#txtdocsetsearch')).next('span').hide();
        this.props.onKeyUp('');
    },

    onKeyUpHandler: function(event){
        $(event.target).next('span').toggle(Boolean(event.target.value));
        this.props.onKeyUp(event.target.value);
    }
});

module.exports = Docset;
