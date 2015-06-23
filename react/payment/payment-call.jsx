var React = require('react');

module.exports = React.createClass({
    render: function(){
        return( <div>
                    <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="col-xs-12 h2 text-center">
                               Upgrading to Pro you get:
                            </div>
                            <div className="col-xs-6">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        <span className="glyphicon glyphicon-time"></span> No more waitings
                                    </div>
                                    <div className="panel-body">
                                        You will be able to query all your favourite docsets and you won't see the stupid clock again.
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-6">
                                <div className="panel panel-info">
                                    <div className="panel-heading">
                                        <span className="glyphicon glyphicon-transfer"></span> No limits
                                    </div>
                                    <div className="panel-body">
                                        Are you a hard user? Forget about query limits and get the solution to all your questions.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                    <div className="row">
                        <div className="col-xs-12 h2 text-center">
                            Where is your money going when you pay $10 for Refly? 
                        </div>
                        <div className="col-xs-12">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <span className="badge">$0,41</span> 
                                    <span className="glyphicon glyphicon-credit-card"></span>  Fees
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$0,55</span> 
                                    <span className="glyphicon glyphicon-hdd"></span>  Hosting
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$2,1</span> 
                                    <span className="glyphicon glyphicon-scissors"></span>  Taxes
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$4,75</span> 
                                    <span className="glyphicon glyphicon-console"></span>  Salaries
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$0,98</span> 
                                    <span className="glyphicon glyphicon-book"></span>  Training
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$0,75</span> 
                                    <span className="glyphicon glyphicon-wrench"></span>  Tools
                                </li> 
                                <li className="list-group-item">
                                    <span className="badge">$0,46</span> 
                                    <span className="glyphicon glyphicon-piggy-bank"></span>  Profit
                                </li> 
                            </ul>
                        </div>
                    </div>
                    <div className="row"><div className="col-xs-12">&nbsp;</div></div>
                </div>);
    },
});
