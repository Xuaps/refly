/** @jsx React.DOM */
var React = require('react')

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
                        <div className="ry-table">
                            <div className="ry-table-body">
                                <div className="ry-table-row">
                                    <div className="docset-logo">
                                        <img src="/img/languages/java-logo.png" title="java"/>
                                    </div>
                                    <div className="docset-name"><a><span>java</span></a>
                                    </div>
                                    <div className="docset-robot">
                                        <img src="/img/red-robot.png" title="redfly"/>
                                    </div>
                                    <div className="docset-state ok-state"><span>ready</span></div>
                                    <div><span>17/11/2012</span></div>
                                </div>
                                <div className="ry-table-row">
                                    <div className="docset-logo">
                                        <img src="/img/languages/javascript-logo.png" title="js"/>
                                    </div>
                                    <div className="docset-name"><a><span>javascript</span></a>
                                    </div>
                                    <div className="docset-robot">
                                        <img src="/img/blue-robot.png" title="bluefly"/>
                                    </div>
                                    <div className="docset-state off-state"><span>resting</span></div>
                                    <div><span>07/05/2013</span></div>
                                </div>
                                <div className="ry-table-row">
                                    <div className="docset-logo">
                                        <img src="/img/languages/php-logo.png" title="php"/>
                                    </div>
                                    <div className="docset-name"><a><span>php</span></a>
                                    </div>
                                    <div className="docset-robot">
                                        <img src="/img/yellow-robot.png" title="yellowfly"/>
                                    </div>
                                    <div className="docset-state ok-state"><span>flying</span></div>
                                    <div><span>15/09/2014</span></div>
                                </div>
                                <div className="ry-table-row">
                                    <div className="docset-logo">
                                        <img src="/img/languages/haskell-logo.png" title="haskell"/>
                                    </div>
                                    <div className="docset-name"><a><span>haskell</span></a>
                                    </div>
                                    <div className="docset-robot">
                                        <img src="/img/blue-robot.png" title="bluefly"/>
                                    </div>
                                    <div className="docset-state ok-state"><span>ready</span></div>
                                    <div><span>07/01/2013</span></div>
                                </div>
                                <div className="ry-table-row">
                                    <div className="docset-logo">
                                        <img src="/img/languages/ruby-logo.png" title="ruby"/>
                                    </div>
                                    <div className="docset-name"><a><span>ruby</span></a>
                                    </div>
                                    <div className="docset-robot">
                                        <img src="/img/green-robot.png" title="greenfly"/>
                                    </div>
                                    <div className="docset-state off-state"><span>resting</span></div>
                                    <div><span>24/02/2013</span></div>
                                </div>
                            </div>
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
                        <form action="http://getsimpleform.com/messages?form_api_token=6b30dc7d52fdeb7892dab94c7fe955b7" method="post">
                            <input placeholder="name" type="text" name="name" className="ry-input-text"/>
                            <input placeholder="email" type="text" name="email" className="ry-input-text"/>
                            <textarea placeholder="message" name="message" className="ry-input-text"></textarea>
                            <input type="submit" value="Send" className="ry-btn floated-right"/>
                        </form>
                    </div>
                </div>
            </div>
        );    
    }
});
