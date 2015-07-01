var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (<div>
        	    <div className="mainhead">
        	    <div id="header"><h1>Refly.xyz</h1>
        	    <p><img src="" /></p>
        	    <p>Refly.xyz is an API documentation browser, a hub build from the original sources documentation</p>
        	    </div></div>
        	    <div>
                    <h2>Howto</h2>
                    <p className="paragraph">Browse through the documentation via treeview or via the search. All the documentation is hierarchically organized and categorized for a successful experience.</p>
                    <p className="paragraph">By default, a group of docsets is displayed, however there are more, enable and disable them in <a href="/settings">settings</a> according to your technologic stack. Our labour:keeping documentations up-to-date; Yours:Enjoy the experience of solving all your doubts in one centered place.</p>
                    <p className="paragraph"><span className='imageexample'><img src="/img/welcome1.png" /></span> <span className='imageexample'><img src="/img/welcome2.png" /></span> <span className='imageexample'><img src="/img/welcome3.png" /></span></p>
                    <p className="paragraph"><a href="/signup">Sign Up</a> and improve the experience using refly.xyz.</p>
                    <p className="center"><input type="button" className="btn btn-primary" value="Register now" /></p>
                </div>
                <div>
                </div>
                </div>);
    },
});
