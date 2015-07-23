var React = require('react');

module.exports = React.createClass({
    getDefaultProps: function(){
        return {error: undefined};
    },

    render: function(){
        if(!this.props.error){
            return <div></div>;
        }
        return <div className="alert alert-danger"  role="alert">                                                                        
                   <button type="button" className="close" data-dismiss="alert">×</button>
                   <strong>An error ocurred!</strong>
                   <div>
                       <span className="glyphicon glyphicon-exclamation-sign error-icon" aria-hidden="true"></span>
                       <span className="sr-only">Error:</span>
                       {this.props.error.message}
                   </div>
                   <div>
                       <span className="glyphicon glyphicon-envelope error-icon" aria-hidden="true"></span>
                       <span className="sr-only"></span>
                       <a onClick={this.contact} href="#">Contact the administrator</a>
                   </div>
               </div>;
    },

    contact: function(){
        $('#myModal').modal({
            backdrop: false,
            keyboard: true,
            show: true
        });
    }
});
