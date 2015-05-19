
/** @jsx React.DOM */

var React = require('react')

var Docset = React.createClass({
    render: function(){
        var item = this.props;
        return (
            <div>
                <input type="text" ref="docsetsearchbox" className="capture-focus" name="txtdocsetsearch" id="txtdocsetsearch" onKeyUp={this.onKeyUpHandler} />
            </div>
            );
    },

    onKeyUpHandler: function(event){
        this.props.onKeyUp(this.props);
    }
});

module.exports = Docset;
