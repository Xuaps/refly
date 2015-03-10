/** @jsx React.DOM */
var React = require('react')
var SimpleMail = require('./simpleform.jsx');
var Docsets = require('./docsetstable.jsx');



module.exports = React.createClass({


    onKeyUp: function(event){
		if(event.target.value!=''){
			this.props.onKeyUpEvent(event);
		}
    },

    render: function(){
        return(
            <div id="content" className="docsetpage">
                <header>
                    <a className="logo" href="/">
                        <img src="/img/refly-big.jpg"/>
                    </a>
                        <ul className="menu">
                            <li><a href="/Docsets">Docsets</a></li>
                            <li><a href="/team.html">About</a></li>
                            <li><a href="/privacy-policy.html">Legal</a></li>
                        </ul>
                </header>
                <div className="right-pane">
                    <div className="docsetlist">
                        <div className="center-content centered-text show">
                            <h2>Our flies are searching all day for you</h2>
                            <Docsets key="docsetsc" />
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
});
