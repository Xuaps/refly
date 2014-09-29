/** @jsx React.DOM */
var React = require('react')

module.exports = React.createClass({
    render: function(){
        return(
            <div>
                <div className="trazo">
                    <img src="/img/trazo.png" />
                </div>
                <div className="searchbox bg-flywing">
                    <img src="/img/refly.png"/>
                    <fieldset>
                        <input id="txtreference" onKeyUp={this.props.onKeyUpEvent} type="text" name="reference" placeholder="Reference" className="ry-input-text" autoFocus />
                    </fieldset>
                </div>
                <div className="docsets">
                    <div className="center-content span3">
                        <h2 className="centered-text">Our flies are searching all day for you</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>docset</th>
                                    <th>robot</th>
                                    <th>state</th>
                                    <th>last update</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="docset-logo">
                                        <img src="/img/languages/java-logo.png" title="java"/>
                                    </td>
                                    <td className="docset-name"><a>java</a>
                                    </td>
                                    <td className="docset-robot">
                                        <img src="/img/red-robot.png" title="redfly"/>
                                    </td>
                                    <td className="docset-state ok-state">ready</td>
                                    <td>17/11/2012</td>
                                </tr>
                                <tr>
                                    <td className="docset-logo">
                                        <img src="/img/languages/js-logo.png" title="js"/>
                                    </td>
                                    <td className="docset-name"><a>javascript</a>
                                    </td>
                                    <td className="docset-robot">
                                        <img src="/img/blue-robot.png" title="bluefly"/>
                                    </td>
                                    <td className="docset-state off-state">resting</td>
                                    <td>07/05/2013</td>
                                </tr>
                                <tr>
                                    <td className="docset-logo">
                                        <img src="/img/languages/php-logo.png" title="php"/>
                                    </td>
                                    <td className="docset-name"><a>php</a>
                                    </td>
                                    <td className="docset-robot">
                                        <img src="/img/yellow-robot.png" title="yellowfly"/>
                                    </td>
                                    <td className="docset-state ok-state">flying</td>
                                    <td>15/09/2014</td>
                                </tr>
                                <tr>
                                    <td className="docset-logo">
                                        <img src="/img/languages/haskell-logo.png" title="haskell"/>
                                    </td>
                                    <td className="docset-name"><a>haskell</a>
                                    </td>
                                    <td className="docset-robot">
                                        <img src="/img/blue-robot.png" title="bluefly"/>
                                    </td>
                                    <td className="docset-state ok-state">ready</td>
                                    <td>07/01/2013</td>
                                </tr>
                                <tr>
                                    <td className="docset-logo">
                                        <img src="/img/languages/ruby-logo.png" title="ruby"/>
                                    </td>
                                    <td className="docset-name"><a>ruby</a>
                                    </td>
                                    <td className="docset-robot">
                                        <img src="/img/green-robot.png" title="greenfly"/>
                                    </td>
                                    <td className="docset-state off-state">resting</td>
                                    <td>24/02/2013</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="description">
                    <div className="center-content span4">
                        <h2>Working to make your job easier</h2>
                        <img src="/img/big-fly.png" className="floated"/>
                        <span>Refly es la biblioteca de referencias en la que el programador podrá encontrar toda la información de los lenguajes más populares de la manera más rápida y fluida.</span>
                        <span>Los refly bots recorren cientos de referencias para que puedas buscar y navegar por todas ellas desde Refly. Siempre actualizado, integrado con tu editor favorito y también offline.</span>
                    </div>
                </div>
                <div className="contact">
                    <div className="center-content span3">
                        <h2>What can we do for you?</h2>
                        <input placeholder="name" type="text" name="name" className="ry-input-text"/>
                        <input placeholder="email" type="text" name="email" className="ry-input-text"/>
                        <textarea placeholder="message" name="message" className="ry-input-text"></textarea>
                        <input type="submit" value="Send" className="ry-btn floated-right"/>
                    </div>
                </div>
            </div>
        )    
    }
});