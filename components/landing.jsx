/** @jsx React.DOM */
var React = require('react')
var SimpleMail = require('./simpleform.jsx');

module.exports = React.createClass({

    onKeyUp: function(event){
		if(event.target.value!=''){
			this.props.onKeyUpEvent(event);
		}
    },

    render: function(){
        return(
            <div>
                <div className="beta">
                    <span>BETA</span>
                </div>
                <div className="trazo">
                    <img src="/img/trazo.png" />
                </div>
                <div className="searchbox bg-flywing">
                    <img src="/img/refly.png"/>
                    <fieldset>
                        <div id='ry-homesearch'>
                            <input id="txtreference" onKeyUp={this.onKeyUp} type="text" name="reference" placeholder="Reference" className="ry-input-text" autoFocus />
                            <button className='ry-icon fa-search' type='submit'></button>
                        </div>
                    </fieldset>
                </div>
                <div className="docsets">
                    <div className="center-content centered-text span3">
                        <h2>Our flies are searching all day for you</h2>
                        <div className="docsets-container">
                            <a href="/javascript/javascript_reference" title="javascript">
                                <div className="item">
                                    <img className="docset-state" src="/img/new-stick.png"/>
                                    <div className="docset-logo">
                                        <img src="/img/languages/javascript-biglogo.jpg"/>
                                    </div>
                                    <div className="docset-date ok-state">Nov-13-2014</div>
                                </div>
                            </a>
                            <a href="" title="nodejs">
                                <div className="item">
                                    <img className="docset-state" src="/img/soon-stick.png"/>
                                    <div className="docset-logo">
                                        <img src="/img/languages/node-biglogo.jpg" title="nodejs"/>
                                    </div>
                                    <div className="docset-date off-state">Nov-xx-2014</div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="description">
                    <div className="center-content span4">
                        <h2>Working to make your job easier</h2>
                        <img src="/img/big-fly.png" className="floated"/>
                        <span>Refly is the reference library where programmers can find all the information of the most popular languages in the fastest and fluid way.</span>
                        <span>Our bots travel hundreds of references for you to search and browse all from Refly. Always updated, integrated with your favorite editor, even offline.</span>
                    </div>
                </div>
                <div className="contact">
                    <div className="center-content span3">
                        <h2>What can we do for you?</h2>
						<SimpleMail key="mailer" messages={{done: "Message sent correctly", fail: "message sent fail"}}apikey="6b30dc7d52fdeb7892dab94c7fe955b7"/>
                    </div>
                </div>
            </div>
        );    
    }
});
