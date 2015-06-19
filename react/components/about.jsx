var React = require('react');

module.exports = React.createClass({

    render: function() {
        return (
            <div className="result">
                    <div className="team-block">
                        <h1>Refly</h1>
                        <p>Refly is the reference library where programmers can find all the information of the most popular languages in the fastest and fluid way.</p>
                        <p>Our bots travel hundreds of references for you to search and browse all from Refly. Always updated, integrated with your favorite editor, even offline.</p>
                    </div>
                    <div className="team-block">
                        <h1>Team</h1>
                        <p>The team was created with the project itself, and this one of our own needs as programmers.</p>
                        <div className="team-member">
                            <img src="http://0.gravatar.com/avatar/78316045d734c439ec92d31e0ca2f15c?s=200"/>
                            <p>David Vílchez</p>
                            <p><strong>Software Sculptor</strong></p>
                            <p>@dvilchez</p>
                        </div>
                        <div className="team-member">
                            <img src="http://1.gravatar.com/avatar/bab0289b1a232c2eb0059bac93b57a21?s=200"/>
                            <p>Álvaro Verdión</p>
                            <p><strong>Software Sculptor</strong></p>
                            <p>@averdion</p>
                        </div>
                    </div>
                    <div className="team-block">
                        <h1>Special Thanks</h1>
                        <p>José Doval González</p>
                        <p>Eduardo J. Álvarez</p>
                    </div>
                </div>
            );
    }
});

