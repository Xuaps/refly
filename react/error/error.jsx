var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function(){
        return {error: undefined};
    },

    render: function(){
        if(!this.props.error){
            return <div></div>;
        }
        return <div className="col-xs-12">
                        <div className="alert alert-danger alert-dismissible" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        <strong>Error!</strong> {this.props.error.message || this.props.error}
                    </div>
                </div>;
    }
});
