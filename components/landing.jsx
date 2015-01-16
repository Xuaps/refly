/** @jsx React.DOM */
var React = require('react')
var SimpleMail = require('./simpleform.jsx');
var Docsets = require('./docsets.jsx');



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
                    <img src="/img/refly.jpg"/>
                    <fieldset>
                        <div id='ry-homesearch'>
                            <input id="txtreference" onKeyUp={this.onKeyUp} type="text" name="reference" placeholder="Reference" className="ry-input-text" autoFocus />
                            <button className='ry-icon fa-search' type='submit'></button>
                        </div>
                    </fieldset>
                </div>
                <div className="docsets">
                    <div className="center-content centered-text show">
                        <h2>Our flies are searching all day for you</h2>
						<Docsets key="docsetsc" />
                    </div>
                </div>
                <div className="description">
                    <div className="center-content">
                        <h2>Working to make your job easier</h2>
                        <img src="/img/refly-big.jpg" className="floated"/>
                        <span>Refly is the reference library where programmers can find all the information of the most popular languages in the fastest and fluid way.</span>
                        <span>Our bots travel hundreds of references for you to search and browse all from Refly. Always updated, integrated with your favorite editor, even offline.</span>
                    </div>
                </div>
                <div className="contact">
                    <div className="center-content span3">
                        <h2>What can we do for you?</h2>
						<SimpleMail key="mailer" messages={{done: "Message sent correctly", fail: "message sent fail"}} apikey="6b30dc7d52fdeb7892dab94c7fe955b7"/>
                    </div>
                </div>
            </div>
        );    
    }
});
