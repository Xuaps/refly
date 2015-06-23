var React = require('react');

module.exports = React.createClass({

    render: function() {
        var divStyle = {width: this.props.percentage +'%'};
        return (<div className="progress refly-progress-bar">
                  <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={divStyle}>
                    <span className="sr-only">99% Complete</span>
                  </div>
                </div>);
    }
});
